import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Typography } from './Typography';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = '#00D4AA',
  text 
}: LoadingSpinnerProps) {
  const rotation = useSharedValue(0);

  const getSize = () => {
    switch (size) {
      case 'sm': return 20;
      case 'md': return 32;
      case 'lg': return 48;
      default: return 32;
    }
  };

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const spinnerSize = getSize();

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.spinner,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderColor: `${color}20`,
            borderTopColor: color,
          },
          animatedStyle
        ]} 
      />
      {text && (
        <Typography variant="body" color="muted" style={styles.text}>
          {text}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  spinner: {
    borderWidth: 2,
    borderRadius: 100,
  },
  text: {
    textAlign: 'center',
  },
});