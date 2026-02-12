import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

const meta: Meta<typeof ToastProvider> = {
  title: "UI Elements/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive component for triggering toasts
const ToastDemo = () => {
  const { toast, info, success, error, warning } = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "20px" }}>
      <h3 style={{ marginBottom: "8px" }}>Click buttons to trigger toasts</h3>
      <button
        onClick={() =>
          info({
            title: "Info Toast",
            description: "This is an informational message.",
          })
        }
        style={{
          padding: "8px 16px",
          backgroundColor: "#3182ce",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Show Info Toast
      </button>
      <button
        onClick={() =>
          success({
            title: "Success Toast",
            description: "Your action was completed successfully!",
          })
        }
        style={{
          padding: "8px 16px",
          backgroundColor: "#38a169",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          error({
            title: "Error Toast",
            description: "Something went wrong. Please try again.",
          })
        }
        style={{
          padding: "8px 16px",
          backgroundColor: "#e53e3e",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Show Error Toast
      </button>
      <button
        onClick={() =>
          warning({
            title: "Warning Toast",
            description: "Please review your input before continuing.",
          })
        }
        style={{
          padding: "8px 16px",
          backgroundColor: "#dd6b20",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Show Warning Toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Custom Toast",
            description: "This toast has a custom action button.",
            status: "info",
            action: {
              label: "Undo",
              onPress: () => alert("Undo clicked!"),
            },
          })
        }
        style={{
          padding: "8px 16px",
          backgroundColor: "#805ad5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Show Toast with Action
      </button>
    </div>
  );
};

export const InfoToast: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const SuccessToast: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const WarningToast: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const WithPositions: Story = {
  render: () => {
    const PositionsDemo = () => {
      const { toast } = useToast();

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "20px" }}>
          <h3 style={{ marginBottom: "8px" }}>Toast Positions</h3>
          <button
            onClick={() =>
              toast({
                title: "Top",
                description: "Toast at the top",
                position: "top",
              })
            }
            style={{
              padding: "8px 16px",
              backgroundColor: "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Top
          </button>
          <button
            onClick={() =>
              toast({
                title: "Bottom",
                description: "Toast at the bottom",
                position: "bottom",
              })
            }
            style={{
              padding: "8px 16px",
              backgroundColor: "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Bottom
          </button>
          <button
            onClick={() =>
              toast({
                title: "Top Right",
                description: "Toast at the top right",
                position: "top-right",
              })
            }
            style={{
              padding: "8px 16px",
              backgroundColor: "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Top Right
          </button>
          <button
            onClick={() =>
              toast({
                title: "Bottom Left",
                description: "Toast at the bottom left",
                position: "bottom-left",
              })
            }
            style={{
              padding: "8px 16px",
              backgroundColor: "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Bottom Left
          </button>
        </div>
      );
    };

    return (
      <ToastProvider>
        <PositionsDemo />
      </ToastProvider>
    );
  },
};
