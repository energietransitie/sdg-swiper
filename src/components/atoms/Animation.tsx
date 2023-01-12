import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export interface IAnimationProps {
  config: Animated.TimingAnimationConfig;
  children: JSX.Element;
}

const Animation = (props: IAnimationProps): JSX.Element => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  
  useEffect((): void => {
    Animated.timing(
      fadeIn,
      props.config
    ).start();
  }, []);
  
  return (
    <Animated.View style={{ opacity: fadeIn }}>
      { props.children }   
    </Animated.View>
  );
};

export default Animation;
