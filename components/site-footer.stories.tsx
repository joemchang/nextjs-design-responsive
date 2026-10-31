import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { footer } from '@/app/content';
import { SiteFooter } from './site-footer';

const meta = {
  title: 'Components/SiteFooter',
  component: SiteFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { copyright: `© 2026 ${footer.owner}`, tagline: footer.tagline },
};
export const CopyrightOnly: Story = { args: { copyright: `© 2026 ${footer.owner}` } };
