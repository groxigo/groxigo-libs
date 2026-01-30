import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Form } from "./Form";
import { FormInput } from "./FormField";
import { Button } from "@groxigo/ui-elements-web";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    validateOnChange: { control: "boolean" },
    validateOnBlur: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={action("onSubmit")}
      >
        <FormInput name="email" label="Email" type="email" placeholder="Enter email" />
        <FormInput name="password" label="Password" type="password" placeholder="Enter password" />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Form>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={action("onSubmit")}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }
          return errors;
        }}
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </Form>
    </div>
  ),
};

export const RegistrationForm: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: 600, fontSize: "20px" }}>
        Create Account
      </h2>
      <Form
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={action("onSubmit")}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.firstName) errors.firstName = "First name is required";
          if (!values.lastName) errors.lastName = "Last name is required";
          if (!values.email) {
            errors.email = "Email is required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
          }
          return errors;
        }}
        validateOnBlur
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <FormInput name="firstName" label="First Name" placeholder="John" required />
          <FormInput name="lastName" label="Last Name" placeholder="Doe" required />
        </div>
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
        />
        <FormInput
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          required
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
        />
        <Button type="submit" fullWidth>
          Create Account
        </Button>
      </Form>
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: 600, fontSize: "20px" }}>
        Contact Us
      </h2>
      <Form
        initialValues={{
          name: "",
          email: "",
          subject: "",
          message: "",
        }}
        onSubmit={action("onSubmit")}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.name) errors.name = "Name is required";
          if (!values.email) errors.email = "Email is required";
          if (!values.subject) errors.subject = "Subject is required";
          if (!values.message) errors.message = "Message is required";
          return errors;
        }}
      >
        <FormInput name="name" label="Your Name" placeholder="John Doe" required />
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
        />
        <FormInput name="subject" label="Subject" placeholder="How can we help?" required />
        <FormInput
          name="message"
          label="Message"
          placeholder="Tell us more..."
          required
          render={({ value, onChange, onBlur, error }) => (
            <div>
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder="Tell us more..."
                style={{
                  width: "100%",
                  minHeight: "120px",
                  padding: "12px",
                  border: error ? "1px solid #ef4444" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
          )}
        />
        <Button type="submit" fullWidth>
          Send Message
        </Button>
      </Form>
    </div>
  ),
};

export const ValidateOnChange: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <p style={{ marginBottom: "16px", fontSize: "14px", color: "#6b7280" }}>
        This form validates as you type
      </p>
      <Form
        initialValues={{ username: "", email: "" }}
        onSubmit={action("onSubmit")}
        validateOnChange
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.username && values.username.length < 3) {
            errors.username = "Username must be at least 3 characters";
          }
          if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
      >
        <FormInput
          name="username"
          label="Username"
          placeholder="Choose a username"
          required
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Form>
    </div>
  ),
};

export const PrefilledForm: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: 600, fontSize: "20px" }}>
        Edit Profile
      </h2>
      <Form
        initialValues={{
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
        }}
        onSubmit={action("onSubmit")}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <FormInput name="firstName" label="First Name" required />
          <FormInput name="lastName" label="Last Name" required />
        </div>
        <FormInput name="email" label="Email Address" type="email" required />
        <FormInput name="phone" label="Phone Number" type="tel" />
        <div style={{ display: "flex", gap: "12px" }}>
          <Button type="button" variant="outline" fullWidth>
            Cancel
          </Button>
          <Button type="submit" fullWidth>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  ),
};
