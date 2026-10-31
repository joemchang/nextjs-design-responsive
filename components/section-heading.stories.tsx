import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { work } from '@/app/content';
import { SectionHeading } from './section-heading';

const meta = {
  title: 'Components/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="mx-auto max-w-6xl p-6"><Story /></div>],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: work.title, aside: work.aside } };
export const WithoutAside: Story = { args: { title: work.title } };
