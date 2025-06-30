import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AvatarProps {
  size: number;
  healthScore: number;
}

export function Avatar({ size, healthScore }: AvatarProps) {
  const getAuraColors = (score: number) => {
    if (score >= 80) return ['#00D4AA', '#4ECDC4'];
    if (score >= 60) return ['#FFE66D', '#FF6B6B'];
    return ['#FF6B6B', '#FF4757'];
  };

  const auraColors = getAuraColors(healthScore);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LinearGradient
        colors={[...auraColors, 'transparent']}
        style={[styles.aura, { width: size + 8, height: size + 8 }]}
      />
      <View style={[styles.avatarContainer, { width: size, height: size }]}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          }}
          style={[styles.avatar, { width: size - 4, height: size - 4 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  aura: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.3,
  },
  avatarContainer: {
    borderRadius: 1000,
    backgroundColor: 'white',
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    borderRadius: 1000,
  },
});