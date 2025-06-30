import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Brain, TrendingUp, Target, Activity, Heart, Zap, Star, Award, ChevronRight, Calendar, Clock, ChartBar as BarChart3, ChartPie as PieChart, ChartLine as LineChart } from 'lucide-react-native';
import { router } from 'expo-router';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function InsightsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Week');

  const timeframes = ['Today', 'This Week', 'This Month', 'Last 3 Months'];

  const aiInsights = [
    {
      id: 1,
      type: 'prediction',
      title: 'Weight Goal Prediction',
      description: 'Based on your current progress, you\'ll reach your target weight by March 15th',
      confidence: 92,
      icon: Target,
      color: '#00D4AA',
      actionable: true,
      recommendation: 'Maintain current calorie deficit of 300-400 calories daily'
    },
    {
      id: 2,
      type: 'optimization',
      title: 'Workout Timing Optimization',
      description: 'Your performance peaks between 6-7 PM. Consider scheduling intense workouts then.',
      confidence: 87,
      icon: Activity,
      color: '#4ECDC4',
      actionable: true,
      recommendation: 'Schedule strength training sessions at 6:30 PM for optimal results'
    },
    {
      id: 3,
      type: 'health',
      title: 'Sleep Quality Impact',
      description: 'Your nutrition scores are 23% higher on days with 7+ hours of sleep',
      confidence: 95,
      icon: Heart,
      color: '#A8E6CF',
      actionable: true,
      recommendation: 'Prioritize 7-8 hours of sleep for better food choices'
    },
    {
      id: 4,
      type: 'pattern',
      title: 'Hydration Pattern',
      description: 'You drink 40% less water on weekends. This affects your energy levels.',
      confidence: 89,
      icon: Zap,
      color: '#FFE66D',
      actionable: true,
      recommendation: 'Set weekend water reminders to maintain hydration'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Consistency Score',
      value: 85,
      change: '+12%',
      trend: 'up',
      description: 'Daily habit completion rate',
      color: '#00D4AA'
    },
    {
      title: 'Nutrition Quality',
      value: 78,
      change: '+8%',
      trend: 'up',
      description: 'Average food grade score',
      color: '#4ECDC4'
    },
    {
      title: 'Activity Level',
      value: 92,
      change: '+15%',
      trend: 'up',
      description: 'Weekly activity target achievement',
      color: '#A8E6CF'
    },
    {
      title: 'Recovery Rate',
      value: 73,
      change: '-3%',
      trend: 'down',
      description: 'Sleep and stress management',
      color: '#FFE66D'
    }
  ];

  const weeklyTrends = [
    {
      day: 'Mon',
      score: 85,
      activities: ['Workout', 'Meal Prep'],
      mood: 'great'
    },
    {
      day: 'Tue',
      score: 92,
      activities: ['Cardio', 'Meditation'],
      mood: 'excellent'
    },
    {
      day: 'Wed',
      score: 78,
      activities: ['Rest Day'],
      mood: 'good'
    },
    {
      day: 'Thu',
      score: 88,
      activities: ['Strength', 'Yoga'],
      mood: 'great'
    },
    {
      day: 'Fri',
      score: 82,
      activities: ['Cardio'],
      mood: 'good'
    },
    {
      day: 'Sat',
      score: 75,
      activities: ['Hiking'],
      mood: 'good'
    },
    {
      day: 'Sun',
      score: 80,
      activities: ['Meal Prep'],
      mood: 'great'
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#00D4AA';
    if (confidence >= 80) return '#4ECDC4';
    if (confidence >= 70) return '#FFE66D';
    return '#FF6B6B';
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '🤩';
      case 'great': return '😊';
      case 'good': return '🙂';
      case 'okay': return '😐';
      default: return '😊';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Typography variant="h2">AI Insights</Typography>
          <Typography variant="body" color="muted">
            Personalized health intelligence powered by AI
          </Typography>
        </View>
        <View style={styles.aiIndicator}>
          <Brain size={20} color="#6366F1" strokeWidth={2} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Timeframe Selector */}
        <View style={styles.timeframeContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeframeScroll}
          >
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe && styles.timeframeButtonActive,
                ]}
                onPress={() => setSelectedTimeframe(timeframe)}
              >
                <Typography
                  variant="caption"
                  color={selectedTimeframe === timeframe ? 'primary' : 'muted'}
                  weight="semibold"
                >
                  {timeframe}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* AI Insights Section */}
        <View style={styles.insightsContainer}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">AI-Powered Insights</Typography>
            <Badge variant="primary" size="sm">
              <Brain size={12} color="white" strokeWidth={2} />
              <Typography variant="small" style={styles.badgeText}>AI</Typography>
            </Badge>
          </View>

          <View style={styles.insightsList}>
            {aiInsights.map((insight) => (
              <Card key={insight.id} style={styles.insightCard}>
                <View style={styles.insightContent}>
                  <View style={styles.insightHeader}>
                    <View style={[styles.insightIcon, { backgroundColor: `${insight.color}15` }]}>
                      <insight.icon size={24} color={insight.color} strokeWidth={2} />
                    </View>
                    <View style={styles.insightMeta}>
                      <Badge variant="secondary" size="sm">
                        {insight.type}
                      </Badge>
                      <View style={styles.confidenceIndicator}>
                        <View 
                          style={[
                            styles.confidenceDot, 
                            { backgroundColor: getConfidenceColor(insight.confidence) }
                          ]} 
                        />
                        <Typography variant="small" color="muted">
                          {insight.confidence}% confidence
                        </Typography>
                      </View>
                    </View>
                  </View>

                  <Typography variant="h4" style={styles.insightTitle}>
                    {insight.title}
                  </Typography>
                  <Typography variant="body" color="secondary" style={styles.insightDescription}>
                    {insight.description}
                  </Typography>

                  {insight.actionable && (
                    <View style={styles.recommendationContainer}>
                      <Typography variant="caption" weight="semibold" color="accent">
                        💡 Recommendation
                      </Typography>
                      <Typography variant="small" color="muted" style={styles.recommendationText}>
                        {insight.recommendation}
                      </Typography>
                    </View>
                  )}

                  <Button variant="ghost" size="sm" style={styles.insightAction}>
                    <Typography variant="caption" color="accent">Learn More</Typography>
                    <ChevronRight size={14} color="#00D4AA" strokeWidth={2} />
                  </Button>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>Performance Metrics</Typography>
          <View style={styles.metricsGrid}>
            {performanceMetrics.map((metric, index) => (
              <Card key={index} style={styles.metricCard}>
                <View style={styles.metricContent}>
                  <View style={styles.metricHeader}>
                    <Typography variant="body" weight="semibold">{metric.title}</Typography>
                    <View style={[styles.trendIndicator, { backgroundColor: metric.trend === 'up' ? '#00D4AA15' : '#FF6B6B15' }]}>
                      <TrendingUp 
                        size={12} 
                        color={metric.trend === 'up' ? '#00D4AA' : '#FF6B6B'} 
                        strokeWidth={2}
                        style={metric.trend === 'down' ? { transform: [{ rotate: '180deg' }] } : {}}
                      />
                      <Typography 
                        variant="small" 
                        style={{ color: metric.trend === 'up' ? '#00D4AA' : '#FF6B6B' }}
                      >
                        {metric.change}
                      </Typography>
                    </View>
                  </View>
                  
                  <Typography variant="h2" style={[styles.metricValue, { color: metric.color }]}>
                    {metric.value}
                  </Typography>
                  
                  <Typography variant="small" color="muted" style={styles.metricDescription}>
                    {metric.description}
                  </Typography>

                  {/* Progress Bar */}
                  <View style={styles.metricProgress}>
                    <View style={styles.progressTrack}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${metric.value}%`,
                            backgroundColor: metric.color 
                          }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Weekly Trends */}
        <View style={styles.trendsContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>Weekly Trends</Typography>
          <Card style={styles.trendsCard}>
            <View style={styles.trendsContent}>
              <View style={styles.trendsChart}>
                {weeklyTrends.map((day, index) => (
                  <View key={day.day} style={styles.dayColumn}>
                    <View style={styles.dayScore}>
                      <Typography variant="small" weight="bold" color="accent">
                        {day.score}
                      </Typography>
                    </View>
                    <View 
                      style={[
                        styles.dayBar, 
                        { 
                          height: `${day.score}%`,
                          backgroundColor: day.score >= 85 ? '#00D4AA' : day.score >= 75 ? '#4ECDC4' : '#FFE66D'
                        }
                      ]} 
                    />
                    <Typography variant="small" color="muted" style={styles.dayLabel}>
                      {day.day}
                    </Typography>
                    <Typography variant="body" style={styles.dayMood}>
                      {getMoodEmoji(day.mood)}
                    </Typography>
                  </View>
                ))}
              </View>
              
              <View style={styles.trendsLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#00D4AA' }]} />
                  <Typography variant="small" color="muted">Excellent (85+)</Typography>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
                  <Typography variant="small" color="muted">Good (75-84)</Typography>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FFE66D' }]} />
                  <Typography variant="small" color="muted">Fair (60-74)</Typography>
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>Personalized Recommendations</Typography>
          <Card style={styles.recommendationsCard}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.05)', 'rgba(99, 102, 241, 0.02)']}
              style={styles.recommendationsGradient}
            >
              <View style={styles.recommendationsHeader}>
                <Star size={24} color="#6366F1" strokeWidth={2} />
                <Typography variant="h4">This Week's Focus</Typography>
              </View>
              
              <View style={styles.recommendationsList}>
                <View style={styles.recommendationItem}>
                  <Typography variant="body" weight="semibold">🎯 Primary Goal</Typography>
                  <Typography variant="body" color="secondary">
                    Increase protein intake to 1.8g per kg body weight for better muscle recovery
                  </Typography>
                </View>
                
                <View style={styles.recommendationItem}>
                  <Typography variant="body" weight="semibold">💪 Workout Optimization</Typography>
                  <Typography variant="body" color="secondary">
                    Add 2 more strength training sessions this week for faster progress
                  </Typography>
                </View>
                
                <View style={styles.recommendationItem}>
                  <Typography variant="body" weight="semibold">😴 Recovery Focus</Typography>
                  <Typography variant="body" color="secondary">
                    Maintain 7+ hours of sleep to improve nutrition choices by 23%
                  </Typography>
                </View>
              </View>

              <Button variant="primary" style={styles.implementButton}>
                <Typography variant="body" style={styles.implementButtonText}>
                  Implement Recommendations
                </Typography>
              </Button>
            </LinearGradient>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    gap: 4,
  },
  aiIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },

  // Timeframe
  timeframeContainer: {
    paddingVertical: 20,
  },
  timeframeScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeframeButtonActive: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },

  // Insights
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeText: {
    color: 'white',
    marginLeft: 4,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  insightsList: {
    gap: 16,
  },
  insightCard: {
    padding: 20,
  },
  insightContent: {
    gap: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  confidenceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidenceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  insightTitle: {
    marginTop: 4,
  },
  insightDescription: {
    lineHeight: 22,
  },
  recommendationContainer: {
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  recommendationText: {
    lineHeight: 18,
  },
  insightAction: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Metrics
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 56) / 2,
    padding: 16,
  },
  metricContent: {
    gap: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 4,
  },
  metricDescription: {
    lineHeight: 16,
  },
  metricProgress: {
    marginTop: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Trends
  trendsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  trendsCard: {
    padding: 20,
  },
  trendsContent: {
    gap: 20,
  },
  trendsChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingBottom: 20,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  dayScore: {
    marginBottom: 4,
  },
  dayBar: {
    width: 20,
    backgroundColor: '#00D4AA',
    borderRadius: 10,
    minHeight: 20,
  },
  dayLabel: {
    marginTop: 8,
  },
  dayMood: {
    fontSize: 16,
  },
  trendsLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Recommendations
  recommendationsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  recommendationsCard: {
    overflow: 'hidden',
  },
  recommendationsGradient: {
    padding: 20,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  recommendationsList: {
    gap: 16,
    marginBottom: 24,
  },
  recommendationItem: {
    gap: 4,
  },
  implementButton: {
    alignSelf: 'stretch',
  },
  implementButtonText: {
    color: 'white',
  },
});