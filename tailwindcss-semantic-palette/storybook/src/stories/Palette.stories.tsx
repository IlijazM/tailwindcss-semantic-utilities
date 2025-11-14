import type { Meta, StoryObj } from '@storybook/react-vite';

import { Palette } from './Palette';

const meta = {
  component: Palette,
} satisfies Meta<typeof Palette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
