import { Pressable as ReactPressable, PressableProps } from 'react-native';
import { styled, StyledProps } from 'nativewind';

const StyledPressable = styled(ReactPressable);

const Pressable = (props: StyledProps<PressableProps>): JSX.Element => {
  return <StyledPressable {...props} />;
};

export default Pressable;
