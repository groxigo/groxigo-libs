import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ErrorState } from "./ErrorState";

const meta: Meta<typeof ErrorState> = {
  title: "Components/ErrorState",
  component: ErrorState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    section: {
      control: "select",
      options: ["default", "groceries", "recipes"],
    },
    retryLoading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Something went wrong",
    message: "We encountered an error while loading the content. Please try again.",
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NetworkError: Story = {
  args: {
    icon: "wifi",
    title: "No internet connection",
    message: "Please check your network connection and try again.",
    retryLabel: "Retry",
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ServerError: Story = {
  args: {
    title: "Server Error",
    message: "Our servers are experiencing issues. Please try again later.",
    errorCode: "500",
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NotFound: Story = {
  args: {
    icon: "search",
    title: "Page not found",
    message: "The page you're looking for doesn't exist or has been moved.",
    retryLabel: "Go Home",
    onRetry: action("onGoHome"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LoadingFailed: Story = {
  args: {
    title: "Failed to load products",
    message: "We couldn't load the product catalog. Please try again.",
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
      <div style={{ width: "250px" }}>
        <ErrorState
          size="sm"
          title="Error"
          message="Something went wrong"
          onRetry={action("onRetry-sm")}
        />
      </div>
      <div style={{ width: "300px" }}>
        <ErrorState
          size="md"
          title="Error"
          message="Something went wrong"
          onRetry={action("onRetry-md")}
        />
      </div>
      <div style={{ width: "350px" }}>
        <ErrorState
          size="lg"
          title="Error"
          message="Something went wrong"
          onRetry={action("onRetry-lg")}
        />
      </div>
    </div>
  ),
};

export const RetryLoading: Story = {
  args: {
    title: "Connection lost",
    message: "Attempting to reconnect...",
    retryLoading: true,
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithErrorCode: Story = {
  args: {
    title: "Authentication Failed",
    message: "Your session has expired. Please sign in again.",
    errorCode: "AUTH_401",
    retryLabel: "Sign In",
    onRetry: action("onSignIn"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutRetry: Story = {
  args: {
    title: "Feature unavailable",
    message: "This feature is currently under maintenance. Please check back later.",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const RecipeSection: Story = {
  args: {
    title: "Couldn't load recipes",
    message: "We had trouble loading the recipe collection. Please try again.",
    section: "recipes",
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomIllustration: Story = {
  args: {
    title: "Payment Failed",
    message: "Your payment could not be processed. Please check your payment details and try again.",
    illustration: (
      <div
        style={{
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dc2626"
          strokeWidth="1.5"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
        </svg>
      </div>
    ),
    retryLabel: "Try Again",
    onRetry: action("onRetry"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        width: "600px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: 600 }}>Product Catalog</h2>
      </div>
      <ErrorState
        title="Failed to load products"
        message="We couldn't load the product catalog due to a network error."
        errorCode="NET_ERR_001"
        onRetry={action("onRetry")}
        size="md"
      />
    </div>
  ),
};
