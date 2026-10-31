import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { projects, work } from '@/app/content';
import { WorkGrid } from './work-grid';

const meta = {
  title: 'Components/WorkGrid',
  component: WorkGrid,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="mx-auto max-w-6xl p-6"><Story /></div>],
  parameters: { layout: 'fullscreen' },
  args: {
    projects,
    labels: work.labels,
    cardControls: work.cardControls,
    openIcon: work.openIcon,
  },
} satisfies Meta<typeof WorkGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TwoProjects: Story = { args: { projects: projects.slice(0, 2) } };
export const NoCardChrome: Story = { args: { cardControls: undefined, openIcon: undefined } };
