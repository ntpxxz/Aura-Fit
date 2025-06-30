import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolateColor,
  runOnJS
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from './Typography';

const { width } = Dimensions.get('window');

interface Tab {
  key: string;
  label: string;
  icon?: React.ComponentType<any>;
  description?: string;
  color?: string;
}

interface SlideTabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  style?: ViewStyle;
  containerWidth?: number;
  variant?: 'default' | 'minimal';
}

export function SlideTabs({
  tabs,
  value,
  onValueChange,
  style,
  containerWidth = width - 40,
  variant = 'default'
}: SlideTabsProps) {
  const activeIndex = tabs.findIndex(tab => tab.key === value);
  const tabWidth = containerWidth / tabs.length;
  
  // Animated values
  const translateX = useSharedValue(activeIndex * tabWidth);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  // Update animation when value changes
  React.useEffect(() => {
    const newIndex = tabs.findIndex(tab => tab.key === value);
    translateX.value = withSpring(newIndex * tabWidth, {
      damping: 20,
      stiffness: 200,
    });
    setCurrentIndex(newIndex);
  }, [value, tabWidth, translateX, tabs]);

  // Animated style for the sliding indicator
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Animated styles for tab content
  const getTabAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = index === currentIndex;
      const scale = withSpring(isActive ? 1 : 0.95, {
        damping: 15,
        stiffness: 150,
      });
      
      const opacity = withSpring(isActive ? 1 : 0.7, {
        damping: 15,
        stiffness: 150,
      });

      return {
        transform: [{ scale }],
        opacity,
      };
    });
  };

  const handleTabPress = (tabKey: string, index: number) => {
    onValueChange(tabKey);
  };

  if (variant === 'minimal') {
    return (
      <View style={[styles.minimalContainer, { width: containerWidth }, style]}>
        {/* Minimal Background */}
        <View style={styles.minimalBackground} />

        {/* Sliding Indicator - Minimal */}
        <Animated.View style={[styles.minimalIndicatorContainer, indicatorStyle]}>
          <View 
            style={[
              styles.minimalIndicator, 
              { 
                width: tabWidth - 8,
                backgroundColor: tabs[currentIndex]?.color || '#00D4AA'
              }
            ]} 
          />
        </Animated.View>

        {/* Tabs - Minimal */}
        <View style={styles.minimalTabsContainer}>
          {tabs.map((tab, index) => {
            const isActive = tab.key === value;
            const Icon = tab.icon;
            
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.minimalTab, { width: tabWidth }]}
                onPress={() => handleTabPress(tab.key, index)}
                activeOpacity={0.8}
              >
                <Animated.View 
                  style={[styles.minimalTabContent, getTabAnimatedStyle(index)]}
                >
                  {Icon && (
                    <Icon 
                      size={16} 
                      color={isActive ? 'white' : '#64748B'} 
                      strokeWidth={2} 
                    />
                  )}
                  <Typography
                    variant="small"
                    color={isActive ? 'primary' : 'muted'}
                    weight="semibold"
                    align="center"
                    style={[
                      styles.minimalTabLabel,
                      { color: isActive ? 'white' : '#64748B' }
                    ]}
                  >
                    {tab.label}
                  </Typography>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: containerWidth }, style]}>
      {/* Background */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.9)', 'rgba(241, 245, 249, 0.8)']}
        style={styles.background}
      />

      {/* Sliding Indicator */}
      <Animated.View style={[styles.indicatorContainer, indicatorStyle]}>
        <LinearGradient
          colors={tabs[currentIndex]?.color ? 
            [tabs[currentIndex].color, `${tabs[currentIndex].color}CC`] : 
            ['#00D4AA', '#4ECDC4']
          }
          style={[styles.indicator, { width: tabWidth - 8 }]}
        />
      </Animated.View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = tab.key === value;
          const Icon = tab.icon;
          
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => handleTabPress(tab.key, index)}
              activeOpacity={0.8}
            >
              <Animated.View 
                style={[styles.tabContent, getTabAnimatedStyle(index)]}
              >
                {Icon && (
                  <Icon 
                    size={20} 
                    color={isActive ? 'white' : '#64748B'} 
                    strokeWidth={2} 
                  />
                )}
                <Typography
                  variant="caption"
                  color={isActive ? 'primary' : 'muted'}
                  weight="semibold"
                  align="center"
                  style={[
                    styles.tabLabel,
                    { color: isActive ? 'white' : '#64748B' }
                  ]}
                >
                  {tab.label}
                </Typography>
                {tab.description && (
                  <Typography
                    variant="small"
                    align="center"
                    style={[
                      styles.tabDescription,
                      { color: isActive ? 'rgba(255, 255, 255, 0.9)' : '#94A3B8' }
                    ]}
                  >
                    {tab.description}
                  </Typography>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Subtle Border */}
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Default Variant Styles
  container: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    bottom: 4,
    zIndex: 1,
  },
  indicator: {
    flex: 1,
    borderRadius: 16,
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 2,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabDescription: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.1)',
    pointerEvents: 'none',
  },

  // Minimal Variant Styles
  minimalContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    height: 44,
  },
  minimalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  minimalIndicatorContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2,
    zIndex: 1,
  },
  minimalIndicator: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  minimalTabsContainer: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 2,
    height: 44,
  },
  minimalTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  minimalTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  minimalTabLabel: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
  },
});