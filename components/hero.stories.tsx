import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { hero } from '@/app/content';
import { Hero } from './hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: hero };
export const WithoutBadge: Story = { args: { ...hero, badge: undefined } };
