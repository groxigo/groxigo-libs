import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "underline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helperText: "Must be at least 8 characters long",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    value: "invalid-email",
    error: "Please enter a valid email address",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    value: "johndoe",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DifferentTypes: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <FormField label="Text" type="text" placeholder="Enter text" />
      <FormField label="Email" type="email" placeholder="Enter email" />
      <FormField label="Password" type="password" placeholder="Enter password" />
      <FormField label="Number" type="number" placeholder="Enter number" />
      <FormField label="Phone" type="tel" placeholder="Enter phone" />
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div
      style={{
        width: "360px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontWeight: 600, fontSize: "20px" }}>
        Sign In
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <FormField
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
        />
        <FormField
          label="Password"
          type="password"
          placeholder="Enter password"
          required
        />
        <button
          style={{
            marginTop: "8px",
            padding: "12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  ),
};

export const RegistrationForm: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontWeight: 600, fontSize: "20px" }}>
        Create Account
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <FormField label="First Name" placeholder="John" required />
          <FormField label="Last Name" placeholder="Doe" required />
        </div>
        <FormField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
        />
        <FormField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          helperText="We'll send order updates to this number"
        />
        <FormField
          label="Password"
          type="password"
          placeholder="Create a password"
          helperText="Must be at least 8 characters"
          required
        />
        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
        />
        <button
          style={{
            marginTop: "8px",
            padding: "12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <FormField
        label="Username"
        placeholder="Choose a username"
        value="jo"
        error="Username must be at least 3 characters"
        required
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter email"
        value="john@example.com"
        helperText="Email is available"
      />
      <FormField
        label="Phone"
        type="tel"
        placeholder="Enter phone"
        value="555-1234"
        error="Please enter a valid phone number with area code"
      />
    </div>
  ),
};
