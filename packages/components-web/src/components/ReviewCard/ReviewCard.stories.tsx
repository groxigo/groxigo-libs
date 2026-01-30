import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ReviewCard } from "./ReviewCard";

const meta: Meta<typeof ReviewCard> = {
  title: "Components/ReviewCard",
  component: ReviewCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rating: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
    },
    verified: { control: "boolean" },
    isHelpful: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleReview = {
  reviewerName: "John Doe",
  reviewerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  rating: 5,
  review:
    "These avocados are absolutely perfect! They arrived ripe and ready to eat. Will definitely order again.",
  date: new Date("2024-12-15"),
  verified: true,
};

export const Default: Story = {
  args: {
    ...sampleReview,
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FiveStars: Story = {
  args: {
    ...sampleReview,
    rating: 5,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FourStars: Story = {
  args: {
    ...sampleReview,
    rating: 4,
    review: "Great quality produce. The only reason I'm not giving 5 stars is the delivery took a bit longer than expected.",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ThreeStars: Story = {
  args: {
    ...sampleReview,
    rating: 3,
    review: "The product was okay. Not bad, but I've had better. Average quality for the price.",
    verified: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LowRating: Story = {
  args: {
    reviewerName: "Jane Smith",
    rating: 2,
    review: "Unfortunately, the avocados arrived overripe and some were bruised. Disappointing experience.",
    date: new Date("2024-12-10"),
    verified: true,
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHelpfulCount: Story = {
  args: {
    ...sampleReview,
    helpfulCount: 12,
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const MarkedAsHelpful: Story = {
  args: {
    ...sampleReview,
    helpfulCount: 13,
    isHelpful: true,
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutAvatar: Story = {
  args: {
    reviewerName: "Anonymous User",
    rating: 4,
    review: "Good product, fast delivery. Would recommend to others.",
    date: new Date("2024-12-12"),
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const LongReview: Story = {
  args: {
    ...sampleReview,
    review:
      "I've been ordering groceries online for years, and I have to say that Groxigo has become my go-to service. The avocados I received were perfectly ripe - not too firm, not too soft. Each one was green and beautiful without any brown spots or bruises. I used them to make guacamole for a party, and everyone was raving about how fresh and flavorful it was. The packaging was also excellent - each avocado was individually wrapped to prevent damage during shipping. I've already placed another order and can't wait for it to arrive!",
    helpfulCount: 45,
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NotVerified: Story = {
  args: {
    reviewerName: "Mike Johnson",
    rating: 4,
    review: "Solid purchase. The quality is consistent and pricing is fair.",
    date: new Date("2024-12-08"),
    verified: false,
    onHelpfulClick: action("onHelpfulClick"),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ReviewList: Story = {
  render: () => (
    <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <ReviewCard
        reviewerName="John Doe"
        reviewerAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
        rating={5}
        review="Absolutely love these! Fresh, delicious, and delivered right to my door."
        date={new Date("2024-12-15")}
        verified={true}
        helpfulCount={12}
        onHelpfulClick={action("onHelpfulClick-1")}
      />
      <ReviewCard
        reviewerName="Sarah Wilson"
        reviewerAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
        rating={4}
        review="Great quality, but I wish the delivery was a bit faster. Overall satisfied with my purchase."
        date={new Date("2024-12-12")}
        verified={true}
        helpfulCount={8}
        onHelpfulClick={action("onHelpfulClick-2")}
      />
      <ReviewCard
        reviewerName="Anonymous"
        rating={3}
        review="Product was fine, nothing special. Met expectations."
        date={new Date("2024-12-10")}
        verified={false}
        helpfulCount={2}
        onHelpfulClick={action("onHelpfulClick-3")}
      />
    </div>
  ),
};

export const InProductPage: Story = {
  render: () => (
    <div style={{ width: "600px" }}>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontWeight: 600, fontSize: "20px" }}>Customer Reviews</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="w-5 h-5"
                fill={i <= 4 ? "#facc15" : "#e5e7eb"}
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span style={{ fontWeight: 500 }}>4.2</span>
          <span style={{ color: "#6b7280" }}>(128 reviews)</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <ReviewCard
          reviewerName="John Doe"
          reviewerAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
          rating={5}
          review="Best avocados I've ever ordered online!"
          date={new Date("2024-12-15")}
          verified={true}
          helpfulCount={12}
          onHelpfulClick={action("onHelpfulClick")}
        />
        <ReviewCard
          reviewerName="Sarah Wilson"
          rating={4}
          review="Great quality, will order again."
          date={new Date("2024-12-12")}
          verified={true}
          helpfulCount={5}
          onHelpfulClick={action("onHelpfulClick")}
        />
      </div>
      <button
        style={{
          marginTop: "16px",
          width: "100%",
          padding: "12px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          background: "white",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        View All 128 Reviews
      </button>
    </div>
  ),
};
