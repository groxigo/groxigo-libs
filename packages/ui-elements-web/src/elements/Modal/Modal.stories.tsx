import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "UI Elements/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "full"],
    },
    placement: {
      control: "select",
      options: ["center", "top", "bottom"],
    },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    showCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ size = "md", placement = "center" }: { size?: any; placement?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size} placement={placement}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>This is the modal content. You can put any content here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <ModalWrapper size="xs" />
      <ModalWrapper size="sm" />
      <ModalWrapper size="md" />
      <ModalWrapper size="lg" />
      <ModalWrapper size="xl" />
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <ModalWrapper placement="center" />
      <ModalWrapper placement="top" />
      <ModalWrapper placement="bottom" />
    </div>
  ),
};

export const WithScrollContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Scroll</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader>Delete Item</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="error" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={false}>
          <ModalHeader>No Close Button</ModalHeader>
          <ModalBody>
            <p>This modal has no close button. You must use the footer buttons to close it.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
