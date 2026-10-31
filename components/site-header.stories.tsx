import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { header, themeToggle } from '@/app/content';
import { SiteHeader } from './site-header';
import { ThemeToggle } from './theme-toggle';

const meta = {
  title: 'Components/SiteHeader',
  component: SiteHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...header, children: <ThemeToggle {...themeToggle} /> },
};
export const WithoutStatus: Story = {
  args: { ...header, statusLabel: undefined },
};
export const NoToggle: Story = { args: header };
