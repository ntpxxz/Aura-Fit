import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { User, TrendingUp, Zap, Activity, TriangleAlert as AlertTriangle, Target, CircleCheck as CheckCircle, Star, Award, ChevronRight, Heart, Flame, Scale, Dumbbell, Info } from 'lucide-react-native';
import { ReadyPlayerMeAvatar } from '../../components/ReadyPlayerMeAvatar';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { SlideTabs } from '../../components/ui/SlideTabs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const { width } = Dimensions.get('window');

export default function SimulationScreen() {
  const [selectedView, setSelectedView] = useState('current');

  const biometrics = {
    weight: 75.2,
    height: 175,
    bmi: 24.6,
    musclePercent: 42,
    fatPercent: 18,
    bmr: 1680,
  };

  const bodyViews = [
    {
      key: 'current',
      label: 'Current',
      icon: User,
      color: '#00D4AA',
    },
    {
      key: 'optimal',
      label: 'Optimal',
      icon: Target,
      color: '#00D4AA',
    },
    {
      key: 'risk',
      label: 'Risk',
      icon: AlertTriangle,
      color: '#EF4444',
    },
  ];

  const getAdviceCards = () => {
    switch (selectedView) {
      case 'current':
        return [
          {
            title: "Maintain Progress",
            subtitle: "Keep up the great work!",
            icon: CheckCircle,
            color: '#00D4AA',
            tips: [
              "Continue strength training 3-4x per week",
              "Maintain protein intake at 1.6g per kg",
              "Keep hydration at 2.5L daily",
              "Prioritize 7-8 hours of quality sleep"
            ],
            score: 85,
            category: "Maintenance"
          },
          {
            title: "Optimize Recovery",
            subtitle: "Enhance your rest periods",
            icon: Heart,
            color: '#A8E6CF',
            tips: [
              "Include active recovery days",
              "Practice stress management techniques",
              "Consider massage or foam rolling",
              "Monitor heart rate variability"
            ],
            score: 72,
            category: "Recovery"
          }
        ];
      case 'optimal':
        return [
          {
            title: "Body Recomposition",
            subtitle: "Build muscle, lose fat",
            icon: TrendingUp,
            color: '#00D4AA',
            tips: [
              "Increase training volume by 15-20%",
              "Create moderate caloric deficit (300-500 cal)",
              "Focus on compound movements",
              "Track progress with body measurements"
            ],
            score: 92,
            category: "Transformation"
          },
          {
            title: "Advanced Training",
            subtitle: "Next level performance",
            icon: Zap,
            color: '#4ECDC4',
            tips: [
              "Implement periodization in training",
              "Add plyometric exercises for power",
              "Include daily mobility work",
              "Consider working with a trainer"
            ],
            score: 88,
            category: "Performance"
          }
        ];
      case 'risk':
        return [
          {
            title: "Immediate Actions",
            subtitle: "Priority interventions needed",
            icon: AlertTriangle,
            color: '#EF4444',
            tips: [
              "Schedule comprehensive health checkup",
              "Reduce processed food intake by 80%",
              "Start with 20-minute daily walks",
              "Monitor blood pressure weekly"
            ],
            score: 45,
            category: "Critical"
          },
          {
            title: "Lifestyle Changes",
            subtitle: "Foundation for change",
            icon: Activity,
            color: '#F59E0B',
            tips: [
              "Establish consistent sleep schedule",
              "Reduce sedentary time by 50%",
              "Increase water intake to 2L minimum",
              "Practice stress reduction techniques"
            ],
            score: 52,
            category: "Lifestyle"
          }
        ];
      default:
        return [];
    }
  };

  const getCurrentMetrics = () => {
    switch (selectedView) {
      case 'current':
        return { weight: 75.2, muscle: 42, fat: 18, health: 78 };
      case 'optimal':
        return { weight: 73.5, muscle: 45, fat: 15, health: 92 };
      case 'risk':
        return { weight: 78.8, muscle: 38, fat: 25, health: 52 };
      default:
        return biometrics;
    }
  };

  const currentMetrics = getCurrentMetrics();
  const adviceCards = getAdviceCards();

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', variant: 'warning' as const, color: '#F59E0B' };
    if (bmi < 25) return { status: 'Normal', variant: 'success' as const, color: '#10B981' };
    if (bmi < 30) return { status: 'Overweight', variant: 'warning' as const, color: '#F59E0B' };
    return { status: 'Obese', variant: 'error' as const, color: '#EF4444' };
  };

  const bmiStatus = getBMIStatus(biometrics.bmi);

  // Compact Physical Measurements - Only 2 rows
  const physicalMeasurements = [
    { 
      label: 'Weight', 
      value: `${currentMetrics.weight} kg`, 
      icon: Scale, 
      color: '#00D4AA',
      change: currentMetrics.weight !== 75.2 ? `${(currentMetrics.weight - 75.2).toFixed(1)}kg` : null,
      status: 'normal'
    },
    { 
      label: 'Height', 
      value: `${biometrics.height} cm`, 
      icon: TrendingUp, 
      color: '#4ECDC4',
      change: null,
      status: 'normal'
    },
    { 
      label: 'BMI', 
      value: biometrics.bmi.toString(), 
      icon: Target, 
      color: bmiStatus.color,
      change: null,
      status: bmiStatus.status.toLowerCase()
    },
    { 
      label: 'BMR', 
      value: `${biometrics.bmr} cal`, 
      icon: Zap, 
      color: '#B8A9FF',
      change: null,
      status: 'normal'
    },
  ];

  // Body Composition metrics
  const bodyComposition = [
    { 
      label: 'Muscle Mass', 
      value: `${currentMetrics.muscle}%`, 
      icon: Dumbbell, 
      color: '#FFE66D',
      change: currentMetrics.muscle !== 42 ? `${(currentMetrics.muscle - 42).toFixed(1)}%` : null,
      status: currentMetrics.muscle > 40 ? 'good' : 'normal',
      description: 'Skeletal muscle percentage of total body weight'
    },
    { 
      label: 'Body Fat', 
      value: `${currentMetrics.fat}%`, 
      icon: Flame, 
      color: '#FF6B6B',
      change: currentMetrics.fat !== 18 ? `${(currentMetrics.fat - 18).toFixed(1)}%` : null,
      status: currentMetrics.fat < 20 ? 'good' : 'normal',
      description: 'Total body fat percentage'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'error': return '#EF4444';
      default: return '#64748B';
    }
  };

  const renderCompactMetricCard = (metric: any, index: number) => {
    const Icon = metric.icon;
    return (
      <View key={index} style={styles.compactMetricCard}>
        <View style={styles.compactMetricHeader}>
          <View style={[styles.compactMetricIcon, { backgroundColor: `${metric.color}15` }]}>
            <Icon size={18} color={metric.color} strokeWidth={2} />
          </View>
          <View style={styles.compactMetricInfo}>
            <Typography variant="caption" weight="semibold" style={styles.compactMetricLabel}>
              {metric.label}
            </Typography>
            <Typography variant="h4" weight="bold" style={[styles.compactMetricValue, { color: metric.color }]}>
              {metric.value}
            </Typography>
          </View>
          {metric.change && (
            <Badge 
              variant={parseFloat(metric.change) > 0 ? 'warning' : 'success'} 
              size="sm"
            >
              {metric.change}
            </Badge>
          )}
        </View>
      </View>
    );
  };

  const renderMetricCard = (metric: any, index: number) => {
    const Icon = metric.icon;
    return (
      <Card key={index} style={styles.metricCard}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIconContainer, { backgroundColor: `${metric.color}15` }]}>
            <Icon size={24} color={metric.color} strokeWidth={2} />
          </View>
          <View style={styles.metricHeaderInfo}>
            <Typography variant="h4" weight="semibold" style={styles.metricLabel}>
              {metric.label}
            </Typography>
            <View style={styles.metricStatus}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(metric.status) }]} />
              <Typography variant="small" color="muted" style={styles.metricStatusText}>
                {metric.status === 'good' ? 'Optimal' : metric.status === 'warning' ? 'Attention' : 'Normal'}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.metricContent}>
          <Typography variant="h2" weight="bold" style={[styles.metricValue, { color: metric.color }]}>
            {metric.value}
          </Typography>
          <Typography variant="body" color="muted" style={styles.metricDescription}>
            {metric.description}
          </Typography>
        </View>

        {metric.change && (
          <View style={styles.metricChange}>
            <Badge 
              variant={parseFloat(metric.change) > 0 ? 'warning' : 'success'} 
              size="sm"
            >
              {metric.change}
            </Badge>
            <Typography variant="small" color="muted">
              vs. baseline
            </Typography>
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Minimalist Header */}
      <View style={styles.header}>
        <Typography variant="h2" align="center">3D Body Analysis</Typography>
        <Typography variant="body" color="muted" align="center">
          Powered by Ready Player Me • Real-time 3D visualization
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Minimal Slide Tab Controls */}
        <View style={styles.tabContainer}>
          <SlideTabs
            tabs={bodyViews}
            value={selectedView}
            onValueChange={setSelectedView}
            containerWidth={width - 40}
            variant="minimal"
          />
        </View>

        {/* Expanded 3D Avatar Display - Full Width */}
        <View style={styles.avatarContainer}>
          <ReadyPlayerMeAvatar
            view={selectedView}
            musclePercent={currentMetrics.muscle}
            fatPercent={currentMetrics.fat}
            height={biometrics.height}
            weight={currentMetrics.weight}
            userId="aura-health-user"
          />
        </View>

        {/* Compact Physical Measurements Section - 2 Rows Only */}
        <View style={styles.compactMetricsSection}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Physical Measurements
          </Typography>
          <View style={styles.compactMetricsGrid}>
            {physicalMeasurements.map((metric, index) => renderCompactMetricCard(metric, index))}
          </View>
        </View>

        {/* Body Composition Section */}
        <View style={styles.metricsSection}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Body Composition
          </Typography>
          <View style={styles.metricsGrid}>
            {bodyComposition.map((metric, index) => renderMetricCard(metric, index))}
          </View>
        </View>

        {/* Health Score Summary */}
        <View style={styles.healthScoreSection}>
          <Card style={styles.healthScoreCard}>
            <View style={styles.healthScoreContent}>
              <View style={styles.healthScoreHeader}>
                <View style={styles.healthScoreIconContainer}>
                  <Heart size={32} color="#00D4AA" strokeWidth={2} />
                </View>
                <View style={styles.healthScoreInfo}>
                  <Typography variant="h3" style={styles.healthScoreTitle}>
                    Overall Health Score
                  </Typography>
                  <Typography variant="body" color="muted" style={styles.healthScoreDescription}>
                    Comprehensive health assessment based on all metrics
                  </Typography>
                </View>
              </View>
              
              <View style={styles.healthScoreDisplay}>
                <Typography variant="h1" color="accent" style={styles.healthScoreValue}>
                  {currentMetrics.health}
                </Typography>
                <Typography variant="caption" color="muted">out of 100</Typography>
              </View>

              <View style={styles.healthScoreInsight}>
                <Typography variant="body" color="secondary" style={styles.healthScoreInsightText}>
                  {currentMetrics.health >= 80 ? 'Excellent health metrics with room for optimization' :
                   currentMetrics.health >= 60 ? 'Good health foundation with improvement opportunities' :
                   'Focus areas identified for health improvement'}
                </Typography>
              </View>
            </View>
          </Card>
        </View>

        {/* Enhanced AI Recommendations */}
        <View style={styles.adviceContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>
            AI Recommendations - {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} Analysis
          </Typography>
          
          <View style={styles.adviceList}>
            {adviceCards.map((card, index) => (
              <Card key={index} variant="default" style={styles.adviceCard}>
                <View style={styles.adviceHeader}>
                  <View style={styles.adviceIconContainer}>
                    <View style={[styles.adviceIcon, { backgroundColor: card.color }]}>
                      <card.icon size={24} color="white" strokeWidth={2} />
                    </View>
                    <View style={styles.adviceInfo}>
                      <Typography variant="h4">{card.title}</Typography>
                      <Typography variant="caption" color="muted">
                        {card.subtitle}
                      </Typography>
                      <Badge variant="secondary" size="sm" style={styles.categoryBadge}>
                        {card.category}
                      </Badge>
                    </View>
                  </View>
                  <View style={styles.adviceScore}>
                    <Typography variant="h2" color="accent">
                      {card.score}
                    </Typography>
                    <Typography variant="small" color="muted">Score</Typography>
                  </View>
                </View>

                <View style={styles.tipsList}>
                  {card.tips.map((tip, tipIndex) => (
                    <View key={tipIndex} style={styles.tipItem}>
                      <View style={[styles.tipBullet, { backgroundColor: card.color }]} />
                      <Typography variant="body" style={styles.tipText}>
                        {tip}
                      </Typography>
                    </View>
                  ))}
                </View>

                <Button
                  variant="ghost"
                  onPress={() => {}}
                  style={styles.adviceAction}
                >
                  <View style={styles.actionContent}>
                    <Typography variant="body" color="accent">View Detailed Plan</Typography>
                    <ChevronRight size={16} color="#00D4AA" strokeWidth={2} />
                  </View>
                </Button>
              </Card>
            ))}
          </View>
        </View>

        {/* Enhanced Comparison Metrics */}
        {selectedView !== 'current' && (
          <View style={styles.comparisonContainer}>
            <Card style={styles.comparisonCard}>
              <Typography variant="h4" align="center" style={styles.comparisonTitle}>
                Transformation Preview
              </Typography>
              <Typography variant="body" color="muted" align="center" style={styles.comparisonSubtitle}>
                Changes from your current state
              </Typography>
              <View style={styles.comparisonGrid}>
                {[
                  { 
                    label: 'Weight', 
                    value: (currentMetrics.weight - 75.2).toFixed(1), 
                    unit: 'kg',
                    icon: Scale
                  },
                  { 
                    label: 'Muscle', 
                    value: (currentMetrics.muscle - 42).toFixed(1), 
                    unit: '%',
                    icon: Dumbbell
                  },
                  { 
                    label: 'Body Fat', 
                    value: (currentMetrics.fat - 18).toFixed(1), 
                    unit: '%',
                    icon: Flame
                  },
                  { 
                    label: 'Health Score', 
                    value: (currentMetrics.health - 78).toString(), 
                    unit: 'pts',
                    icon: Star
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const isPositive = parseFloat(item.value) >= 0;
                  const isGoodChange = (item.label === 'Body Fat' && !isPositive) || 
                                     (item.label !== 'Body Fat' && isPositive);
                  
                  return (
                    <View key={index} style={styles.comparisonItem}>
                      <Icon size={20} color={isGoodChange ? '#00D4AA' : '#F59E0B'} strokeWidth={2} />
                      <Typography variant="caption" color="muted">{item.label}</Typography>
                      <Typography 
                        variant="h4" 
                        weight="bold"
                        color={isGoodChange ? 'accent' : 'secondary'}
                      >
                        {parseFloat(item.value) > 0 ? '+' : ''}{item.value} {item.unit}
                      </Typography>
                    </View>
                  );
                })}
              </View>
            </Card>
          </View>
        )}

        {/* Ready Player Me Info */}
        <View style={styles.infoContainer}>
          <Card style={styles.infoCard}>
            <View style={styles.infoContent}>
              <Typography variant="h4" style={styles.infoTitle}>
                Powered by Ready Player Me
              </Typography>
              <Typography variant="body" color="muted" style={styles.infoDescription}>
                Your 3D avatar is generated in real-time based on your body metrics using advanced AI technology. 
                The model adapts to show different body compositions and health states.
              </Typography>
              <View style={styles.infoFeatures}>
                <View style={styles.infoFeature}>
                  <CheckCircle size={16} color="#00D4AA" strokeWidth={2} />
                  <Typography variant="small" color="muted">Real-time body composition</Typography>
                </View>
                <View style={styles.infoFeature}>
                  <CheckCircle size={16} color="#00D4AA" strokeWidth={2} />
                  <Typography variant="small" color="muted">Accurate 3D representation</Typography>
                </View>
                <View style={styles.infoFeature}>
                  <CheckCircle size={16} color="#00D4AA" strokeWidth={2} />
                  <Typography variant="small" color="muted">Multiple view modes</Typography>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 20,
  },
  
  // Expanded Avatar Section - Full Width
  avatarContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Compact Physical Measurements Section - 2 Rows Only
  compactMetricsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1A1A1A',
  },
  compactMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  compactMetricCard: {
    width: (width - 56) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  compactMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactMetricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactMetricInfo: {
    flex: 1,
    gap: 2,
  },
  compactMetricLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  compactMetricValue: {
    fontSize: 16,
    lineHeight: 18,
  },

  // Regular Metrics Sections - Body Composition
  metricsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  metricsGrid: {
    gap: 16,
  },

  // Individual Metric Cards - Body Composition
  metricCard: {
    padding: 20,
    backgroundColor: 'white',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricHeaderInfo: {
    flex: 1,
    gap: 4,
  },
  metricLabel: {
    color: '#1A1A1A',
  },
  metricStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricStatusText: {
    fontSize: 12,
  },
  metricContent: {
    marginBottom: 12,
    gap: 8,
  },
  metricValue: {
    fontSize: 28,
    lineHeight: 32,
  },
  metricDescription: {
    lineHeight: 20,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  // Health Score Section
  healthScoreSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  healthScoreCard: {
    padding: 24,
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  healthScoreContent: {
    gap: 20,
  },
  healthScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  healthScoreIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthScoreInfo: {
    flex: 1,
    gap: 4,
  },
  healthScoreTitle: {
    color: '#1A1A1A',
  },
  healthScoreDescription: {
    lineHeight: 20,
  },
  healthScoreDisplay: {
    alignItems: 'center',
    gap: 4,
  },
  healthScoreValue: {
    fontSize: 48,
    lineHeight: 52,
  },
  healthScoreInsight: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 212, 170, 0.2)',
  },
  healthScoreInsightText: {
    textAlign: 'center',
    lineHeight: 22,
  },

  // Advice Section
  adviceContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  adviceList: {
    gap: 16,
  },
  adviceCard: {
    padding: 24,
  },
  adviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  adviceIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    flex: 1,
  },
  adviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  adviceInfo: {
    flex: 1,
    gap: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  adviceScore: {
    alignItems: 'center',
    gap: 4,
  },
  tipsList: {
    gap: 12,
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 10,
  },
  tipText: {
    flex: 1,
    lineHeight: 24,
  },
  adviceAction: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  // Comparison Section
  comparisonContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  comparisonCard: {
    padding: 24,
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  comparisonTitle: {
    marginBottom: 8,
  },
  comparisonSubtitle: {
    marginBottom: 20,
  },
  comparisonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-around',
  },
  comparisonItem: {
    alignItems: 'center',
    minWidth: '20%',
    gap: 8,
  },

  // Info Section
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoCard: {
    padding: 20,
  },
  infoContent: {
    gap: 16,
  },
  infoTitle: {
    marginBottom: 4,
  },
  infoDescription: {
    lineHeight: 22,
  },
  infoFeatures: {
    gap: 8,
  },
  infoFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});