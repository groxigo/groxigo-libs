import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./Drawer";
import { Button } from "../Button/Button";

const meta: Meta<typeof Drawer> = {
  title: "UI Elements/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "full"],
    },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    showCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerWrapper = ({
  placement = "right",
  size = "md"
}: {
  placement?: any;
  size?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement={placement}
        size={size}
      >
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>
          <p>This is the drawer content. You can put any content here.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: () => <DrawerWrapper />,
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <DrawerWrapper placement="left" />
      <DrawerWrapper placement="right" />
      <DrawerWrapper placement="top" />
      <DrawerWrapper placement="bottom" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <DrawerWrapper size="xs" />
      <DrawerWrapper size="sm" />
      <DrawerWrapper size="md" />
      <DrawerWrapper size="lg" />
      <DrawerWrapper size="xl" />
    </div>
  ),
};

export const WithScrollContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer with Scroll</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right" size="md">
          <DrawerHeader>Terms and Conditions</DrawerHeader>
          <DrawerBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={false}>
          <DrawerHeader>No Close Button</DrawerHeader>
          <DrawerBody>
            <p>This drawer has no close button. You must use the footer buttons to close it.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const LeftPlacement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left" size="md">
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ padding: "8px 0" }}><a href="#home">Home</a></li>
              <li style={{ padding: "8px 0" }}><a href="#products">Products</a></li>
              <li style={{ padding: "8px 0" }}><a href="#about">About</a></li>
              <li style={{ padding: "8px 0" }}><a href="#contact">Contact</a></li>
            </ul>
          </DrawerBody>
        </Drawer>
      </>
    );
  },
};

export const BottomPlacement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="bottom" size="md">
          <DrawerHeader>Quick Actions</DrawerHeader>
          <DrawerBody>
            <div style={{ display: "flex", gap: "12px", padding: "8px 0" }}>
              <Button>Share</Button>
              <Button>Download</Button>
              <Button>Copy Link</Button>
            </div>
          </DrawerBody>
        </Drawer>
      </>
    );
  },
};
