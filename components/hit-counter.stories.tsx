import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HitCounter } from './hit-counter';

const meta = {
  title: 'Components/HitCounter',
  component: HitCounter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HitCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Visitors', count: 4213 } };
export const FewDigits: Story = { args: { label: 'Hits', count: 7, digits: 4 } };
export const Million: Story = { args: { label: 'Visitors', count: 1000000, digits: 7 } };
