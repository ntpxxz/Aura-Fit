import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from './Typography';

interface Tab {
  key: string;
  label: string;
  icon?: React.ComponentType<any>;
  description?: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  style?: ViewStyle;
}

export function Tabs({
  tabs,
  value,
  onValueChange,
  variant = 'default',
  style
}: TabsProps) {
  const activeIndex = tabs.findIndex(tab => tab.key === value);

  return (
    <View style={[styles.container, styles[variant], style]}>
      {variant === 'pills' && (
        <View 
          style={[
            styles.activeIndicator,
            {
              left: `${(activeIndex / tabs.length) * 100}%`,
              width: `${100 / tabs.length}%`,
            }
          ]} 
        />
      )}
      
      {tabs.map((tab, index) => {
        const isActive = tab.key === value;
        const Icon = tab.icon;
        
        return (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              variant === 'pills' && styles.pillTab,
              variant === 'underline' && styles.underlineTab,
              isActive && variant === 'underline' && styles.underlineTabActive,
              { width: `${100 / tabs.length}%` }
            ]}
            onPress={() => onValueChange(tab.key)}
            activeOpacity={0.7}
          >
            {Icon && (
              <Icon 
                size={18} 
                color={isActive ? '#00D4AA' : '#64748B'} 
                strokeWidth={2} 
              />
            )}
            <Typography
              variant="caption"
              color={isActive ? 'accent' : 'muted'}
              weight="semibold"
              align="center"
            >
              {tab.label}
            </Typography>
            {tab.description && (
              <Typography
                variant="small"
                color={isActive ? 'accent' : 'muted'}
                align="center"
                style={styles.description}
              >
                {tab.description}
              </Typography>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  default: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pills: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  underline: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    minHeight: 60,
    gap: 4,
  },
  pillTab: {
    borderRadius: 16,
    zIndex: 1,
  },
  underlineTab: {
    borderRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  underlineTabActive: {
    borderBottomColor: '#00D4AA',
  },
  activeIndicator: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    backgroundColor: '#00D4AA',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    marginTop: 2,
    lineHeight: 14,
  },
});