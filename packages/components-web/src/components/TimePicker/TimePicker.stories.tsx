import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const deliverySlots = [
  { id: "slot-1", label: "9:00 AM - 11:00 AM", available: true },
  { id: "slot-2", label: "11:00 AM - 1:00 PM", available: true },
  { id: "slot-3", label: "1:00 PM - 3:00 PM", available: true },
  { id: "slot-4", label: "3:00 PM - 5:00 PM", available: true, slotsRemaining: 3 },
  { id: "slot-5", label: "5:00 PM - 7:00 PM", available: true, premiumFee: 2.99, slotsRemaining: 2 },
  { id: "slot-6", label: "7:00 PM - 9:00 PM", available: true, premiumFee: 2.99 },
];

const limitedSlots = [
  { id: "slot-1", label: "9:00 AM - 11:00 AM", available: false },
  { id: "slot-2", label: "11:00 AM - 1:00 PM", available: false },
  { id: "slot-3", label: "1:00 PM - 3:00 PM", available: true, slotsRemaining: 1 },
  { id: "slot-4", label: "3:00 PM - 5:00 PM", available: true, slotsRemaining: 5 },
  { id: "slot-5", label: "5:00 PM - 7:00 PM", available: true, premiumFee: 2.99, slotsRemaining: 8 },
];

export const Default: Story = {
  args: {
    slots: deliverySlots,
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: {
    slots: deliverySlots,
    label: "Select Delivery Time",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithSelected: Story = {
  args: {
    slots: deliverySlots,
    selectedId: "slot-3",
    label: "Delivery Time",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHelperText: Story = {
  args: {
    slots: deliverySlots,
    label: "Delivery Time",
    helperText: "Free delivery on orders over $50",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    slots: deliverySlots,
    label: "Delivery Time",
    error: "Please select a delivery time",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LimitedAvailability: Story = {
  args: {
    slots: limitedSlots,
    label: "Available Slots",
    helperText: "Morning slots are fully booked",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    slots: deliverySlots,
    label: "Delivery Time",
    disabled: true,
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px" }}>
      <div style={{ width: "280px" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Small</p>
        <TimePicker
          slots={deliverySlots.slice(0, 3)}
          size="sm"
          onSelect={action("onSelect-sm")}
        />
      </div>
      <div style={{ width: "320px" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Medium</p>
        <TimePicker
          slots={deliverySlots.slice(0, 3)}
          size="md"
          onSelect={action("onSelect-md")}
        />
      </div>
      <div style={{ width: "360px" }}>
        <p style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}>Large</p>
        <TimePicker
          slots={deliverySlots.slice(0, 3)}
          size="lg"
          onSelect={action("onSelect-lg")}
        />
      </div>
    </div>
  ),
};

export const HorizontalOrientation: Story = {
  args: {
    slots: deliverySlots.slice(0, 4),
    orientation: "horizontal",
    label: "Select Time",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithPremiumSlots: Story = {
  args: {
    slots: [
      { id: "slot-1", label: "9:00 AM - 11:00 AM", available: true },
      { id: "slot-2", label: "11:00 AM - 1:00 PM", available: true },
      { id: "slot-3", label: "5:00 PM - 7:00 PM", available: true, premiumFee: 2.99 },
      { id: "slot-4", label: "7:00 PM - 9:00 PM", available: true, premiumFee: 2.99 },
    ],
    label: "Delivery Time",
    helperText: "Evening slots have a premium fee",
    onSelect: action("onSelect"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DeliveryScheduling: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ fontWeight: 600, marginBottom: "20px" }}>Schedule Delivery</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 500 }}>
          Delivery Date
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Today", "Tomorrow", "Wed, Dec 18"].map((day, i) => (
            <button
              key={day}
              style={{
                padding: "8px 16px",
                border: i === 0 ? "2px solid #16a34a" : "1px solid #e5e7eb",
                borderRadius: "8px",
                background: i === 0 ? "#f0fdf4" : "white",
                fontWeight: i === 0 ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <TimePicker
        slots={deliverySlots}
        selectedId="slot-3"
        label="Delivery Time"
        onSelect={action("onSelect")}
      />

      <button
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Confirm Time Slot
      </button>
    </div>
  ),
};

export const CheckoutForm: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <h2 style={{ fontWeight: 600, marginBottom: "24px" }}>Delivery Details</h2>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontWeight: 500, marginBottom: "12px", fontSize: "14px" }}>
          Delivery Address
        </h3>
        <div
          style={{
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "#f9fafb",
          }}
        >
          <p style={{ fontWeight: 500 }}>John Doe</p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            123 Main Street, Apt 4B
            <br />
            Kansas City, MO 64101
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontWeight: 500, marginBottom: "12px", fontSize: "14px" }}>
          Delivery Date
        </h3>
        <select
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <option>Today, December 16</option>
          <option>Tomorrow, December 17</option>
          <option>Wednesday, December 18</option>
        </select>
      </div>

      <TimePicker
        slots={limitedSlots}
        selectedId="slot-4"
        label="Delivery Time"
        helperText="Select an available time slot"
        onSelect={action("onSelect")}
      />

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          background: "#f0fdf4",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 500 }}>Delivery Fee</span>
        <span style={{ fontWeight: 600, color: "#16a34a" }}>FREE</span>
      </div>
    </div>
  ),
};
