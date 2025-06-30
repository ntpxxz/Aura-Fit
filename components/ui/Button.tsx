import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
  gradientColors?: string[];
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  gradient = false,
  gradientColors = ['#00D4AA', '#4ECDC4']
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity
        style={[styles.base, styles[`${size}Size`], style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientButton}
        >
          <Text style={[styles.text, styles.primaryText, styles[`${size}Text`], textStyle]}>
            {children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  default: {
    backgroundColor: '#F1F5F9',
  },
  primary: {
    backgroundColor: '#00D4AA',
  },
  secondary: {
    backgroundColor: '#F8FAFC',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  smSize: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 32,
  },
  mdSize: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 40,
  },
  lgSize: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 48,
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
    color: '#64748B',
  },
  outlineText: {
    color: '#475569',
  },
  ghostText: {
    color: '#64748B',
  },
  disabledText: {
    color: '#94A3B8',
  },
  smText: {
    fontSize: 13,
  },
  mdText: {
    fontSize: 15,
  },
  lgText: {
    fontSize: 16,
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});