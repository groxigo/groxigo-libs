import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI Elements/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "focus"],
    },
    hasArrow: { control: "boolean" },
    isDisabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "This is a tooltip",
    children: <button style={{ padding: "8px 16px" }}>Hover me</button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "60px", padding: "60px" }}>
      <Tooltip label="Top" placement="top">
        <button style={{ padding: "8px 16px" }}>Top</button>
      </Tooltip>
      <Tooltip label="Top Start" placement="top-start">
        <button style={{ padding: "8px 16px" }}>Top Start</button>
      </Tooltip>
      <Tooltip label="Top End" placement="top-end">
        <button style={{ padding: "8px 16px" }}>Top End</button>
      </Tooltip>
      <Tooltip label="Bottom" placement="bottom">
        <button style={{ padding: "8px 16px" }}>Bottom</button>
      </Tooltip>
      <Tooltip label="Bottom Start" placement="bottom-start">
        <button style={{ padding: "8px 16px" }}>Bottom Start</button>
      </Tooltip>
      <Tooltip label="Bottom End" placement="bottom-end">
        <button style={{ padding: "8px 16px" }}>Bottom End</button>
      </Tooltip>
      <Tooltip label="Left" placement="left">
        <button style={{ padding: "8px 16px" }}>Left</button>
      </Tooltip>
      <Tooltip label="Left Start" placement="left-start">
        <button style={{ padding: "8px 16px" }}>Left Start</button>
      </Tooltip>
      <Tooltip label="Left End" placement="left-end">
        <button style={{ padding: "8px 16px" }}>Left End</button>
      </Tooltip>
      <Tooltip label="Right" placement="right">
        <button style={{ padding: "8px 16px" }}>Right</button>
      </Tooltip>
      <Tooltip label="Right Start" placement="right-start">
        <button style={{ padding: "8px 16px" }}>Right Start</button>
      </Tooltip>
      <Tooltip label="Right End" placement="right-end">
        <button style={{ padding: "8px 16px" }}>Right End</button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      <Tooltip label="No delay" openDelay={0}>
        <button style={{ padding: "8px 16px" }}>No delay</button>
      </Tooltip>
      <Tooltip label="500ms delay" openDelay={500}>
        <button style={{ padding: "8px 16px" }}>500ms delay</button>
      </Tooltip>
      <Tooltip label="1000ms delay" openDelay={1000}>
        <button style={{ padding: "8px 16px" }}>1000ms delay</button>
      </Tooltip>
    </div>
  ),
};

export const WithoutArrow: Story = {
  args: {
    label: "Tooltip without arrow",
    hasArrow: false,
    children: <button style={{ padding: "8px 16px" }}>Hover me</button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    label: "Click to toggle",
    trigger: "click",
    children: <button style={{ padding: "8px 16px" }}>Click me</button>,
  },
};

export const LongContent: Story = {
  args: {
    label: "This is a very long tooltip message that demonstrates how the tooltip handles longer content. It should wrap nicely and remain readable.",
    children: <button style={{ padding: "8px 16px" }}>Hover for long text</button>,
  },
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip label="Settings">
      <button
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          background: "white",
        }}
        aria-label="Settings"
      >
        ⚙️
      </button>
    </Tooltip>
  ),
};
