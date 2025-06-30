import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface StatusRingsProps {
  data: {
    steps: { current: number; target: number };
    calories: { current: number; target: number };
    healthScore: { current: number; target: number };
  };
  size: number;
}

export function StatusRings({ data, size }: StatusRingsProps) {
  const center = size / 2;
  const strokeWidth = 2.5;
  
  const rings = [
    {
      radius: size / 2 - 3,
      progress: data.healthScore.current / data.healthScore.target,
      color: '#00D4AA',
    },
    {
      radius: size / 2 - 8,
      progress: data.calories.current / data.calories.target,
      color: '#4ECDC4',
    },
    {
      radius: size / 2 - 13,
      progress: data.steps.current / data.steps.target,
      color: '#A8E6CF',
    },
  ];

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {rings.map((ring, index) => {
          const circumference = 2 * Math.PI * ring.radius;
          const strokeDasharray = circumference;
          const strokeDashoffset = circumference * (1 - Math.min(ring.progress, 1));

          return (
            <React.Fragment key={index}>
              {/* Background circle */}
              <Circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke="rgba(0, 0, 0, 0.06)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress circle */}
              <Circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});