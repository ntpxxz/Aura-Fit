import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  gradient?: boolean;
  gradientColors?: string[];
}

export function Card({ 
  children, 
  style, 
  variant = 'default',
  gradient = false,
  gradientColors = ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[variant],
    style
  ];

  if (gradient) {
    return (
      <View style={cardStyle}>
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientContainer}
        >
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  elevated: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  gradientContainer: {
    flex: 1,
  },
});