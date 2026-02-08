import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { TabPanel } from "./TabPanel";
import { TabPanels } from "./TabPanels";

const meta: Meta<typeof Tabs> = {
  title: "UI Elements/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "enclosed", "soft-rounded", "solid-rounded"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    isFitted: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tabItems = [
  { key: "tab1", label: "Overview", content: <div style={{ padding: "16px" }}>Overview content goes here</div> },
  { key: "tab2", label: "Details", content: <div style={{ padding: "16px" }}>Details content goes here</div> },
  { key: "tab3", label: "Settings", content: <div style={{ padding: "16px" }}>Settings content goes here</div> },
];

export const Default: Story = {
  args: {
    items: tabItems,
    defaultValue: "tab1",
  },
};

export const CompoundComponents: Story = {
  render: () => (
    <Tabs defaultValue="profile">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="account">Account</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="profile">
          <div style={{ padding: "16px" }}>
            <h3>Profile Settings</h3>
            <p>Manage your profile information here.</p>
          </div>
        </TabPanel>
        <TabPanel value="account">
          <div style={{ padding: "16px" }}>
            <h3>Account Settings</h3>
            <p>Configure your account preferences.</p>
          </div>
        </TabPanel>
        <TabPanel value="billing">
          <div style={{ padding: "16px" }}>
            <h3>Billing Information</h3>
            <p>View and update your billing details.</p>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Fitted: Story = {
  args: {
    items: tabItems,
    defaultValue: "tab1",
    isFitted: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "500px" }}>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Line</h4>
        <Tabs variant="line" items={tabItems} defaultValue="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Enclosed</h4>
        <Tabs variant="enclosed" items={tabItems} defaultValue="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Soft Rounded</h4>
        <Tabs variant="soft-rounded" items={tabItems} defaultValue="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Solid Rounded</h4>
        <Tabs variant="solid-rounded" items={tabItems} defaultValue="tab1" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "500px" }}>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Small</h4>
        <Tabs size="sm" items={tabItems} defaultValue="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: "8px" }}>Medium</h4>
        <Tabs size="md" items={tabItems} defaultValue="tab1" />
      </div>
    </div>
  ),
};
