import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { about } from '@/app/content';
import { AboutSection } from './about-section';

const meta = {
  title: 'Components/AboutSection',
  component: AboutSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: about };
export const FewServices: Story = {
  args: { ...about, services: { ...about.services, items: about.services.items.slice(0, 2) } },
};
