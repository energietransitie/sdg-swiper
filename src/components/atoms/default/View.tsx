import { styled, StyledProps } from 'nativewind';
import { forwardRef } from 'react';
import { View as ReactView, ViewProps } from 'react-native';

const StyledView = styled(ReactView);

const View = forwardRef((props: StyledProps<ViewProps>, ref) => {
  return <StyledView ref={ref} {...props} />;
});
View.displayName = 'View';

export default View;
