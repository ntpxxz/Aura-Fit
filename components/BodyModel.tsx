import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BodyModelProps {
  view: string;
  musclePercent: number;
  fatPercent: number;
}

export function BodyModel({ view, musclePercent, fatPercent }: BodyModelProps) {
  const getBodyColor = () => {
    if (view === 'optimal') return '#00D4AA';
    if (view === 'risk') return '#FF6B6B';
    return '#4ECDC4';
  };

  const getMuscleDefinition = () => {
    if (musclePercent > 40) return 'high';
    if (musclePercent > 35) return 'medium';
    return 'low';
  };

  const getBodyFatLevel = () => {
    if (fatPercent > 20) return 'high';
    if (fatPercent > 15) return 'medium';
    return 'low';
  };

  const bodyColor = getBodyColor();
  const muscleDefinition = getMuscleDefinition();
  const bodyFatLevel = getBodyFatLevel();

  // Calculate body proportions based on composition
  const shoulderWidth = bodyFatLevel === 'high' ? 70 : muscleDefinition === 'high' ? 75 : 65;
  const waistWidth = bodyFatLevel === 'high' ? 60 : muscleDefinition === 'high' ? 50 : 55;
  const armWidth = muscleDefinition === 'high' ? 22 : bodyFatLevel === 'high' ? 20 : 18;
  const legWidth = muscleDefinition === 'high' ? 26 : bodyFatLevel === 'high' ? 24 : 22;

  return (
    <View style={styles.container}>
      <View style={styles.modelFrame}>
        <LinearGradient
          colors={['rgba(248, 249, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
          style={styles.backgroundGradient}
        >
          {/* Simplified 3D Human Body */}
          <View style={styles.humanBody}>
            
            {/* Head */}
            <View style={styles.headContainer}>
              <LinearGradient
                colors={['#F5C6A0', '#E8B088']}
                style={styles.head}
              />
            </View>

            {/* Neck */}
            <View style={styles.neckContainer}>
              <LinearGradient
                colors={['#F5C6A0', '#E8B088']}
                style={styles.neck}
              />
            </View>

            {/* Shoulders & Arms */}
            <View style={[styles.shouldersContainer, { width: shoulderWidth }]}>
              {/* Left Arm */}
              <View style={styles.armContainer}>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.upperArm, { width: armWidth }]}
                />
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.forearm, { width: armWidth - 3 }]}
                />
                <View style={styles.hand} />
              </View>

              {/* Torso */}
              <View style={styles.torsoContainer}>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.chest, { width: shoulderWidth - 15 }]}
                >
                  {muscleDefinition === 'high' && (
                    <View style={styles.chestMuscles} />
                  )}
                </LinearGradient>
                
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.waist, { width: waistWidth }]}
                >
                  {muscleDefinition === 'high' && (
                    <View style={styles.abMuscles} />
                  )}
                </LinearGradient>
              </View>

              {/* Right Arm */}
              <View style={styles.armContainer}>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.upperArm, { width: armWidth }]}
                />
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.forearm, { width: armWidth - 3 }]}
                />
                <View style={styles.hand} />
              </View>
            </View>

            {/* Hips */}
            <View style={styles.hipsContainer}>
              <LinearGradient
                colors={['#F5C6A0', '#E8B088']}
                style={[styles.hips, { width: waistWidth + 8 }]}
              />
            </View>

            {/* Legs */}
            <View style={styles.legsContainer}>
              {/* Left Leg */}
              <View style={styles.legContainer}>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.thigh, { width: legWidth }]}
                >
                  {muscleDefinition === 'high' && (
                    <View style={styles.legMuscle} />
                  )}
                </LinearGradient>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.calf, { width: legWidth - 4 }]}
                />
                <View style={styles.foot} />
              </View>

              {/* Right Leg */}
              <View style={styles.legContainer}>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.thigh, { width: legWidth }]}
                >
                  {muscleDefinition === 'high' && (
                    <View style={styles.legMuscle} />
                  )}
                </LinearGradient>
                <LinearGradient
                  colors={['#F5C6A0', '#E8B088']}
                  style={[styles.calf, { width: legWidth - 4 }]}
                />
                <View style={styles.foot} />
              </View>
            </View>
          </View>

          {/* Health Analysis Overlay */}
          <View style={styles.analysisOverlay}>
            <LinearGradient
              colors={[`${bodyColor}20`, `${bodyColor}10`]}
              style={styles.analysisGradient}
            />
          </View>

          {/* Compact Stats Panel */}
          <View style={styles.statsPanel}>
            <View style={[styles.statCard, { borderLeftColor: bodyColor }]}>
              <Text style={styles.statValue}>{musclePercent}%</Text>
              <Text style={styles.statLabel}>Muscle</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: bodyColor }]}>
              <Text style={styles.statValue}>{fatPercent}%</Text>
              <Text style={styles.statLabel}>Fat</Text>
            </View>
          </View>

          {/* View Mode Badge */}
          <View style={styles.viewBadgeContainer}>
            <LinearGradient
              colors={[bodyColor, `${bodyColor}DD`]}
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
  modelFrame: {
    width: 180,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  backgroundGradient: {
    flex: 1,
    position: 'relative',
  },
  humanBody: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
  },

  // Head
  headContainer: {
    marginBottom: 6,
  },
  head: {
    width: 32,
    height: 40,
    borderRadius: 20,
  },

  // Neck
  neckContainer: {
    marginBottom: 4,
  },
  neck: {
    width: 14,
    height: 12,
    borderRadius: 7,
  },

  // Shoulders & Arms
  shouldersContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  armContainer: {
    alignItems: 'center',
    gap: 3,
  },
  upperArm: {
    height: 40,
    borderRadius: 10,
    position: 'relative',
  },
  forearm: {
    height: 32,
    borderRadius: 8,
  },
  hand: {
    width: 12,
    height: 14,
    backgroundColor: '#F5C6A0',
    borderRadius: 7,
  },

  // Torso
  torsoContainer: {
    alignItems: 'center',
    gap: 4,
  },
  chest: {
    height: 45,
    borderRadius: 15,
    position: 'relative',
  },
  waist: {
    height: 32,
    borderRadius: 12,
    position: 'relative',
  },
  chestMuscles: {
    position: 'absolute',
    top: 8,
    left: 6,
    right: 6,
    height: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  abMuscles: {
    position: 'absolute',
    bottom: 4,
    left: 8,
    right: 8,
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
  },

  // Hips
  hipsContainer: {
    marginBottom: 6,
  },
  hips: {
    height: 25,
    borderRadius: 12,
  },

  // Legs
  legsContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
  },
  legContainer: {
    alignItems: 'center',
    gap: 3,
  },
  thigh: {
    height: 50,
    borderRadius: 12,
    position: 'relative',
  },
  calf: {
    height: 40,
    borderRadius: 10,
  },
  foot: {
    width: 14,
    height: 8,
    backgroundColor: '#F5C6A0',
    borderRadius: 6,
  },
  legMuscle: {
    position: 'absolute',
    top: 8,
    left: 2,
    right: 2,
    height: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },

  // Analysis Overlay
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  analysisGradient: {
    flex: 1,
  },

  // Compact Stats Panel
  statsPanel: {
    position: 'absolute',
    top: 12,
    right: 12,
    gap: 6,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderLeftWidth: 2,
    minWidth: 40,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 8,
    color: '#8E8E93',
    fontWeight: '500',
    textAlign: 'center',
  },

  // View Badge
  viewBadgeContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  viewBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  viewBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
});