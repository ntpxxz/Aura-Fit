import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';

interface ReadyPlayerMeAvatarProps {
  view: string;
  musclePercent: number;
  fatPercent: number;
  height: number;
  weight: number;
  userId?: string;
}

export function ReadyPlayerMeAvatar({ 
  view, 
  musclePercent, 
  fatPercent, 
  height, 
  weight,
  userId = 'default-user'
}: ReadyPlayerMeAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate avatar configuration based on body metrics
  const generateAvatarConfig = () => {
    // Calculate body type based on muscle and fat percentages
    const bodyType = getBodyType(musclePercent, fatPercent);
    const skinTone = getSkinTone(view);
    const outfit = getOutfit(view);

    return {
      bodyType,
      skinTone,
      outfit,
      height: normalizeHeight(height),
      weight: normalizeWeight(weight),
      muscleDefinition: normalizeMuscle(musclePercent),
      bodyFat: normalizeFat(fatPercent),
    };
  };

  const getBodyType = (muscle: number, fat: number) => {
    if (muscle > 40 && fat < 15) return 'athletic';
    if (muscle > 35 && fat < 20) return 'fit';
    if (fat > 25) return 'heavy';
    return 'average';
  };

  const getSkinTone = (viewType: string) => {
    // Different skin tones for different views
    switch (viewType) {
      case 'optimal': return 'medium';
      case 'risk': return 'light';
      default: return 'medium';
    }
  };

  const getOutfit = (viewType: string) => {
    // Different outfits to represent different states
    switch (viewType) {
      case 'optimal': return 'athletic-wear';
      case 'risk': return 'casual';
      default: return 'fitness';
    }
  };

  const normalizeHeight = (h: number) => {
    // Normalize height to Ready Player Me scale (0-1)
    return Math.max(0, Math.min(1, (h - 150) / 50));
  };

  const normalizeWeight = (w: number) => {
    // Normalize weight to Ready Player Me scale (0-1)
    return Math.max(0, Math.min(1, (w - 50) / 50));
  };

  const normalizeMuscle = (m: number) => {
    // Normalize muscle percentage to Ready Player Me scale (0-1)
    return Math.max(0, Math.min(1, m / 50));
  };

  const normalizeFat = (f: number) => {
    // Normalize fat percentage to Ready Player Me scale (0-1)
    return Math.max(0, Math.min(1, f / 30));
  };

  // Generate Ready Player Me URL
  const generateReadyPlayerMeUrl = () => {
    const config = generateAvatarConfig();
    const baseUrl = 'https://demo.readyplayer.me/avatar';
    
    // Create configuration parameters
    const params = new URLSearchParams({
      frameApi: 'true',
      clearCache: 'true',
      bodyType: config.bodyType,
      skinTone: config.skinTone,
      outfit: config.outfit,
      morphTargets: JSON.stringify({
        height: config.height,
        weight: config.weight,
        muscle: config.muscleDefinition,
        fat: config.bodyFat,
      }),
      userId: userId,
      viewMode: view,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = generateReadyPlayerMeUrl();
      setAvatarUrl(url);
    } catch (err) {
      setError('Failed to generate avatar');
      setIsLoading(false);
    }
  }, [view, musclePercent, fatPercent, height, weight, userId]);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.eventName === 'v1.avatar.exported') {
        // Avatar generation completed
        setIsLoading(false);
        console.log('Avatar generated:', data.url);
      } else if (data.eventName === 'v1.frame.ready') {
        // Frame is ready
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const handleWebViewError = () => {
    setError('Failed to load avatar');
    setIsLoading(false);
  };

  const getViewColor = () => {
    switch (view) {
      case 'optimal': return '#00D4AA';
      case 'risk': return '#EF4444';
      default: return '#4ECDC4';
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Avatar Loading Error</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          {/* Fallback to simple representation */}
          <View style={[styles.fallbackAvatar, { backgroundColor: getViewColor() }]}>
            <Text style={styles.fallbackText}>3D</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarFrame}>
        <LinearGradient
          colors={['rgba(248, 249, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
          style={styles.backgroundGradient}
        >
          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#00D4AA" />
              <Text style={styles.loadingText}>Generating 3D Avatar...</Text>
              <Text style={styles.loadingSubtext}>
                Customizing based on your metrics
              </Text>
            </View>
          )}

          {/* Ready Player Me WebView */}
          {avatarUrl && (
            <WebView
              source={{ uri: avatarUrl }}
              style={styles.webview}
              onMessage={handleWebViewMessage}
              onError={handleWebViewError}
              onLoadEnd={() => setIsLoading(false)}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              scrollEnabled={false}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* Simple View Badge */}
          <View style={styles.viewBadgeContainer}>
            <LinearGradient
              colors={[getViewColor(), `${getViewColor()}DD`]}
              style={styles.viewBadge}
            >
              <Text style={styles.viewBadgeText}>
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Text>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFrame: {
    width: 280,
    height: 400,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  backgroundGradient: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    gap: 12,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  fallbackAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fallbackText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },

  // Simple View Badge
  viewBadgeContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  viewBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  viewBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
});