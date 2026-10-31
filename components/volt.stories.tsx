import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { volt } from '@/app/content';
import { Volt } from './volt';
import { VoltRobot } from './volt-robot';

const meta = {
  title: 'Components/Volt',
  component: Volt,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { ...volt, avatar: <VoltRobot /> },
  decorators: [
    (Story) => (
      <div className="h-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Volt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Greets immediately instead of after the usual delay. */
export const ImmediateGreeting: Story = { args: { greetingDelayMs: 0 } };
