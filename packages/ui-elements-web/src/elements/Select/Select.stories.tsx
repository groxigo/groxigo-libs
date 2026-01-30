import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI Elements/Select",
  component: Select,
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
      options: ["outline", "filled", "flushed"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: "", label: "Select a country" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "250px" }}>
      <Select size="sm" options={countryOptions} placeholder="Small" />
      <Select size="md" options={countryOptions} placeholder="Medium" />
      <Select size="lg" options={countryOptions} placeholder="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "250px" }}>
      <Select variant="outline" options={countryOptions} placeholder="Outline" label="Outline" />
      <Select variant="filled" options={countryOptions} placeholder="Filled" label="Filled" />
      <Select variant="flushed" options={countryOptions} placeholder="Flushed" label="Flushed" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
    error: "Please select a country",
    isInvalid: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
    helperText: "Select your country of residence",
  },
};

export const Required: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    value: "us",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <Select
        label="Category"
        required
        options={[
          { value: "", label: "Select category" },
          { value: "electronics", label: "Electronics" },
          { value: "clothing", label: "Clothing" },
          { value: "food", label: "Food & Groceries" },
        ]}
      />
      <Select
        label="Sort By"
        options={[
          { value: "newest", label: "Newest First" },
          { value: "price-low", label: "Price: Low to High" },
          { value: "price-high", label: "Price: High to Low" },
          { value: "popular", label: "Most Popular" },
        ]}
        value="newest"
      />
      <Select
        label="Status"
        options={[
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "pending", label: "Pending" },
          { value: "archived", label: "Archived" },
        ]}
        helperText="Filter items by status"
      />
    </div>
  ),
};
