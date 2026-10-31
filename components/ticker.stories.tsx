import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ticker } from '@/app/content';
import { Ticker } from './ticker';

const meta = {
  title: 'Components/Ticker',
  component: Ticker,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Ticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: ticker };
export const ShortList: Story = { args: { items: ['Hello', 'World'], separator: '•' } };
