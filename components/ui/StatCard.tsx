import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from './Card';
import { Typography } from './Typography';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ComponentType<any>;
  color?: string;
  description?: string;
  style?: ViewStyle;
}

export function StatCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  color = '#00D4AA',
  description,
  style
}: StatCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return '#00D4AA';
      case 'down': return '#EF4444';
      default: return '#64748B';
    }
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.header}>
          {Icon && (
            <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
              <Icon size={20} color={color} strokeWidth={2} />
            </View>
          )}
          <View style={styles.titleContainer}>
            <Typography variant="caption" color="muted">{title}</Typography>
            {change && (
              <View style={styles.changeContainer}>
                {TrendIcon && (
                  <TrendIcon size={12} color={getTrendColor()} strokeWidth={2} />
                )}
                <Typography 
                  variant="small" 
                  style={{ color: getTrendColor() }}
                  weight="semibold"
                >
                  {change}
                </Typography>
              </View>
            )}
          </View>
        </View>
        
        <Typography variant="h3" weight="bold" style={[styles.value, { color }]}>
          {value}
        </Typography>
        
        {description && (
          <Typography variant="small" color="muted" style={styles.description}>
            {description}
          </Typography>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    marginTop: 4,
  },
  description: {
    lineHeight: 16,
  },
});