import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { contact } from '@/app/content';
import { ContactSection } from './contact-section';

const meta = {
  title: 'Components/ContactSection',
  component: ContactSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: contact };
export const Minimal: Story = {
  args: { ...contact, availabilityMarker: undefined, emailIcon: undefined },
};
