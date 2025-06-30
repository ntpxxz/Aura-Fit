import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle
}: BadgeProps) {
  const badgeStyle = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyles}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: '#F1F5F9',
  },
  primary: {
    backgroundColor: '#00D4AA',
  },
  secondary: {
    backgroundColor: '#64748B',
  },
  success: {
    backgroundColor: '#10B981',
  },
  warning: {
    backgroundColor: '#F59E0B',
  },
  error: {
    backgroundColor: '#EF4444',
  },
  smSize: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  mdSize: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lgSize: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  defaultText: {
    color: '#475569',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  successText: {
    color: 'white',
  },
  warningText: {
    color: 'white',
  },
  errorText: {
    color: 'white',
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
  lgText: {
    fontSize: 14,
  },
});