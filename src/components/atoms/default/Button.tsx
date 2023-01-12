import type { GestureResponderEvent } from 'react-native';
import { Pressable, Text } from '@components/atoms/default';

const Button = (props: IButtonProps): JSX.Element => {
  return (
    <Pressable onPress={props.onPress} className={`btn ${props.extendClassName || ''}`}>
      <Text>{ props.label }</Text>
    </Pressable>
  );
};

export interface IButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  label: string;
  extendClassName?: string;
}

export default Button;
