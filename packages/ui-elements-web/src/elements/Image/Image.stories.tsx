import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "UI Elements/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    resizeMode: {
      control: "select",
      options: ["cover", "contain", "stretch", "center"],
    },
    fallbackType: {
      control: "select",
      options: ["skeleton", "placeholder", "none"],
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
    },
    circular: { control: "boolean" },
    priority: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    alt: "Healthy food bowl",
    width: 300,
    height: 200,
  },
};

export const ResizeModes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Cover</p>
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
          alt="Cover"
          width={150}
          height={100}
          resizeMode="cover"
        />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Contain</p>
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
          alt="Contain"
          width={150}
          height={100}
          resizeMode="contain"
        />
      </div>
    </div>
  ),
};

export const Circular: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    alt: "Profile picture",
    width: 120,
    height: 120,
    circular: true,
  },
};

export const WithAspectRatio: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>16:9</p>
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
          alt="16:9 aspect ratio"
          width={240}
          aspectRatio="16/9"
        />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>1:1</p>
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
          alt="1:1 aspect ratio"
          width={120}
          aspectRatio="1/1"
        />
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Skeleton fallback</p>
        <Image
          src="https://invalid-url-to-trigger-loading.com/image.jpg"
          alt="Loading skeleton"
          width={150}
          height={100}
          fallbackType="skeleton"
        />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "12px" }}>Placeholder fallback</p>
        <Image
          src="https://invalid-url-to-trigger-error.com/image.jpg"
          alt="Loading placeholder"
          width={150}
          height={100}
          fallbackType="placeholder"
        />
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Image
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
        alt="Rounded 8px"
        width={120}
        height={120}
        borderRadius={8}
      />
      <Image
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
        alt="Rounded 16px"
        width={120}
        height={120}
        borderRadius={16}
      />
      <Image
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
        alt="Circular"
        width={120}
        height={120}
        circular
      />
    </div>
  ),
};

export const ProductImages: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", width: "400px" }}>
      <Image
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"
        alt="Product 1"
        aspectRatio="1/1"
        borderRadius={8}
      />
      <Image
        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200"
        alt="Product 2"
        aspectRatio="1/1"
        borderRadius={8}
      />
      <Image
        src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200"
        alt="Product 3"
        aspectRatio="1/1"
        borderRadius={8}
      />
    </div>
  ),
};
