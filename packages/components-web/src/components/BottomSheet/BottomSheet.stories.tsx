import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Button } from "@groxigo/ui-elements-web";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dismissible: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    showHandle: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BottomSheetWithTrigger = ({
  children,
  ...props
}: Omit<React.ComponentProps<typeof BottomSheet>, "isOpen" | "onClose"> & {
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Bottom Sheet</Button>
      <BottomSheet {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </BottomSheet>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <BottomSheetWithTrigger title="Bottom Sheet">
      <p style={{ color: "#6b7280" }}>
        This is a bottom sheet component. It slides up from the bottom of the
        screen and is perfect for mobile-friendly interactions.
      </p>
    </BottomSheetWithTrigger>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <BottomSheetWithTrigger
      title="Select Delivery Time"
      subtitle="Choose your preferred delivery window"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"].map(
          (time) => (
            <button
              key={time}
              style={{
                padding: "16px",
                textAlign: "left",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
              }}
              onClick={action(`select-${time}`)}
            >
              {time}
            </button>
          )
        )}
      </div>
    </BottomSheetWithTrigger>
  ),
};

export const FilterSheet: Story = {
  render: () => (
    <BottomSheetWithTrigger title="Filter Products">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: "12px" }}>Category</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Fruits", "Vegetables", "Dairy", "Meat", "Bakery"].map((cat) => (
              <button
                key={cat}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "9999px",
                  background: "white",
                  fontSize: "14px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: "12px" }}>Price Range</h4>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input
              type="number"
              placeholder="Min"
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: "12px" }}>Dietary</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Organic", "Vegan", "Gluten-Free", "Dairy-Free"].map((diet) => (
              <label key={diet} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" />
                <span>{diet}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", paddingTop: "12px" }}>
          <Button variant="outline" fullWidth>
            Clear All
          </Button>
          <Button fullWidth>Apply Filters</Button>
        </div>
      </div>
    </BottomSheetWithTrigger>
  ),
};

export const SortSheet: Story = {
  render: () => (
    <BottomSheetWithTrigger title="Sort By">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[
          { label: "Relevance", selected: true },
          { label: "Price: Low to High", selected: false },
          { label: "Price: High to Low", selected: false },
          { label: "Newest First", selected: false },
          { label: "Rating", selected: false },
        ].map((option) => (
          <button
            key={option.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderBottom: "1px solid #e5e7eb",
              background: "none",
              border: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
            onClick={action(`sort-${option.label}`)}
          >
            <span style={{ fontWeight: option.selected ? 500 : 400 }}>{option.label}</span>
            {option.selected && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#16a34a" stroke="none">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </BottomSheetWithTrigger>
  ),
};

export const AddressSheet: Story = {
  render: () => (
    <BottomSheetWithTrigger title="Delivery Address" subtitle="Select or add a delivery address">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          style={{
            padding: "16px",
            border: "2px solid #16a34a",
            borderRadius: "8px",
            background: "#f0fdf4",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontWeight: 500 }}>Home</span>
            <span style={{ color: "#16a34a", fontSize: "14px" }}>Default</span>
          </div>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            123 Main Street, Apt 4B
            <br />
            Kansas City, MO 64101
          </p>
        </div>
        <div
          style={{
            padding: "16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontWeight: 500, marginBottom: "4px" }}>Office</div>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            456 Business Ave, Suite 200
            <br />
            Kansas City, MO 64102
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "16px",
            border: "1px dashed #d1d5db",
            borderRadius: "8px",
            background: "white",
            color: "#16a34a",
            cursor: "pointer",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Address
        </button>
      </div>
    </BottomSheetWithTrigger>
  ),
};

export const NoHandle: Story = {
  render: () => (
    <BottomSheetWithTrigger title="Without Handle" showHandle={false}>
      <p style={{ color: "#6b7280" }}>
        This bottom sheet has no drag handle at the top. It can still be closed
        using the X button or by clicking the backdrop.
      </p>
    </BottomSheetWithTrigger>
  ),
};

export const NonDismissible: Story = {
  render: () => (
    <BottomSheetWithTrigger
      title="Confirm Order"
      dismissible={false}
      showCloseButton={false}
    >
      <p style={{ color: "#6b7280", marginBottom: "20px" }}>
        Please confirm your order before proceeding. This action cannot be undone.
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="outline" fullWidth>
          Cancel
        </Button>
        <Button fullWidth>Confirm Order</Button>
      </div>
    </BottomSheetWithTrigger>
  ),
};

export const LongContent: Story = {
  render: () => (
    <BottomSheetWithTrigger title="Terms and Conditions" maxHeight="70vh">
      <div style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.6 }}>
        <p style={{ marginBottom: "12px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <p style={{ marginBottom: "12px" }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p style={{ marginBottom: "12px" }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
          illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>
        <p style={{ marginBottom: "12px" }}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
      </div>
    </BottomSheetWithTrigger>
  ),
};
