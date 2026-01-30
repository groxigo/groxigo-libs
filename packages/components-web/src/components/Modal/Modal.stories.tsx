import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { ContentModal } from "./Modal";
import { Button } from "@groxigo/ui-elements-web";

const meta: Meta<typeof ContentModal> = {
  title: "Components/Modal",
  component: ContentModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithTrigger = ({
  children,
  ...props
}: Omit<React.ComponentProps<typeof ContentModal>, "isOpen" | "onClose"> & {
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
      <ContentModal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </ContentModal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWithTrigger title="Modal Title" subtitle="This is a subtitle">
      <p>
        This is the modal content. You can put any content here, including forms,
        information, or other interactive elements.
      </p>
    </ModalWithTrigger>
  ),
};

export const WithActions: Story = {
  render: () => (
    <ModalWithTrigger
      title="Confirm Action"
      subtitle="Are you sure you want to proceed?"
      primaryAction="Confirm"
      secondaryAction="Cancel"
      onPrimaryAction={action("onPrimaryAction")}
      onSecondaryAction={action("onSecondaryAction")}
    >
      <p>
        This action cannot be undone. Please make sure you want to proceed before
        confirming.
      </p>
    </ModalWithTrigger>
  ),
};

export const DeleteConfirmation: Story = {
  render: () => (
    <ModalWithTrigger
      title="Delete Item"
      subtitle="This action cannot be undone"
      primaryAction="Delete"
      secondaryAction="Cancel"
      onPrimaryAction={action("onDelete")}
    >
      <p style={{ color: "#6b7280" }}>
        Are you sure you want to delete this item? All associated data will be
        permanently removed from your cart.
      </p>
    </ModalWithTrigger>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalWithTrigger
      title="Add Address"
      primaryAction="Save Address"
      secondaryAction="Cancel"
      onPrimaryAction={action("onSave")}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 500 }}>
            Street Address
          </label>
          <input
            type="text"
            placeholder="123 Main St"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 500 }}>
              City
            </label>
            <input
              type="text"
              placeholder="Kansas City"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 500 }}>
              ZIP Code
            </label>
            <input
              type="text"
              placeholder="64101"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 500 }}>
            Delivery Instructions
          </label>
          <textarea
            placeholder="Gate code, apartment number, etc."
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        </div>
      </div>
    </ModalWithTrigger>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <ModalWithTrigger
      title="Processing Order"
      subtitle="Please wait while we confirm your order"
      primaryAction="Confirm"
      primaryLoading
      primaryDisabled
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 0" }}>
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "3px solid #e5e7eb",
            borderTopColor: "#16a34a",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <span style={{ color: "#6b7280" }}>Processing your order...</span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </ModalWithTrigger>
  ),
};

export const InfoModal: Story = {
  render: () => (
    <ModalWithTrigger title="Delivery Information">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: "4px" }}>Same-Day Delivery</h4>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Order by 2 PM for same-day delivery. Available for most items in the
            Kansas City metro area.
          </p>
        </div>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: "4px" }}>Scheduled Delivery</h4>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Choose a 2-hour delivery window up to 7 days in advance. Perfect for
            planning your weekly groceries.
          </p>
        </div>
        <div>
          <h4 style={{ fontWeight: 500, marginBottom: "4px" }}>Free Delivery</h4>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Free delivery on orders over $50. Otherwise, delivery is just $4.99.
          </p>
        </div>
      </div>
    </ModalWithTrigger>
  ),
};

export const CustomFooter: Story = {
  render: () => (
    <ModalWithTrigger
      title="Share Recipe"
      subtitle="Share this recipe with your friends"
      footer={
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "white",
            }}
          >
            <span>Copy Link</span>
          </button>
          <button
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "#1877f2",
              color: "white",
            }}
          >
            <span>Facebook</span>
          </button>
          <button
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "#1da1f2",
              color: "white",
            }}
          >
            <span>Twitter</span>
          </button>
        </div>
      }
    >
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <img
          src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300"
          alt="Recipe"
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
        <h3 style={{ fontWeight: 500, marginBottom: "4px" }}>Butter Chicken</h3>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>A delicious Indian curry recipe</p>
      </div>
    </ModalWithTrigger>
  ),
};

export const SuccessModal: Story = {
  render: () => (
    <ModalWithTrigger
      title="Order Placed!"
      primaryAction="Continue Shopping"
      onPrimaryAction={action("onContinue")}
    >
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#dcfce7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p style={{ color: "#6b7280", marginBottom: "8px" }}>
          Your order #12345 has been placed successfully!
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          You will receive a confirmation email shortly.
        </p>
      </div>
    </ModalWithTrigger>
  ),
};
