import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./Badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text content of the badge",
    },
    color: {
      control: "color",
      description: "Background color of the badge",
    },
    textColor: {
      control: "color",
      description: "Text color of the badge",
    },
    logo: {
      description: "Optional React node to display before the label",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Badge",
  },
}

export const WithColor: Story = {
  args: {
    label: "Featured",
    color: "#3b82f6",
    textColor: "#ffffff",
  },
}

export const Dark: Story = {
  args: {
    label: "Dark Badge",
    color: "#1f2937",
    textColor: "#ffffff",
  },
}

export const Light: Story = {
  args: {
    label: "Light Badge",
    color: "#f3f4f6",
    textColor: "#1f2937",
  },
}

export const WithLogo: Story = {
  args: {
    label: "React",
    color: "#61dafb",
    textColor: "#000000",
    logo: <span>⚛️</span>,
  },
}

export const Success: Story = {
  args: {
    label: "Success",
    color: "#10b981",
    textColor: "#ffffff",
  },
}

export const Warning: Story = {
  args: {
    label: "Warning",
    color: "#f59e0b",
    textColor: "#ffffff",
  },
}

export const Danger: Story = {
  args: {
    label: "Danger",
    color: "#ef4444",
    textColor: "#ffffff",
  },
}
