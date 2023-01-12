import { useEffect, useRef } from 'react';
import { Animated, ColorValue } from 'react-native';
import { View } from '@components/atoms/default';

const ProgressBar = ({ current, total, barColor = '#00000080', progressColor = '#000000', height = '4px' }: IProgressBarProps): JSX.Element => {
  const updateProgressAnimation = useRef(new Animated.Value(0)).current;

  const getPercentage = (): number => {
    let percentage = (current / total) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    return percentage;
  };

  const interpolateWidth = updateProgressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp'
  });

  useEffect((): void => {
    Animated.timing(updateProgressAnimation, {
      useNativeDriver: false,
      toValue: getPercentage(),
      duration: 500
    }).start();
  }, [current, total]);

  return (
    <View className={'w-full'} style={{ backgroundColor: barColor, height }}>
      <Animated.View style={{ backgroundColor: progressColor, width: interpolateWidth, height: '4px' }} />
    </View>
  );
};

export interface IProgressBarProps {
  current: number;
  total: number;
  barColor?: ColorValue;
  progressColor?: ColorValue;
  height?: number | string;
}

export default ProgressBar;
