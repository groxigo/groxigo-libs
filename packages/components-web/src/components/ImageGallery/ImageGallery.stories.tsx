import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ImageGallery } from "./ImageGallery";

const meta: Meta<typeof ImageGallery> = {
  title: "Components/ImageGallery",
  component: ImageGallery,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: {
      control: "select",
      options: ["16/9", "4/3", "1/1", "3/4"],
    },
    objectFit: {
      control: "select",
      options: ["cover", "contain", "fill"],
    },
    showPagination: { control: "boolean" },
    showArrows: { control: "boolean" },
    showThumbnails: { control: "boolean" },
    loop: { control: "boolean" },
    enableLightbox: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const productImages = [
  {
    src: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800",
    alt: "Fresh avocados on wooden board",
  },
  {
    src: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=800",
    alt: "Sliced avocado close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800",
    alt: "Avocado toast",
  },
  {
    src: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?w=800",
    alt: "Guacamole with chips",
  },
];

const recipeImages = [
  {
    src: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
    alt: "Butter chicken dish",
  },
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    alt: "Cooking process",
  },
  {
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    alt: "Ingredients",
  },
];

export const Default: Story = {
  args: {
    images: productImages,
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleImage: Story = {
  args: {
    images: [productImages[0]],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithThumbnails: Story = {
  args: {
    images: productImages,
    showThumbnails: true,
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const SquareAspectRatio: Story = {
  args: {
    images: productImages,
    aspectRatio: "1/1",
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const PortraitAspectRatio: Story = {
  args: {
    images: productImages,
    aspectRatio: "3/4",
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLoop: Story = {
  args: {
    images: productImages,
    loop: true,
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AutoPlay: Story = {
  args: {
    images: productImages,
    autoPlay: 3000,
    loop: true,
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NoControls: Story = {
  args: {
    images: productImages,
    showPagination: false,
    showArrows: false,
    enableLightbox: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ContainFit: Story = {
  args: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?w=400&h=600",
        alt: "Tall image",
      },
    ],
    objectFit: "contain",
    aspectRatio: "16/9",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px", background: "#f3f4f6" }}>
        <Story />
      </div>
    ),
  ],
};

export const RecipeGallery: Story = {
  args: {
    images: recipeImages,
    showThumbnails: true,
    aspectRatio: "4/3",
    onIndexChange: action("onIndexChange"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ProductDetail: Story = {
  render: () => (
    <div style={{ width: "800px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
      <ImageGallery
        images={productImages}
        showThumbnails
        aspectRatio="1/1"
        onIndexChange={action("onIndexChange")}
      />
      <div style={{ padding: "16px 0" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
          Fresh Organic Avocados
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          3 count pack of ripe, ready-to-eat avocados
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#16a34a" }}>$5.99</span>
          <span style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "line-through" }}>
            $7.99
          </span>
          <span
            style={{
              padding: "2px 8px",
              background: "#dcfce7",
              color: "#16a34a",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            25% OFF
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Our avocados are sourced from local farms and picked at peak ripeness.
          Perfect for guacamole, salads, or simply on toast.
        </p>
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ),
};

export const MobileCarousel: Story = {
  render: () => (
    <div
      style={{
        width: "375px",
        border: "8px solid #1f2937",
        borderRadius: "32px",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <ImageGallery
        images={productImages}
        aspectRatio="1/1"
        showThumbnails={false}
        onIndexChange={action("onIndexChange")}
      />
      <div style={{ padding: "16px" }}>
        <h2 style={{ fontWeight: 600, marginBottom: "4px" }}>Fresh Avocados</h2>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>3 count</p>
      </div>
    </div>
  ),
};
