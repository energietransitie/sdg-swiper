import { useEffect } from 'react';
import { Animated, OpaqueColorValue } from 'react-native';
import { View } from '@components/atoms/default';

const Skeleton = ({ height, width, backgroundColor = '#ECEFF1', skeletonColor = 'white', containerStyle = {} }: ISkeletonProps): JSX.Element => {
  const skeletonAnimation = new Animated.Value(0);
  const translateX = skeletonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, Number.isInteger(width) ? width as number : Number.parseInt((width as string).replace('px', ''), 10)]
  });

  const skeletonAnimated = (): void => {
    skeletonAnimation.setValue(0);
    Animated.timing(skeletonAnimation, {
      useNativeDriver: false,
      toValue: 1,
      duration: 350
    }).start(() => setTimeout(() => skeletonAnimated(), 1000));
  };

  useEffect((): void => {
    skeletonAnimated();
  });

  return (
    <View className={'overflow-hidden'} style={{ ...containerStyle, height, width, backgroundColor }}>
      <Animated.View style={{ width: '20%', height: '100%', backgroundColor: skeletonColor, opacity: 0.5, transform: [{ translateX }] }} />
    </View>
  );
};

export interface ISkeletonProps {
  height: string | number;
  width: string | number;
  backgroundColor?: string | OpaqueColorValue | undefined;
  skeletonColor?: string | OpaqueColorValue | undefined;
  containerStyle?: object;
}

export default Skeleton;
