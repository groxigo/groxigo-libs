import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { Text } from "../Text";

const meta: Meta<typeof Divider> = {
  title: "UI Elements/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
    },
    thickness: {
      control: "select",
      options: ["thin", "medium", "thick"],
    },
    labelPosition: {
      control: "select",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "300px" }}>
      <div>
        <Text variant="caption" colorScheme="muted">Solid</Text>
        <Divider variant="solid" spacing={8} />
      </div>
      <div>
        <Text variant="caption" colorScheme="muted">Dashed</Text>
        <Divider variant="dashed" spacing={8} />
      </div>
      <div>
        <Text variant="caption" colorScheme="muted">Dotted</Text>
        <Divider variant="dotted" spacing={8} />
      </div>
    </div>
  ),
};

export const Thickness: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "300px" }}>
      <div>
        <Text variant="caption" colorScheme="muted">Thin</Text>
        <Divider thickness="thin" spacing={8} />
      </div>
      <div>
        <Text variant="caption" colorScheme="muted">Medium</Text>
        <Divider thickness="medium" spacing={8} />
      </div>
      <div>
        <Text variant="caption" colorScheme="muted">Thick</Text>
        <Divider thickness="thick" spacing={8} />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "300px" }}>
      <Divider label="OR" labelPosition="center" />
      <Divider label="Section" labelPosition="left" />
      <Divider label="More" labelPosition="right" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", height: "100px", alignItems: "center" }}>
      <Text>Left content</Text>
      <Divider orientation="vertical" />
      <Text>Right content</Text>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Divider color="#3B82F6" />
      <Divider color="#10B981" />
      <Divider color="#F59E0B" />
      <Divider color="#EF4444" />
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <Text variant="h5">Section One</Text>
      <Text variant="bodySmall" colorScheme="muted">Some content for the first section.</Text>
      <Divider spacing={16} />
      <Text variant="h5">Section Two</Text>
      <Text variant="bodySmall" colorScheme="muted">Some content for the second section.</Text>
      <Divider spacing={16} />
      <Text variant="h5">Section Three</Text>
      <Text variant="bodySmall" colorScheme="muted">Some content for the third section.</Text>
    </div>
  ),
};
