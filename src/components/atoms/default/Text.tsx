import { styled, StyledProps } from 'nativewind';
import { forwardRef } from 'react';
import { Text as ReactText, TextProps } from 'react-native';

const StyledText = styled(ReactText);

export type ITextProps = StyledProps<TextProps> & {
  ignoreDefaultStyle?: boolean;
};

const Text = forwardRef((props: ITextProps, ref) => {
  const bundledProps = {
    ...props,
    className: `${props.ignoreDefaultStyle ? '' : 'font-poppins text-white'} ${props.className || ''}`
  };
  return <StyledText ref={ref} {...bundledProps} />;
});

Text.displayName = 'Text';

export default Text;
