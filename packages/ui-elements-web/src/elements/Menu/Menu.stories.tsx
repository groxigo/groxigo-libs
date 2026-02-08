import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import { MenuButton } from "./MenuButton";
import { MenuList } from "./MenuList";
import { MenuItem } from "./MenuItem";
import { MenuDivider } from "./MenuDivider";

const meta: Meta<typeof Menu> = {
  title: "UI Elements/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
    closeOnSelect: { control: "boolean" },
    closeOnBlur: { control: "boolean" },
    autoSelect: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log("Edit")}>Edit</MenuItem>
        <MenuItem onClick={() => console.log("Duplicate")}>Duplicate</MenuItem>
        <MenuItem onClick={() => console.log("Archive")}>Archive</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Menu>
      <MenuButton>Options</MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log("Profile")}>View Profile</MenuItem>
        <MenuItem onClick={() => console.log("Settings")}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => console.log("Help")}>Help & Support</MenuItem>
        <MenuItem onClick={() => console.log("Logout")}>Logout</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Menu>
      <MenuButton>File</MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log("New")}>New</MenuItem>
        <MenuItem onClick={() => console.log("Open")}>Open</MenuItem>
        <MenuItem disabled>Save (disabled)</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => console.log("Close")}>Close</MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuButton>More Actions</MenuButton>
      <MenuList>
        <MenuItem
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          }
          onClick={() => console.log("Edit")}
        >
          Edit
        </MenuItem>
        <MenuItem
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            </svg>
          }
          onClick={() => console.log("Share")}
        >
          Share
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          }
          onClick={() => console.log("Delete")}
          isDestructive
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const WithRightElement: Story = {
  render: () => (
    <Menu>
      <MenuButton>View</MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => console.log("Zoom In")}
          rightElement={<span style={{ fontSize: "12px", color: "#888" }}>⌘+</span>}
        >
          Zoom In
        </MenuItem>
        <MenuItem
          onClick={() => console.log("Zoom Out")}
          rightElement={<span style={{ fontSize: "12px", color: "#888" }}>⌘-</span>}
        >
          Zoom Out
        </MenuItem>
        <MenuItem
          onClick={() => console.log("Reset Zoom")}
          rightElement={<span style={{ fontSize: "12px", color: "#888" }}>⌘0</span>}
        >
          Reset Zoom
        </MenuItem>
      </MenuList>
    </Menu>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log("Edit")}>Edit</MenuItem>
        <MenuItem onClick={() => console.log("Archive")}>Archive</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => console.log("Delete")} isDestructive>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  ),
};
