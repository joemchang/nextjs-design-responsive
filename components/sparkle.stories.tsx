import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sparkle } from './sparkle';

const meta = {
  title: 'Components/Sparkle',
  component: Sparkle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sparkle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { className: 'size-12 text-pink' } };
export const Violet: Story = { args: { className: 'size-12 text-violet' } };
export const Spinning: Story = { args: { className: 'size-12 text-pink spin-slow' } };
