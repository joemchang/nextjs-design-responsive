import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RichText } from './rich-text';

const meta = {
  title: 'Components/RichText',
  component: RichText,
  tags: ['autodocs'],
  decorators: [(Story) => <p className="font-display text-6xl leading-none"><Story /></p>],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTones: Story = {
  args: {
    segments: [
      { text: 'chrome', tone: 'chrome' },
      ' ',
      { text: 'iridescent', tone: 'iridescent' },
      ' ',
      { text: 'accent', tone: 'accent' },
      ' ',
      { text: 'italic', tone: 'italic' },
    ],
  },
};
export const LineBreaks: Story = {
  args: { segments: ['First line\nSecond line\n', { text: 'Third', tone: 'chrome' }] },
};
export const PlainText: Story = { args: { segments: ['Just plain text.'] } };
