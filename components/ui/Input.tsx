import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'filled' | 'outlined';
}

export function Input({
  label,
  error,
  containerStyle,
  variant = 'default',
  style,
  ...props
}: InputProps) {
  const inputStyle = [
    styles.base,
    styles[variant],
    error && styles.error,
    style
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={inputStyle}
        placeholderTextColor="#94A3B8"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  base: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    minHeight: 48,
  },
  default: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filled: {
    backgroundColor: '#F1F5F9',
    borderWidth: 0,
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  error: {
    borderColor: '#EF4444',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    fontWeight: '500',
  },
});