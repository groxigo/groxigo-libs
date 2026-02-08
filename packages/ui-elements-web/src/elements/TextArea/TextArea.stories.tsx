import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "UI Elements/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "flushed", "unstyled"],
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    showCount: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <TextArea size="sm" placeholder="Small" label="Small" />
      <TextArea size="md" placeholder="Medium" label="Medium" />
      <TextArea size="lg" placeholder="Large" label="Large" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description...",
    error: "This field is required",
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Comments",
    placeholder: "Enter comments...",
    defaultValue: "This textarea is disabled",
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    helperText: "Write a brief description about yourself",
  },
};

export const WithCharCount: Story = {
  args: {
    label: "Tweet",
    placeholder: "What's happening?",
    maxLength: 280,
    showCount: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <TextArea variant="outline" placeholder="Outline variant" label="Outline" />
      <TextArea variant="filled" placeholder="Filled variant" label="Filled" />
      <TextArea variant="flushed" placeholder="Flushed variant" label="Flushed" />
      <TextArea variant="unstyled" placeholder="Unstyled variant" label="Unstyled" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <TextArea
        label="Message"
        placeholder="Enter your message..."
        required
        helperText="Please provide a detailed message"
      />
      <TextArea
        label="Feedback"
        placeholder="Share your feedback..."
        maxLength={500}
        showCount
        rows={5}
      />
      <TextArea
        label="Notes"
        placeholder="Additional notes..."
        resize="none"
      />
    </div>
  ),
};
