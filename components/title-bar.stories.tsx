import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TitleBar } from './title-bar';

const meta = {
  title: 'Components/TitleBar',
  component: TitleBar,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="window w-80"><Story /></div>],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TitleBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'readme.txt', controls: ['_', '□', '×'] } };
export const TwoControls: Story = { args: { title: 'about_me.txt', controls: ['_', '×'] } };
export const NoControls: Story = { args: { title: 'services.exe' } };
export const LongTitle: Story = {
  args: { title: 'a_really_long_file_name_that_should_truncate.psd', controls: ['_', '□', '×'] },
};
