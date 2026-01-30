import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select Date",
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    label: "Delivery Date",
    value: new Date(2025, 0, 15),
    onChange: action("onChange"),
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
    label: "Birth Date",
    required: true,
    onChange: action("onChange"),
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
    label: "Appointment Date",
    helperText: "Select a date within the next 30 days",
    onChange: action("onChange"),
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
    label: "Delivery Date",
    error: "Please select a future date",
    value: new Date(2023, 0, 1),
    onChange: action("onChange"),
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
    label: "Date",
    value: new Date(),
    disabled: true,
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <DatePicker label="Small" size="sm" onChange={action("onChange-sm")} />
      <DatePicker label="Medium" size="md" onChange={action("onChange-md")} />
      <DatePicker label="Large" size="lg" onChange={action("onChange-lg")} />
    </div>
  ),
};

export const WithMinMax: Story = {
  args: {
    label: "Schedule Delivery",
    minimumDate: new Date(),
    maximumDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    helperText: "Delivery available within the next 2 weeks",
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DeliveryForm: Story = {
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
        Schedule Delivery
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <DatePicker
          label="Delivery Date"
          minimumDate={new Date()}
          maximumDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
          required
          onChange={action("onDateChange")}
        />
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Time Slot
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <option>9:00 AM - 11:00 AM</option>
            <option>11:00 AM - 1:00 PM</option>
            <option>1:00 PM - 3:00 PM</option>
            <option>3:00 PM - 5:00 PM</option>
            <option>5:00 PM - 7:00 PM (+$2.99)</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Delivery Instructions
          </label>
          <textarea
            placeholder="Leave at door, ring bell, etc."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        </div>
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
          Confirm Delivery
        </button>
      </div>
    </div>
  ),
};

export const BirthdayInput: Story = {
  args: {
    label: "Date of Birth",
    maximumDate: new Date(),
    minimumDate: new Date(1900, 0, 1),
    helperText: "Must be 18 years or older",
    required: true,
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};
