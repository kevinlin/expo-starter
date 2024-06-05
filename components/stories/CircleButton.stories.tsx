import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import CircleButton from "../CircleButton";

const CircleButtonMeta: Meta<typeof CircleButton> = {
  title: 'CircleButton',
  component: CircleButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    color: { control: {type: 'color' }},
    circleColor: { control: {type: 'color' }}
  },
  args: {
    color: '#e67e22',
    circleColor: '#e67e22',
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default CircleButtonMeta;

export const Basic: StoryObj<typeof CircleButton> = {};

export const AnotherExample: StoryObj<typeof CircleButton> = {
  args: {
    color: '#2ecc71',
    circleColor: '#2ecc71',
  },
};
