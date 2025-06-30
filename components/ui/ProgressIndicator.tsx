import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from './Typography';

interface ProgressIndicatorProps {
  progress: number; // 0-1
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  label?: string;
  style?: ViewStyle;
  animated?: boolean;
}

export function ProgressIndicator({
  progress,
  size = 'md',
  color = '#00D4AA',
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  showPercentage = false,
  label,
  style,
  animated = true
}: ProgressIndicatorProps) {
  const percentage = Math.round(progress * 100);
  
  const getHeight = () => {
    switch (size) {
      case 'sm': return 4;
      case 'md': return 6;
      case 'lg': return 8;
      default: return 6;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Typography variant="small" color="muted">{label}</Typography>
          {showPercentage && (
            <Typography variant="small" weight="semibold" color="accent">
              {percentage}%
            </Typography>
          )}
        </View>
      )}
      
      <View style={[styles.track, { height: getHeight(), backgroundColor }]}>
        <View 
          style={[
            styles.fill, 
            { 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: color,
              height: getHeight()
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  track: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 10,
  },
});