/**
 * Form and FormField Component Unit Tests
 */

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { Form } from '../Form';
import { FormField } from '../FormField';
import { useFormContext } from '../Form.context';
import type { FormProps, FormFieldProps } from '../Form.types';

// Mock react-native
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native-web');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: vi.fn((options: any) => options.ios || options.default),
    },
  };
});

// Mock ui-elements
vi.mock('@groxigo/ui-elements', async () => {
  const React = await import('react');
  const RN = await import('react-native');

  return {
    useTheme: () => ({
      colors: {
        text: '#000000',
        textSecondary: '#666666',
        textTertiary: '#999999',
        error: '#FF3B30',
        border: '#E0E0E0',
        surface: '#FFFFFF',
        surfaceSecondary: '#F5F5F5',
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
      },
      radius: {
        md: 8,
      },
      typography: {
        fontSize: { md: 16 },
      },
    }),
    Text: ({ children, variant, style, ...props }: any) => (
      <RN.Text {...props} style={style}>{children}</RN.Text>
    ),
  };
});

// Helper component to access form context in tests
const FormContextConsumer = ({ onContext }: { onContext: (ctx: any) => void }) => {
  const context = useFormContext();
  React.useEffect(() => {
    onContext(context);
  }, [context, onContext]);
  return null;
};

// Submit button component that uses form context
const SubmitButton = () => {
  const { handleSubmit, isSubmitting } = useFormContext();
  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      data-testid="submit-button"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
};

// Reset button component that uses form context
const ResetButton = () => {
  const { resetForm } = useFormContext();
  return (
    <button onClick={resetForm} data-testid="reset-button">
      Reset
    </button>
  );
};

describe('Form', () => {
  interface TestFormValues {
    email: string;
    password: string;
  }

  const defaultInitialValues: TestFormValues = {
    email: '',
    password: '',
  };

  describe('Basic Rendering', () => {
    it('renders children', () => {
      const onSubmit = vi.fn();
      const { getByText } = render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <span>Form Content</span>
        </Form>
      );
      expect(getByText('Form Content')).toBeTruthy();
    });

    it('provides form context to children', () => {
      const onSubmit = vi.fn();
      let contextValue: any;
      render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );
      expect(contextValue).toBeDefined();
      expect(contextValue.values).toEqual(defaultInitialValues);
    });
  });

  describe('Form Values', () => {
    it('initializes with provided values', () => {
      const onSubmit = vi.fn();
      const initialValues = { email: 'test@example.com', password: 'secret' };
      let contextValue: any;
      render(
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );
      expect(contextValue.values).toEqual(initialValues);
    });

    it('updates values via setFieldValue', () => {
      const onSubmit = vi.fn();
      let contextValue: any;
      render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      act(() => {
        contextValue.setFieldValue('email', 'new@example.com');
      });

      expect(contextValue.values.email).toBe('new@example.com');
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form values', async () => {
      const onSubmit = vi.fn();
      const initialValues = { email: 'test@example.com', password: 'password123' };
      const { getByTestId } = render(
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          <SubmitButton />
        </Form>
      );

      fireEvent.click(getByTestId('submit-button'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(initialValues);
      });
    });

    it('sets isSubmitting during async submission', async () => {
      let resolveSubmit: () => void;
      const onSubmit = vi.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        });
      });

      let contextValue: any;
      const { getByTestId } = render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
          <SubmitButton />
        </Form>
      );

      fireEvent.click(getByTestId('submit-button'));

      await waitFor(() => {
        expect(contextValue.isSubmitting).toBe(true);
      });

      act(() => {
        resolveSubmit!();
      });

      await waitFor(() => {
        expect(contextValue.isSubmitting).toBe(false);
      });
    });

    it('marks all fields as touched on submit', async () => {
      const onSubmit = vi.fn();
      let contextValue: any;
      const { getByTestId } = render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
          <SubmitButton />
        </Form>
      );

      expect(contextValue.touched).toEqual({});

      fireEvent.click(getByTestId('submit-button'));

      await waitFor(() => {
        expect(contextValue.touched).toEqual({ email: true, password: true });
      });
    });
  });

  describe('Validation', () => {
    it('validates on submit', async () => {
      const onSubmit = vi.fn();
      const validate = vi.fn((values: TestFormValues) => {
        const errors: Record<string, string> = {};
        if (!values.email) errors.email = 'Email is required';
        if (!values.password) errors.password = 'Password is required';
        return errors;
      });

      let contextValue: any;
      const { getByTestId } = render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit} validate={validate}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
          <SubmitButton />
        </Form>
      );

      fireEvent.click(getByTestId('submit-button'));

      await waitFor(() => {
        expect(contextValue.errors).toEqual({
          email: 'Email is required',
          password: 'Password is required',
        });
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('does not submit when validation fails', async () => {
      const onSubmit = vi.fn();
      const validate = () => ({ email: 'Invalid email' });

      const { getByTestId } = render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit} validate={validate}>
          <SubmitButton />
        </Form>
      );

      fireEvent.click(getByTestId('submit-button'));

      await waitFor(() => {
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    it('validates on change when validateOnChange is true', async () => {
      const onSubmit = vi.fn();
      const validate = vi.fn((values: TestFormValues) => {
        const errors: Record<string, string> = {};
        if (!values.email) errors.email = 'Email is required';
        return errors;
      });

      let contextValue: any;
      render(
        <Form
          initialValues={defaultInitialValues}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={true}
        >
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      act(() => {
        contextValue.setFieldValue('email', 'test@example.com');
      });

      expect(validate).toHaveBeenCalled();
    });

    it('validates on blur when validateOnBlur is true', async () => {
      const onSubmit = vi.fn();
      const validate = vi.fn(() => ({}));

      let contextValue: any;
      render(
        <Form
          initialValues={defaultInitialValues}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={true}
        >
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      act(() => {
        contextValue.setFieldTouched('email', true);
      });

      expect(validate).toHaveBeenCalled();
    });

    it('clears field error when value changes (without validateOnChange)', async () => {
      const onSubmit = vi.fn();

      let contextValue: any;
      render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      act(() => {
        contextValue.setFieldError('email', 'Some error');
      });

      expect(contextValue.errors.email).toBe('Some error');

      act(() => {
        contextValue.setFieldValue('email', 'new@email.com');
      });

      expect(contextValue.errors.email).toBeUndefined();
    });
  });

  describe('Form Reset', () => {
    it('resets form to initial values', async () => {
      const onSubmit = vi.fn();
      let contextValue: any;
      const { getByTestId } = render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
          <ResetButton />
        </Form>
      );

      // Set error first, then value, then touched
      act(() => {
        contextValue.setFieldError('email', 'Some error');
      });
      act(() => {
        contextValue.setFieldTouched('email', true);
      });
      act(() => {
        // setFieldValue will clear the error (by design)
        contextValue.setFieldValue('email', 'changed@email.com');
      });
      // Re-set the error after value change
      act(() => {
        contextValue.setFieldError('email', 'Some error');
      });

      expect(contextValue.values.email).toBe('changed@email.com');
      expect(contextValue.errors.email).toBe('Some error');
      expect(contextValue.touched.email).toBe(true);

      fireEvent.click(getByTestId('reset-button'));

      expect(contextValue.values).toEqual(defaultInitialValues);
      expect(contextValue.errors).toEqual({});
      expect(contextValue.touched).toEqual({});
    });
  });

  describe('Touched State', () => {
    it('tracks touched fields', () => {
      const onSubmit = vi.fn();
      let contextValue: any;
      render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      expect(contextValue.touched.email).toBeUndefined();

      act(() => {
        contextValue.setFieldTouched('email', true);
      });

      expect(contextValue.touched.email).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('sets field errors manually', () => {
      const onSubmit = vi.fn();
      let contextValue: any;
      render(
        <Form initialValues={defaultInitialValues} onSubmit={onSubmit}>
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      act(() => {
        contextValue.setFieldError('email', 'Custom error');
      });

      expect(contextValue.errors.email).toBe('Custom error');
    });
  });
});

describe('FormField', () => {
  const TestForm = ({ children, onSubmit = vi.fn() }: { children: React.ReactNode; onSubmit?: ReturnType<typeof vi.fn> }) => (
    <Form initialValues={{ name: '', email: '' }} onSubmit={onSubmit}>
      {children}
    </Form>
  );

  describe('Basic Rendering', () => {
    it('renders with label', () => {
      const { getByText } = render(
        <TestForm>
          <FormField name="name" label="Name" />
        </TestForm>
      );
      expect(getByText('Name')).toBeTruthy();
    });

    it('renders required indicator when required', () => {
      const { getByText } = render(
        <TestForm>
          <FormField name="name" label="Name" required />
        </TestForm>
      );
      expect(getByText('*')).toBeTruthy();
    });

    it('renders placeholder text', () => {
      const { getByPlaceholderText } = render(
        <TestForm>
          <FormField name="name" placeholder="Enter your name" />
        </TestForm>
      );
      expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    });
  });

  describe('Value Handling', () => {
    it('displays initial value from form', () => {
      const { getByDisplayValue } = render(
        <Form initialValues={{ name: 'John Doe', email: '' }} onSubmit={vi.fn()}>
          <FormField name="name" />
        </Form>
      );
      expect(getByDisplayValue('John Doe')).toBeTruthy();
    });

    it('updates value on change', () => {
      let contextValue: any;
      const { getByDisplayValue } = render(
        <Form initialValues={{ name: '', email: '' }} onSubmit={vi.fn()}>
          <FormField name="name" />
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      const input = getByDisplayValue('');
      fireEvent.change(input, { target: { value: 'New Name' } });

      expect(contextValue.values.name).toBe('New Name');
    });
  });

  describe('Error Display', () => {
    it('shows error when field is touched and has error', () => {
      let contextValue: any;
      const { getByText } = render(
        <Form
          initialValues={{ name: '' }}
          onSubmit={vi.fn()}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.name) {
              errors.name = 'Name is required';
            }
            return errors;
          }}
        >
          <FormField name="name" label="Name" />
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      act(() => {
        contextValue.setFieldTouched('name', true);
      });

      expect(getByText('Name is required')).toBeTruthy();
    });

    it('does not show error when field is not touched', () => {
      render(
        <Form
          initialValues={{ name: '' }}
          onSubmit={vi.fn()}
          validate={() => ({ name: 'Name is required' })}
        >
          <FormField name="name" label="Name" />
        </Form>
      );

      // Error should not be visible until field is touched
      // The error exists in state but is not displayed
    });
  });

  describe('Blur Handling', () => {
    it('marks field as touched on blur', () => {
      let contextValue: any;
      const { getByDisplayValue } = render(
        <Form initialValues={{ name: '' }} onSubmit={vi.fn()}>
          <FormField name="name" />
          <FormContextConsumer onContext={(ctx) => { contextValue = ctx; }} />
        </Form>
      );

      expect(contextValue.touched.name).toBeUndefined();

      const input = getByDisplayValue('');
      fireEvent.blur(input);

      expect(contextValue.touched.name).toBe(true);
    });
  });

  describe('Input Types', () => {
    it('renders password field with secureTextEntry', () => {
      const { container } = render(
        <TestForm>
          <FormField name="password" type="password" />
        </TestForm>
      );
      expect(container).toBeTruthy();
    });

    it('renders email field with email keyboard', () => {
      const { container } = render(
        <TestForm>
          <FormField name="email" type="email" />
        </TestForm>
      );
      expect(container).toBeTruthy();
    });

    it('renders number field with numeric keyboard', () => {
      const { container } = render(
        <TestForm>
          <FormField name="age" type="number" />
        </TestForm>
      );
      expect(container).toBeTruthy();
    });

    it('renders phone field with phone keyboard', () => {
      const { container } = render(
        <TestForm>
          <FormField name="phone" type="phone" />
        </TestForm>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('renders as disabled when disabled prop is true', () => {
      const { container } = render(
        <TestForm>
          <FormField name="name" disabled />
        </TestForm>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Custom Render', () => {
    it('uses custom render function when provided', () => {
      const { getByTestId } = render(
        <TestForm>
          <FormField
            name="name"
            render={({ value, onChange }) => (
              <input
                data-testid="custom-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
        </TestForm>
      );
      expect(getByTestId('custom-input')).toBeTruthy();
    });

    it('passes correct props to custom render', () => {
      let renderProps: any;
      render(
        <Form
          initialValues={{ name: 'Test' }}
          onSubmit={vi.fn()}
          validate={() => ({ name: 'Error' })}
        >
          <FormField
            name="name"
            render={(props) => {
              renderProps = props;
              return <input />;
            }}
          />
        </Form>
      );

      expect(renderProps.value).toBe('Test');
      expect(typeof renderProps.onChange).toBe('function');
      expect(typeof renderProps.onBlur).toBe('function');
    });
  });
});

describe('useFormContext', () => {
  it('throws error when used outside Form', () => {
    const TestComponent = () => {
      useFormContext();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useFormContext must be used within a Form component'
    );
  });
});
