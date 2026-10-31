import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VoltRobot } from './volt-robot';

const meta = {
  title: 'Components/VoltRobot',
  component: VoltRobot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof VoltRobot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Waving is driven by an ancestor's `data-waving` attribute. */
export const Waving: Story = {
  decorators: [
    (Story) => (
      <div className="volt-btn" data-waving="true">
        <Story />
      </div>
    ),
  ],
};
