import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { themeToggle } from '@/app/content';
import { ThemeToggle } from './theme-toggle';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: themeToggle };
export const CustomIcons: Story = { args: { ...themeToggle, lightIcon: '☼', darkIcon: '★' } };
