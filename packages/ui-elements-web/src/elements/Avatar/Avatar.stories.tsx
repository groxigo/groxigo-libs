import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

const meta: Meta<typeof Avatar> = {
  title: "UI Elements/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    variant: {
      control: "select",
      options: ["circle", "square"],
    },
    showBadge: { control: "boolean" },
    badgeColor: {
      control: "select",
      options: ["green", "red", "yellow", "gray"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "John Doe",
    size: "md",
    variant: "circle",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User avatar",
    name: "Jane Smith",
    size: "md",
  },
};

export const WithInitials: Story = {
  args: {
    name: "Sarah Johnson",
    size: "md",
    variant: "circle",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
      <Avatar name="2XL" size="2xl" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="Online" size="md" showBadge badgeColor="green" />
      <Avatar name="Busy" size="md" showBadge badgeColor="red" />
      <Avatar name="Away" size="md" showBadge badgeColor="yellow" />
      <Avatar name="Offline" size="md" showBadge badgeColor="gray" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="Circle" size="lg" variant="circle" />
      <Avatar name="Square" size="lg" variant="square" />
    </div>
  ),
};

export const AvatarGroupStory: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <AvatarGroup max={4} size="md">
        <Avatar src="https://i.pravatar.cc/150?img=1" name="User 1" />
        <Avatar src="https://i.pravatar.cc/150?img=2" name="User 2" />
        <Avatar src="https://i.pravatar.cc/150?img=3" name="User 3" />
        <Avatar src="https://i.pravatar.cc/150?img=4" name="User 4" />
        <Avatar src="https://i.pravatar.cc/150?img=5" name="User 5" />
        <Avatar src="https://i.pravatar.cc/150?img=6" name="User 6" />
      </AvatarGroup>

      <AvatarGroup max={3} size="sm">
        <Avatar name="Alice Johnson" />
        <Avatar name="Bob Smith" />
        <Avatar name="Charlie Brown" />
        <Avatar name="Diana Prince" />
        <Avatar name="Eve Adams" />
      </AvatarGroup>
    </div>
  ),
};
