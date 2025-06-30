import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { TrendingUp, Award, Calendar, Star, ChartBar as BarChart3, Activity, Target, ChevronRight, Filter, Clock, Utensils, Download, Share, Eye } from 'lucide-react-native';
import { WeightProgressChart } from '../../components/WeightProgressChart';
import { router } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1 Month');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const timeframes = ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];
  const categories = ['All', 'Nutrition', 'Exercise', 'Sleep', 'Health'];

  const progressData = {
    weight: { change: -2.5, unit: 'kg', trend: 'down' },
    bodyFat: { change: -3.2, unit: '%', trend: 'down' },
    muscle: { change: +1.8, unit: 'kg', trend: 'up' },
    healthScore: { change: +12, unit: 'pts', trend: 'up' },
  };

  const achievements = [
    {
      id: 1,
      title: 'Consistency Master',
      description: '30 days streak',
      icon: '🔥',
      unlocked: true,
      date: '2025-01-15',
      category: 'Habits',
    },
    {
      id: 2,
      title: 'Goal Crusher',
      description: 'Completed 5 goals',
      icon: '🎯',
      unlocked: true,
      date: '2025-01-10',
      category: 'Goals',
    },
    {
      id: 3,
      title: 'Health Champion',
      description: 'Health score above 80',
      icon: '🏆',
      unlocked: true,
      date: '2025-01-08',
      category: 'Health',
    },
    {
      id: 4,
      title: 'Step Master',
      description: '100k steps in a week',
      icon: '👟',
      unlocked: false,
      progress: 0.75,
      category: 'Fitness',
    },
    {
      id: 5,
      title: 'Nutrition Expert',
      description: 'Perfect nutrition week',
      icon: '🥗',
      unlocked: false,
      progress: 0.60,
      category: 'Nutrition',
    },
  ];

  const weeklyInsights = [
    {
      id: 1,
      title: 'Best Performance Day',
      value: 'Tuesday',
      description: 'Highest activity and nutrition scores',
      icon: Star,
      color: '#00D4AA',
      trend: '+15%',
    },
    {
      id: 2,
      title: 'Improvement Area',
      value: 'Sleep Quality',
      description: 'Average 6.2h, target 7-8h',
      icon: TrendingUp,
      color: '#FFE66D',
      trend: '-8%',
    },
    {
      id: 3,
      title: 'Streak Record',
      value: '12 Days',
      description: 'Current workout consistency',
      icon: Target,
      color: '#4ECDC4',
      trend: '+20%',
    },
    {
      id: 4,
      title: 'Calorie Balance',
      value: '95% Accuracy',
      description: 'Meeting daily calorie targets',
      icon: Activity,
      color: '#A8E6CF',
      trend: '+5%',
    },
  ];

  // Today's Food Log Data - Enhanced
  const todaysFoodLog = {
    date: '2025-01-20',
    dayName: 'Today',
    totalCalories: 1850,
    targetCalories: 2200,
    lastMeal: {
      type: 'Dinner',
      time: '7:15 PM',
      foods: [
        { name: 'Salmon', calories: 350, icon: '🐟', grade: 'A+' },
        { name: 'Sweet Potato', calories: 120, icon: '🍠', grade: 'A' },
        { name: 'Broccoli', calories: 55, icon: '🥦', grade: 'A+' },
      ],
      totalCalories: 525,
    },
    macros: { protein: 125, carbs: 180, fat: 65 },
    waterIntake: 6,
    avgGrade: 'A',
  };

  const getChangeColor = (trend: string) => {
    return trend === 'up' ? '#00D4AA' : '#FF6B6B';
  };

  const getChangeIcon = (trend: string) => {
    return trend === 'up' ? '↗' : '↘';
  };

  const handleViewAllInsights = () => {
    router.push('/advanced-analytics');
  };

  const handleViewAllFoodHistory = () => {
    router.push('/food-history');
  };

  const getCalorieStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return { status: 'On Track', color: '#00D4AA' };
    if (percentage < 90) return { status: 'Under Target', color: '#F59E0B' };
    return { status: 'Over Target', color: '#EF4444' };
  };

  const calorieStatus = getCalorieStatus(todaysFoodLog.totalCalories, todaysFoodLog.targetCalories);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return '#00D4AA';
      case 'B+':
      case 'B':
        return '#FFE66D';
      case 'C+':
      case 'C':
        return '#FF6B6B';
      default:
        return '#8E8E93';
    }
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Typography variant="h2">Progress Reports</Typography>
          <Typography variant="body" color="muted">
            Track your health journey and insights
          </Typography>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={20} color="#64748B" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#64748B" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Enhanced Timeframe Selector */}
        <View style={styles.filtersContainer}>
          <View style={styles.timeframeContainer}>
            <Typography variant="body" weight="semibold" style={styles.filterLabel}>
              Time Period
            </Typography>
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

          <View style={styles.categoryContainer}>
            <Typography variant="body" weight="semibold" style={styles.filterLabel}>
              Category
            </Typography>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Typography
                    variant="caption"
                    color={selectedCategory === category ? 'primary' : 'muted'}
                    weight="semibold"
                  >
                    {category}
                  </Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Enhanced Progress Summary */}
        <View style={styles.summaryContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>Progress Summary</Typography>
          <View style={styles.summaryGrid}>
            {Object.entries(progressData).map(([key, data]) => (
              <Card key={key} style={styles.summaryCard}>
                <View style={styles.summaryContent}>
                  <View style={styles.summaryHeader}>
                    <Typography variant="body" weight="semibold" style={styles.summaryLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Typography>
                    <TrendingUp 
                      size={16} 
                      color={getChangeColor(data.trend)} 
                      strokeWidth={2} 
                    />
                  </View>
                  <Typography 
                    variant="h3"
                    style={[styles.summaryValue, { color: getChangeColor(data.trend) }]}
                  >
                    {getChangeIcon(data.trend)} {Math.abs(data.change)}{data.unit}
                  </Typography>
                  <Typography variant="small" color="muted" style={styles.summaryPeriod}>
                    This {selectedTimeframe.toLowerCase()}
                  </Typography>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Enhanced Weight Progress Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Typography variant="h3" style={styles.sectionTitle}>Weight Progress</Typography>
            <TouchableOpacity style={styles.chartAction}>
              <Eye size={16} color="#00D4AA" strokeWidth={2} />
              <Typography variant="caption" color="accent">View Details</Typography>
            </TouchableOpacity>
          </View>
          <WeightProgressChart timeframe={selectedTimeframe} />
        </View>

        {/* Enhanced Today's Last Meal Section */}
        <View style={styles.foodLogContainer}>
          <View style={styles.foodLogHeader}>
            <Typography variant="h3" style={styles.sectionTitle}>Today's Last Meal</Typography>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={handleViewAllFoodHistory}
            >
              <Typography variant="caption" color="accent">View All</Typography>
              <ChevronRight size={16} color="#00D4AA" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <Card style={styles.todaysFoodCard}>
            <View style={styles.foodLogCardHeader}>
              <View style={styles.dayInfo}>
                <Typography variant="h4" weight="bold">{todaysFoodLog.dayName}</Typography>
                <Typography variant="caption" color="muted">{todaysFoodLog.date}</Typography>
              </View>
              <View style={styles.caloriesSummary}>
                <Typography variant="body" weight="semibold">
                  {todaysFoodLog.totalCalories} / {todaysFoodLog.targetCalories} cal
                </Typography>
                <Badge variant={calorieStatus.status === 'On Track' ? 'success' : calorieStatus.status === 'Under Target' ? 'warning' : 'error'} size="sm">
                  {calorieStatus.status}
                </Badge>
              </View>
            </View>

            {/* Calorie Progress Bar */}
            <View style={styles.calorieProgressContainer}>
              <View style={styles.calorieProgressTrack}>
                <View 
                  style={[
                    styles.calorieProgressFill, 
                    { 
                      width: `${Math.min((todaysFoodLog.totalCalories / todaysFoodLog.targetCalories) * 100, 100)}%`,
                      backgroundColor: calorieStatus.color 
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Last Meal Details */}
            <View style={styles.lastMealContainer}>
              <View style={styles.lastMealHeader}>
                <View style={styles.mealTypeContainer}>
                  <Utensils size={16} color="#64748B" strokeWidth={2} />
                  <Typography variant="body" weight="semibold">{todaysFoodLog.lastMeal.type}</Typography>
                </View>
                <Typography variant="caption" color="muted">{todaysFoodLog.lastMeal.time}</Typography>
              </View>
              
              <View style={styles.mealFoodsContainer}>
                {todaysFoodLog.lastMeal.foods.map((food, foodIndex) => (
                  <View key={foodIndex} style={styles.foodItem}>
                    <View style={styles.foodLeft}>
                      <Typography variant="body" style={styles.foodIcon}>{food.icon}</Typography>
                      <Typography variant="body" style={styles.foodName}>{food.name}</Typography>
                    </View>
                    <View style={styles.foodRight}>
                      <Typography variant="small" color="muted">{food.calories} cal</Typography>
                      <View style={[styles.foodGrade, { backgroundColor: getGradeColor(food.grade) }]}>
                        <Typography variant="small" style={styles.foodGradeText}>{food.grade}</Typography>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.mealTotalContainer}>
                <Typography variant="body" color="muted">Meal Total:</Typography>
                <Typography variant="body" weight="bold" color="accent">
                  {todaysFoodLog.lastMeal.totalCalories} cal
                </Typography>
              </View>
            </View>

            {/* Daily Summary Stats */}
            <View style={styles.dailySummaryStats}>
              <View style={styles.summaryStatItem}>
                <Typography variant="small" color="muted">Protein</Typography>
                <Typography variant="body" weight="semibold">{todaysFoodLog.macros.protein}g</Typography>
              </View>
              <View style={styles.summaryStatItem}>
                <Typography variant="small" color="muted">Carbs</Typography>
                <Typography variant="body" weight="semibold">{todaysFoodLog.macros.carbs}g</Typography>
              </View>
              <View style={styles.summaryStatItem}>
                <Typography variant="small" color="muted">Fat</Typography>
                <Typography variant="body" weight="semibold">{todaysFoodLog.macros.fat}g</Typography>
              </View>
              <View style={styles.summaryStatItem}>
                <Typography variant="small" color="muted">Water</Typography>
                <Typography variant="body" weight="semibold">{todaysFoodLog.waterIntake} glasses</Typography>
              </View>
            </View>
          </Card>
        </View>

        {/* Enhanced Weekly Insights */}
        <View style={styles.insightsContainer}>
          <View style={styles.insightsHeader}>
            <Typography variant="h3" style={styles.sectionTitle}>Weekly Insights</Typography>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={handleViewAllInsights}
            >
              <Typography variant="caption" color="accent">View All</Typography>
              <ChevronRight size={16} color="#00D4AA" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <View style={styles.insightsGrid}>
            {weeklyInsights.map((insight, index) => (
              <Card key={index} style={styles.insightCard}>
                <View style={styles.insightContent}>
                  <View style={styles.insightHeader}>
                    <View style={[styles.insightIcon, { backgroundColor: `${insight.color}15` }]}>
                      <insight.icon size={20} color={insight.color} strokeWidth={2} />
                    </View>
                    <View style={styles.insightTrend}>
                      <Typography variant="small" style={[styles.trendText, { color: insight.trend.startsWith('+') ? '#00D4AA' : '#FF6B6B' }]}>
                        {insight.trend}
                      </Typography>
                    </View>
                  </View>
                  <Typography variant="body" weight="semibold" style={styles.insightTitle}>
                    {insight.title}
                  </Typography>
                  <Typography variant="h4" color="accent" style={styles.insightValue}>
                    {insight.value}
                  </Typography>
                  <Typography variant="small" color="muted" style={styles.insightDescription}>
                    {insight.description}
                  </Typography>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Enhanced Achievements */}
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementsHeader}>
            <Typography variant="h3" style={styles.sectionTitle}>Achievements</Typography>
            <Badge variant="secondary" size="sm">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </Badge>
          </View>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <Card key={achievement.id} style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementCardLocked
              ]}>
                <View style={styles.achievementContent}>
                  <View style={styles.achievementLeft}>
                    <View style={[
                      styles.achievementIcon,
                      { backgroundColor: achievement.unlocked ? '#00D4AA15' : '#F1F5F915' }
                    ]}>
                      <Typography variant="h4">{achievement.icon}</Typography>
                    </View>
                    <View style={styles.achievementInfo}>
                      <Typography variant="body" weight="semibold" style={[
                        styles.achievementTitle,
                        !achievement.unlocked && styles.achievementTitleLocked
                      ]}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="small" color="muted" style={styles.achievementDescription}>
                        {achievement.description}
                      </Typography>
                      <Badge variant="secondary" size="sm" style={styles.achievementCategory}>
                        {achievement.category}
                      </Badge>
                      {achievement.unlocked && achievement.date && (
                        <View style={styles.achievementDate}>
                          <Calendar size={12} color="#8E8E93" strokeWidth={2} />
                          <Typography variant="small" color="muted">
                            Unlocked {achievement.date}
                          </Typography>
                        </View>
                      )}
                      {!achievement.unlocked && achievement.progress && (
                        <View style={styles.achievementProgressContainer}>
                          <View style={styles.achievementProgressBar}>
                            <View 
                              style={[
                                styles.achievementProgressFill, 
                                { width: `${achievement.progress * 100}%` }
                              ]} 
                            />
                          </View>
                          <Typography variant="small" color="muted">
                            {Math.round(achievement.progress * 100)}% complete
                          </Typography>
                        </View>
                      )}
                    </View>
                  </View>
                  {achievement.unlocked && (
                    <Award size={24} color="#00D4AA" strokeWidth={2} />
                  )}
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Export Options */}
        <View style={styles.exportContainer}>
          <Card style={styles.exportCard}>
            <View style={styles.exportContent}>
              <Typography variant="h4" style={styles.exportTitle}>
                Export Your Data
              </Typography>
              <Typography variant="body" color="muted" style={styles.exportDescription}>
                Download your health data and reports for personal records or sharing with healthcare providers.
              </Typography>
              <View style={styles.exportButtons}>
                <Button variant="outline" style={styles.exportButton}>
                  <Download size={16} color="#64748B" strokeWidth={2} />
                  <Typography variant="caption" color="secondary">PDF Report</Typography>
                </Button>
                <Button variant="outline" style={styles.exportButton}>
                  <Share size={16} color="#64748B" strokeWidth={2} />
                  <Typography variant="caption" color="secondary">Share Data</Typography>
                </Button>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerContent: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },

  // Enhanced Filters
  filtersContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 24,
    gap: 16,
  },
  timeframeContainer: {
    gap: 8,
  },
  categoryContainer: {
    gap: 8,
  },
  filterLabel: {
    marginBottom: 4,
  },
  timeframeScroll: {
    paddingRight: 20,
    gap: 8,
  },
  categoryScroll: {
    paddingRight: 20,
    gap: 8,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeframeButtonActive: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryButtonActive: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },

  // Summary
  summaryContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    width: (width - 56) / 2,
    padding: 16,
  },
  summaryContent: {
    gap: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryPeriod: {
    marginTop: 4,
  },

  // Chart
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Food Log
  foodLogContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  foodLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  todaysFoodCard: {
    padding: 20,
  },
  foodLogCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dayInfo: {
    flex: 1,
  },
  caloriesSummary: {
    alignItems: 'flex-end',
    gap: 8,
  },
  calorieProgressContainer: {
    marginBottom: 20,
  },
  calorieProgressTrack: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  calorieProgressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Last Meal
  lastMealContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  lastMealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealFoodsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  foodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  foodIcon: {
    fontSize: 18,
  },
  foodName: {
    flex: 1,
  },
  foodRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  foodGrade: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 24,
    alignItems: 'center',
  },
  foodGradeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10,
  },
  mealTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },

  dailySummaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  summaryStatItem: {
    alignItems: 'center',
    gap: 4,
  },

  // Insights
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    width: (width - 56) / 2,
    padding: 16,
  },
  insightContent: {
    gap: 8,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightTrend: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
  },
  insightTitle: {
    marginTop: 4,
  },
  insightValue: {
    marginVertical: 4,
  },
  insightDescription: {
    lineHeight: 16,
  },

  // Achievements
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    padding: 16,
  },
  achievementCardLocked: {
    opacity: 0.7,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  achievementLeft: {
    flex: 1,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementInfo: {
    gap: 4,
  },
  achievementTitle: {
    marginBottom: 2,
  },
  achievementTitleLocked: {
    color: '#94A3B8',
  },
  achievementDescription: {
    marginBottom: 8,
  },
  achievementCategory: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  achievementDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  achievementProgressContainer: {
    gap: 4,
  },
  achievementProgressBar: {
    height: 4,
    backgroundColor: 'rgba(142, 142, 147, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 2,
  },

  // Export
  exportContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  exportCard: {
    padding: 20,
  },
  exportContent: {
    gap: 16,
  },
  exportTitle: {
    marginBottom: 4,
  },
  exportDescription: {
    lineHeight: 22,
  },
  exportButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});