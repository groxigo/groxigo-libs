import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof Radio> = {
  title: "UI Elements/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
    label: "Option 1",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Radio value="small" label="Small radio" size="sm" />
      <Radio value="medium" label="Medium radio" size="md" />
      <Radio value="large" label="Large radio" size="lg" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    value: "option",
    label: "Accept terms",
    helperText: "You must accept the terms and conditions",
    size: "md",
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Radio value="disabled1" label="Disabled radio" disabled />
      <Radio value="disabled2" label="Disabled and selected" disabled />
    </div>
  ),
};

export const RadioGroupVertical: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        value={value}
        onChange={setValue}
        name="vertical-group"
        label="Select an option"
        direction="vertical"
      >
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const RadioGroupHorizontal: Story = {
  render: () => {
    const [value, setValue] = useState("yes");
    return (
      <RadioGroup
        value={value}
        onChange={setValue}
        name="horizontal-group"
        label="Do you agree?"
        direction="horizontal"
      >
        <Radio value="yes" label="Yes" />
        <Radio value="no" label="No" />
        <Radio value="maybe" label="Maybe" />
      </RadioGroup>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <RadioGroup
        value={value}
        onChange={setValue}
        name="error-group"
        label="Select your preference"
        error={!value ? "Please select an option" : undefined}
        required
      >
        <Radio value="opt1" label="Option 1" />
        <Radio value="opt2" label="Option 2" />
        <Radio value="opt3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const GroupSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <RadioGroup defaultValue="sm1" name="small-group" label="Small Size" size="sm">
        <Radio value="sm1" label="Small 1" />
        <Radio value="sm2" label="Small 2" />
      </RadioGroup>

      <RadioGroup defaultValue="md1" name="medium-group" label="Medium Size" size="md">
        <Radio value="md1" label="Medium 1" />
        <Radio value="md2" label="Medium 2" />
      </RadioGroup>

      <RadioGroup defaultValue="lg1" name="large-group" label="Large Size" size="lg">
        <Radio value="lg1" label="Large 1" />
        <Radio value="lg2" label="Large 2" />
      </RadioGroup>
    </div>
  ),
};

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" name="disabled-group" label="Disabled Group" disabled>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
};
