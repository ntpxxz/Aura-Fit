import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { X, Bell, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Info } from 'lucide-react-native';
import { Typography } from '../ui/Typography';

interface NotificationBannerProps {
  type: 'success' | 'warning' | 'info' | 'reminder';
  title: string;
  message: string;
  visible: boolean;
  onDismiss: () => void;
  onAction?: () => void;
  actionText?: string;
  autoHide?: boolean;
  duration?: number;
}

export function NotificationBanner({
  type,
  title,
  message,
  visible,
  onDismiss,
  onAction,
  actionText,
  autoHide = true,
  duration = 5000,
}: NotificationBannerProps) {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      if (autoHide) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, autoHide, duration]);

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          backgroundColor: '#10B981',
          iconColor: 'white',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          backgroundColor: '#F59E0B',
          iconColor: 'white',
        };
      case 'info':
        return {
          icon: Info,
          backgroundColor: '#3B82F6',
          iconColor: 'white',
        };
      case 'reminder':
        return {
          icon: Bell,
          backgroundColor: '#00D4AA',
          iconColor: 'white',
        };
      default:
        return {
          icon: Bell,
          backgroundColor: '#00D4AA',
          iconColor: 'white',
        };
    }
  };

  const { icon: Icon, backgroundColor, iconColor } = getIconAndColors();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={[styles.banner, { backgroundColor }]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon size={20} color={iconColor} strokeWidth={2} />
          </View>
          
          <View style={styles.textContainer}>
            <Typography variant="body" weight="semibold" style={styles.title}>
              {title}
            </Typography>
            <Typography variant="small" style={styles.message}>
              {message}
            </Typography>
          </View>

          <View style={styles.actions}>
            {onAction && actionText && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onAction}
              >
                <Typography variant="small" weight="semibold" style={styles.actionText}>
                  {actionText}
                </Typography>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={handleDismiss}
            >
              <X size={18} color={iconColor} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 16,
    paddingTop: 60, // Account for status bar
  },
  banner: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: 'white',
  },
  message: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    color: 'white',
  },
  dismissButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});