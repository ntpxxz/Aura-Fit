import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
}

export function Typography({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  style
}: TypographyProps) {
  const textStyle = [
    styles.base,
    styles[variant],
    styles[`${color}Color`],
    styles[`${weight}Weight`],
    styles[`${align}Align`],
    style
  ];

  return (
    <Text style={textStyle}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  h4: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  small: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
  },
  primaryColor: {
    color: '#1E293B',
  },
  secondaryColor: {
    color: '#475569',
  },
  mutedColor: {
    color: '#64748B',
  },
  accentColor: {
    color: '#00D4AA',
  },
  errorColor: {
    color: '#EF4444',
  },
  normalWeight: {
    fontWeight: '400',
  },
  mediumWeight: {
    fontWeight: '500',
  },
  semiboldWeight: {
    fontWeight: '600',
  },
  boldWeight: {
    fontWeight: '700',
  },
  leftAlign: {
    textAlign: 'left',
  },
  centerAlign: {
    textAlign: 'center',
  },
  rightAlign: {
    textAlign: 'right',
  },
});