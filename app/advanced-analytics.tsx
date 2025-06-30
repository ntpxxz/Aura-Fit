import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { ArrowLeft, Brain, TrendingUp, Target, Zap, Moon, Heart, Activity, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Star, Calendar, Clock, ChartBar as BarChart3, ChartPie as PieChart, ChartLine as LineChart, X, Utensils, Trophy, Award, Flame, Gift, ShoppingCart, ChefHat, Scan, BookOpen } from 'lucide-react-native';
import { router } from 'expo-router';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AdvancedAnalyticsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7 Days');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const timeframes = ['24 Hours', '7 Days', '30 Days', '3 Months'];
  const categories = ['All', 'Nutrition', 'Fitness', 'Sleep', 'Stress', 'Gamification', 'Food'];

  // AI Predictions and Insights
  const aiPredictions = [
    {
      id: 1,
      type: 'health_trend',
      title: 'Health Score Prediction',
      prediction: 'Your health score will reach 85 by next month',
      confidence: 92,
      trend: 'up',
      icon: TrendingUp,
      color: '#00D4AA',
      details: 'Based on your current nutrition and exercise patterns, we predict a 9% improvement in your overall health score.',
      recommendations: [
        'Maintain current protein intake levels',
        'Add 2 more strength training sessions per week',
        'Increase sleep duration by 30 minutes'
      ],
      timeline: '4 weeks',
      impact: 'High'
    },
    {
      id: 2,
      type: 'meal_recommendation',
      title: 'Optimal Meal Timing',
      prediction: 'Best meal window: 12:30-1:30 PM',
      confidence: 88,
      trend: 'stable',
      icon: Utensils,
      color: '#4ECDC4',
      details: 'Your metabolism peaks at 1 PM. Eating your largest meal during this window can improve nutrient absorption by 15%.',
      recommendations: [
        'Schedule main meal between 12:30-1:30 PM',
        'Include complex carbs for sustained energy',
        'Add lean protein for muscle recovery'
      ],
      timeline: 'Daily',
      impact: 'Medium'
    },
    {
      id: 3,
      type: 'workout_optimization',
      title: 'Peak Performance Window',
      prediction: 'Optimal workout time: 6:00-7:00 PM',
      confidence: 85,
      trend: 'up',
      icon: Zap,
      color: '#FFE66D',
      details: 'Your body temperature and hormone levels are optimal for exercise during evening hours, potentially increasing performance by 12%.',
      recommendations: [
        'Schedule high-intensity workouts at 6 PM',
        'Focus on strength training during this window',
        'Avoid caffeine 4 hours before workout'
      ],
      timeline: 'Daily',
      impact: 'High'
    },
    {
      id: 4,
      type: 'sleep_analysis',
      title: 'Sleep Pattern Optimization',
      prediction: 'Ideal bedtime: 10:30 PM for 7.5h sleep',
      confidence: 90,
      trend: 'stable',
      icon: Moon,
      color: '#A8E6CF',
      details: 'Your circadian rhythm analysis suggests optimal sleep quality with a 10:30 PM bedtime, aligning with your natural melatonin production.',
      recommendations: [
        'Start wind-down routine at 9:30 PM',
        'Avoid screens 1 hour before bed',
        'Keep room temperature at 18-20°C'
      ],
      timeline: 'Daily',
      impact: 'High'
    },
    {
      id: 5,
      type: 'stress_management',
      title: 'Stress Level Forecast',
      prediction: 'Elevated stress expected Thursday 2-4 PM',
      confidence: 78,
      trend: 'warning',
      icon: AlertTriangle,
      color: '#FF6B6B',
      details: 'Pattern analysis indicates increased stress levels during mid-week afternoons. Proactive management can reduce impact by 40%.',
      recommendations: [
        'Schedule 10-minute meditation at 1:30 PM',
        'Take short walks during stress peaks',
        'Practice deep breathing exercises'
      ],
      timeline: 'Weekly',
      impact: 'Medium'
    }
  ];

  const personalizedInsights = [
    {
      category: 'Nutrition',
      insight: 'Your protein intake is 23% above optimal levels',
      impact: 'Positive',
      action: 'Maintain current levels for muscle growth',
      icon: Target,
      color: '#00D4AA'
    },
    {
      category: 'Hydration',
      insight: 'Water intake drops 40% on weekends',
      impact: 'Negative',
      action: 'Set weekend hydration reminders',
      icon: Activity,
      color: '#4ECDC4'
    },
    {
      category: 'Exercise',
      insight: 'Recovery time improved by 15% this month',
      impact: 'Positive',
      action: 'Continue current recovery protocol',
      icon: Heart,
      color: '#A8E6CF'
    },
    {
      category: 'Sleep',
      insight: 'Deep sleep increased 18% with evening routine',
      impact: 'Positive',
      action: 'Maintain consistent bedtime routine',
      icon: Moon,
      color: '#B8A9FF'
    }
  ];

  const healthMetrics = {
    metabolicAge: { current: 28, biological: 32, trend: -4 },
    vo2Max: { current: 52, category: 'Excellent', trend: +3 },
    restingHR: { current: 58, optimal: '50-60', trend: -2 },
    hrv: { current: 45, category: 'Good', trend: +8 },
    bodyComposition: { muscle: 42, fat: 18, water: 60 },
    inflammationScore: { current: 2.1, category: 'Low', trend: -0.3 }
  };

  // Gamification & Motivation Features
  const gamificationFeatures = [
    {
      id: 1,
      title: 'XP/Level System',
      description: 'Earn experience points for health activities',
      icon: Trophy,
      color: '#FFD700',
      stats: {
        currentLevel: 12,
        currentXP: 2450,
        nextLevelXP: 3000,
        totalXP: 15750
      },
      activities: [
        { name: 'Daily workout', xp: 50 },
        { name: 'Meal logging', xp: 25 },
        { name: 'Water goal', xp: 15 },
        { name: 'Sleep target', xp: 30 }
      ]
    },
    {
      id: 2,
      title: 'Streak Rewards',
      description: 'Maintain consistency for bonus rewards',
      icon: Flame,
      color: '#FF6B6B',
      streaks: [
        { type: 'Workout', current: 12, best: 28, reward: 'Premium workout plan' },
        { type: 'Nutrition', current: 8, best: 15, reward: 'Recipe collection' },
        { type: 'Sleep', current: 5, best: 21, reward: 'Sleep optimization guide' }
      ]
    },
    {
      id: 3,
      title: 'Daily/Weekly Challenges',
      description: 'Complete challenges for extra rewards',
      icon: Target,
      color: '#4ECDC4',
      challenges: [
        { name: 'Hydration Hero', progress: 75, target: 100, reward: '50 XP + Badge' },
        { name: 'Step Master', progress: 8547, target: 10000, reward: '75 XP + Coins' },
        { name: 'Protein Power', progress: 125, target: 150, reward: '40 XP + Recipe' }
      ]
    },
    {
      id: 4,
      title: 'Virtual Rewards',
      description: 'Unlock badges, achievements, and collectibles',
      icon: Award,
      color: '#8B5CF6',
      rewards: [
        { name: 'Fitness Warrior', type: 'Badge', unlocked: true, rarity: 'Epic' },
        { name: 'Nutrition Expert', type: 'Achievement', unlocked: true, rarity: 'Rare' },
        { name: 'Sleep Champion', type: 'Title', unlocked: false, rarity: 'Legendary' },
        { name: 'Hydration Master', type: 'Badge', unlocked: true, rarity: 'Common' }
      ]
    },
    {
      id: 5,
      title: 'Progress Celebrations',
      description: 'Animated celebrations for milestones',
      icon: Gift,
      color: '#EC4899',
      celebrations: [
        { milestone: 'First Week Complete', animation: 'Confetti', unlocked: true },
        { milestone: '10 Workouts', animation: 'Fireworks', unlocked: true },
        { milestone: 'Health Score 80+', animation: 'Golden Glow', unlocked: false },
        { milestone: '30 Day Streak', animation: 'Rainbow Burst', unlocked: false }
      ]
    }
  ];

  // Advanced Food Features
  const advancedFoodFeatures = [
    {
      id: 1,
      title: 'Meal Planning & Prep',
      description: 'AI-powered meal planning based on your goals',
      icon: ChefHat,
      color: '#00D4AA',
      features: [
        'Weekly meal plans tailored to your macros',
        'Prep time optimization and batch cooking',
        'Shopping list auto-generation',
        'Seasonal ingredient recommendations'
      ],
      stats: {
        mealsPlanned: 28,
        prepTimeSaved: '4.5 hours',
        costSavings: '$127'
      }
    },
    {
      id: 2,
      title: 'Recipe Recommendations',
      description: 'Personalized recipes based on your preferences',
      icon: BookOpen,
      color: '#4ECDC4',
      features: [
        'Goal-specific recipe suggestions',
        'Dietary restriction filtering',
        'Cooking skill level adaptation',
        'Nutritional optimization scoring'
      ],
      recommendations: [
        { name: 'High-Protein Quinoa Bowl', match: 95, time: '15 min' },
        { name: 'Mediterranean Salmon', match: 88, time: '25 min' },
        { name: 'Green Power Smoothie', match: 92, time: '5 min' }
      ]
    },
    {
      id: 3,
      title: 'Grocery List Generation',
      description: 'Smart shopping lists with optimization',
      icon: ShoppingCart,
      color: '#FFE66D',
      features: [
        'Automatic list generation from meal plans',
        'Store layout optimization',
        'Price comparison and deals',
        'Inventory tracking and waste reduction'
      ],
      currentList: {
        items: 23,
        estimatedCost: '$67.50',
        stores: ['Whole Foods', 'Trader Joes'],
        savings: '$12.30'
      }
    },
    {
      id: 4,
      title: 'Restaurant Menu Scanner',
      description: 'Scan and analyze restaurant menus instantly',
      icon: Scan,
      color: '#A8E6CF',
      features: [
        'Real-time menu nutrition analysis',
        'Healthiest option recommendations',
        'Macro-friendly alternatives',
        'Allergen and dietary restriction alerts'
      ],
      recentScans: [
        { restaurant: 'Chipotle', recommendation: 'Burrito Bowl', score: 'A-' },
        { restaurant: 'Starbucks', recommendation: 'Protein Box', score: 'B+' },
        { restaurant: 'Subway', recommendation: 'Turkey Avocado', score: 'A' }
      ]
    },
    {
      id: 5,
      title: 'Macro-based Meal Suggestions',
      description: 'Intelligent meal suggestions for macro targets',
      icon: Target,
      color: '#B8A9FF',
      features: [
        'Real-time macro balancing',
        'Meal timing optimization',
        'Portion size recommendations',
        'Substitute ingredient suggestions'
      ],
      currentTargets: {
        protein: { current: 125, target: 150, remaining: 25 },
        carbs: { current: 180, target: 220, remaining: 40 },
        fat: { current: 65, target: 75, remaining: 10 }
      }
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#00D4AA';
    if (confidence >= 80) return '#4ECDC4';
    if (confidence >= 70) return '#FFE66D';
    return '#FF6B6B';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'warning': return '⚠️';
      default: return '→';
    }
  };

  const handlePredictionPress = (prediction: any) => {
    setSelectedPrediction(prediction);
    setShowDetailModal(true);
  };

  const filteredContent = () => {
    if (selectedCategory === 'All') {
      return { showAll: true };
    }
    return {
      showPredictions: ['Nutrition', 'Fitness', 'Sleep', 'Stress'].includes(selectedCategory),
      showMetrics: ['Fitness', 'Sleep'].includes(selectedCategory),
      showInsights: ['Nutrition', 'Fitness', 'Sleep'].includes(selectedCategory),
      showComposition: ['Fitness'].includes(selectedCategory),
      showRecovery: ['Fitness', 'Sleep'].includes(selectedCategory),
      showGamification: selectedCategory === 'Gamification',
      showFood: selectedCategory === 'Food'
    };
  };

  const content = filteredContent();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#1E293B" strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Typography variant="h2">Advanced Analytics</Typography>
          <Typography variant="body" color="muted">
            AI-powered health insights and gamification
          </Typography>
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

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
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

        {/* AI Predictions Section */}
        {(content.showAll || content.showPredictions) && (
          <View style={styles.predictionsContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Brain size={22} color="#6366F1" strokeWidth={2} />
                <Typography variant="h3">AI Predictions</Typography>
              </View>
              <Badge variant="primary" size="sm">
                Powered by AI
              </Badge>
            </View>

            <View style={styles.predictionsList}>
              {aiPredictions.map((prediction) => {
                const Icon = prediction.icon;
                return (
                  <TouchableOpacity
                    key={prediction.id}
                    onPress={() => handlePredictionPress(prediction)}
                    activeOpacity={0.8}
                  >
                    <Card style={styles.predictionCard}>
                      <View style={styles.predictionHeader}>
                        <View style={styles.predictionIconContainer}>
                          <View style={[styles.predictionIcon, { backgroundColor: `${prediction.color}12` }]}>
                            <Icon size={18} color={prediction.color} strokeWidth={2} />
                          </View>
                          <View style={styles.predictionInfo}>
                            <Typography variant="h4">{prediction.title}</Typography>
                            <Typography variant="body" color="secondary" style={styles.predictionText}>
                              {prediction.prediction}
                            </Typography>
                          </View>
                        </View>
                        <View style={styles.predictionMetrics}>
                          <View style={styles.confidenceContainer}>
                            <Typography variant="small" color="muted">Confidence</Typography>
                            <Typography 
                              variant="h4" 
                              style={[styles.confidenceText, { color: getConfidenceColor(prediction.confidence) }]}
                            >
                              {prediction.confidence}%
                            </Typography>
                          </View>
                          <Typography variant="h3" style={styles.trendEmoji}>
                            {getTrendIcon(prediction.trend)}
                          </Typography>
                        </View>
                      </View>

                      <Typography variant="body" color="muted" style={styles.predictionDetails}>
                        {prediction.details}
                      </Typography>

                      <View style={styles.predictionFooter}>
                        <Badge variant="secondary" size="sm">
                          {prediction.timeline}
                        </Badge>
                        <Badge 
                          variant={prediction.impact === 'High' ? 'success' : prediction.impact === 'Medium' ? 'warning' : 'secondary'} 
                          size="sm"
                        >
                          {prediction.impact} Impact
                        </Badge>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Gamification & Motivation Section */}
        {(content.showAll || content.showGamification) && (
          <View style={styles.gamificationContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Trophy size={22} color="#FFD700" strokeWidth={2} />
                <Typography variant="h3">Gamification & Motivation</Typography>
              </View>
              <Badge variant="warning" size="sm">
                Level 12
              </Badge>
            </View>

            <View style={styles.gamificationList}>
              {gamificationFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} style={styles.gamificationCard}>
                    <View style={styles.gamificationHeader}>
                      <View style={[styles.gamificationIcon, { backgroundColor: `${feature.color}15` }]}>
                        <Icon size={20} color={feature.color} strokeWidth={2} />
                      </View>
                      <View style={styles.gamificationInfo}>
                        <Typography variant="h4">{feature.title}</Typography>
                        <Typography variant="body" color="muted" style={styles.gamificationDescription}>
                          {feature.description}
                        </Typography>
                      </View>
                    </View>

                    {/* XP/Level System Details */}
                    {feature.id === 1 && (
                      <View style={styles.xpSystemDetails}>
                        <View style={styles.levelProgress}>
                          <View style={styles.levelInfo}>
                            <Typography variant="h2" color="accent">Level {feature.stats.currentLevel}</Typography>
                            <Typography variant="small" color="muted">
                              {feature.stats.currentXP} / {feature.stats.nextLevelXP} XP
                            </Typography>
                          </View>
                          <View style={styles.xpProgressBar}>
                            <View 
                              style={[
                                styles.xpProgressFill, 
                                { 
                                  width: `${(feature.stats.currentXP / feature.stats.nextLevelXP) * 100}%`,
                                  backgroundColor: feature.color 
                                }
                              ]} 
                            />
                          </View>
                        </View>
                        <View style={styles.xpActivities}>
                          {feature.activities.map((activity, index) => (
                            <View key={index} style={styles.xpActivity}>
                              <Typography variant="small">{activity.name}</Typography>
                              <Typography variant="small" style={[styles.xpValue, { color: feature.color }]}>
                                +{activity.xp} XP
                              </Typography>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Streak Rewards Details */}
                    {feature.id === 2 && (
                      <View style={styles.streakDetails}>
                        {feature.streaks.map((streak, index) => (
                          <View key={index} style={styles.streakItem}>
                            <View style={styles.streakInfo}>
                              <Typography variant="body" weight="semibold">{streak.type}</Typography>
                              <Typography variant="small" color="muted">Best: {streak.best} days</Typography>
                            </View>
                            <View style={styles.streakCurrent}>
                              <Typography variant="h4" style={[styles.streakNumber, { color: feature.color }]}>
                                {streak.current}
                              </Typography>
                              <Typography variant="small" color="muted">days</Typography>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Challenges Details */}
                    {feature.id === 3 && (
                      <View style={styles.challengesDetails}>
                        {feature.challenges.map((challenge, index) => (
                          <View key={index} style={styles.challengeItem}>
                            <View style={styles.challengeInfo}>
                              <Typography variant="body" weight="semibold">{challenge.name}</Typography>
                              <Typography variant="small" color="muted">{challenge.reward}</Typography>
                            </View>
                            <View style={styles.challengeProgress}>
                              <Typography variant="small" color="muted">
                                {challenge.progress} / {challenge.target}
                              </Typography>
                              <View style={styles.challengeProgressBar}>
                                <View 
                                  style={[
                                    styles.challengeProgressFill, 
                                    { 
                                      width: `${(challenge.progress / challenge.target) * 100}%`,
                                      backgroundColor: feature.color 
                                    }
                                  ]} 
                                />
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Rewards Details */}
                    {feature.id === 4 && (
                      <View style={styles.rewardsDetails}>
                        {feature.rewards.map((reward, index) => (
                          <View key={index} style={styles.rewardItem}>
                            <View style={styles.rewardInfo}>
                              <Typography variant="body" weight="semibold">{reward.name}</Typography>
                              <Typography variant="small" color="muted">{reward.type}</Typography>
                            </View>
                            <View style={styles.rewardStatus}>
                              <Badge 
                                variant={reward.unlocked ? 'success' : 'secondary'} 
                                size="sm"
                              >
                                {reward.unlocked ? 'Unlocked' : 'Locked'}
                              </Badge>
                              <Typography variant="small" style={[styles.rarityText, { color: feature.color }]}>
                                {reward.rarity}
                              </Typography>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Celebrations Details */}
                    {feature.id === 5 && (
                      <View style={styles.celebrationsDetails}>
                        {feature.celebrations.map((celebration, index) => (
                          <View key={index} style={styles.celebrationItem}>
                            <View style={styles.celebrationInfo}>
                              <Typography variant="body" weight="semibold">{celebration.milestone}</Typography>
                              <Typography variant="small" color="muted">{celebration.animation}</Typography>
                            </View>
                            <Badge 
                              variant={celebration.unlocked ? 'success' : 'secondary'} 
                              size="sm"
                            >
                              {celebration.unlocked ? 'Unlocked' : 'Locked'}
                            </Badge>
                          </View>
                        ))}
                      </View>
                    )}
                  </Card>
                );
              })}
            </View>
          </View>
        )}

        {/* Advanced Food Features Section */}
        {(content.showAll || content.showFood) && (
          <View style={styles.foodFeaturesContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <ChefHat size={22} color="#00D4AA" strokeWidth={2} />
                <Typography variant="h3">Advanced Food Features</Typography>
              </View>
              <Badge variant="success" size="sm">
                AI Powered
              </Badge>
            </View>

            <View style={styles.foodFeaturesList}>
              {advancedFoodFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} style={styles.foodFeatureCard}>
                    <View style={styles.foodFeatureHeader}>
                      <View style={[styles.foodFeatureIcon, { backgroundColor: `${feature.color}15` }]}>
                        <Icon size={20} color={feature.color} strokeWidth={2} />
                      </View>
                      <View style={styles.foodFeatureInfo}>
                        <Typography variant="h4">{feature.title}</Typography>
                        <Typography variant="body" color="muted" style={styles.foodFeatureDescription}>
                          {feature.description}
                        </Typography>
                      </View>
                    </View>

                    <View style={styles.foodFeatureContent}>
                      {feature.features.map((item, index) => (
                        <View key={index} style={styles.foodFeatureItem}>
                          <View style={[styles.foodFeatureBullet, { backgroundColor: feature.color }]} />
                          <Typography variant="body" style={styles.foodFeatureText}>
                            {item}
                          </Typography>
                        </View>
                      ))}
                    </View>

                    {/* Meal Planning Stats */}
                    {feature.id === 1 && feature.stats && (
                      <View style={styles.mealPlanningStats}>
                        <View style={styles.statItem}>
                          <Typography variant="h4" color="accent">{feature.stats.mealsPlanned}</Typography>
                          <Typography variant="small" color="muted">Meals Planned</Typography>
                        </View>
                        <View style={styles.statItem}>
                          <Typography variant="h4" color="accent">{feature.stats.prepTimeSaved}</Typography>
                          <Typography variant="small" color="muted">Time Saved</Typography>
                        </View>
                        <View style={styles.statItem}>
                          <Typography variant="h4" color="accent">{feature.stats.costSavings}</Typography>
                          <Typography variant="small" color="muted">Cost Savings</Typography>
                        </View>
                      </View>
                    )}

                    {/* Recipe Recommendations */}
                    {feature.id === 2 && feature.recommendations && (
                      <View style={styles.recipeRecommendations}>
                        {feature.recommendations.map((recipe, index) => (
                          <View key={index} style={styles.recipeItem}>
                            <View style={styles.recipeInfo}>
                              <Typography variant="body" weight="semibold">{recipe.name}</Typography>
                              <Typography variant="small" color="muted">{recipe.time}</Typography>
                            </View>
                            <Badge variant="success" size="sm">
                              {recipe.match}% match
                            </Badge>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Grocery List Info */}
                    {feature.id === 3 && feature.currentList && (
                      <View style={styles.groceryListInfo}>
                        <View style={styles.groceryStats}>
                          <View style={styles.groceryStat}>
                            <Typography variant="h4" color="accent">{feature.currentList.items}</Typography>
                            <Typography variant="small" color="muted">Items</Typography>
                          </View>
                          <View style={styles.groceryStat}>
                            <Typography variant="h4" color="accent">{feature.currentList.estimatedCost}</Typography>
                            <Typography variant="small" color="muted">Est. Cost</Typography>
                          </View>
                          <View style={styles.groceryStat}>
                            <Typography variant="h4" style={[styles.savingsText, { color: feature.color }]}>
                              {feature.currentList.savings}
                            </Typography>
                            <Typography variant="small" color="muted">Savings</Typography>
                          </View>
                        </View>
                      </View>
                    )}

                    {/* Restaurant Scans */}
                    {feature.id === 4 && feature.recentScans && (
                      <View style={styles.restaurantScans}>
                        {feature.recentScans.map((scan, index) => (
                          <View key={index} style={styles.scanItem}>
                            <View style={styles.scanInfo}>
                              <Typography variant="body" weight="semibold">{scan.restaurant}</Typography>
                              <Typography variant="small" color="muted">{scan.recommendation}</Typography>
                            </View>
                            <Badge 
                              variant={scan.score.startsWith('A') ? 'success' : 'warning'} 
                              size="sm"
                            >
                              {scan.score}
                            </Badge>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Macro Targets */}
                    {feature.id === 5 && feature.currentTargets && (
                      <View style={styles.macroTargets}>
                        {Object.entries(feature.currentTargets).map(([macro, data]: [string, any]) => (
                          <View key={macro} style={styles.macroTarget}>
                            <Typography variant="caption" weight="semibold" style={styles.macroLabel}>
                              {macro.charAt(0).toUpperCase() + macro.slice(1)}
                            </Typography>
                            <Typography variant="small" color="muted">
                              {data.current}g / {data.target}g
                            </Typography>
                            <Typography variant="small" style={[styles.macroRemaining, { color: feature.color }]}>
                              {data.remaining}g remaining
                            </Typography>
                          </View>
                        ))}
                      </View>
                    )}
                  </Card>
                );
              })}
            </View>
          </View>
        )}

        {/* Advanced Health Metrics */}
        {(content.showAll || content.showMetrics) && (
          <View style={styles.metricsContainer}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Advanced Health Metrics
            </Typography>
            
            <View style={styles.metricsGrid}>
              <Card style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Typography variant="h4">Metabolic Age</Typography>
                  <Badge variant={healthMetrics.metabolicAge.trend < 0 ? 'success' : 'warning'} size="sm">
                    {healthMetrics.metabolicAge.trend > 0 ? '+' : ''}{healthMetrics.metabolicAge.trend} years
                  </Badge>
                </View>
                <Typography variant="h1" color="accent" style={styles.metricValue}>
                  {healthMetrics.metabolicAge.current}
                </Typography>
                <Typography variant="small" color="muted">
                  vs {healthMetrics.metabolicAge.biological} biological age
                </Typography>
              </Card>

              <Card style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Typography variant="h4">VO₂ Max</Typography>
                  <Badge variant="success" size="sm">
                    {healthMetrics.vo2Max.category}
                  </Badge>
                </View>
                <Typography variant="h1" color="accent" style={styles.metricValue}>
                  {healthMetrics.vo2Max.current}
                </Typography>
                <Typography variant="small" color="muted">
                  ml/kg/min (+{healthMetrics.vo2Max.trend})
                </Typography>
              </Card>

              <Card style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Typography variant="h4">Resting HR</Typography>
                  <Badge variant="success" size="sm">
                    Optimal
                  </Badge>
                </View>
                <Typography variant="h1" color="accent" style={styles.metricValue}>
                  {healthMetrics.restingHR.current}
                </Typography>
                <Typography variant="small" color="muted">
                  bpm (range: {healthMetrics.restingHR.optimal})
                </Typography>
              </Card>

              <Card style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Typography variant="h4">HRV Score</Typography>
                  <Badge variant="success" size="sm">
                    {healthMetrics.hrv.category}
                  </Badge>
                </View>
                <Typography variant="h1" color="accent" style={styles.metricValue}>
                  {healthMetrics.hrv.current}
                </Typography>
                <Typography variant="small" color="muted">
                  ms (+{healthMetrics.hrv.trend} this week)
                </Typography>
              </Card>
            </View>
          </View>
        )}

        {/* Personalized Insights */}
        {(content.showAll || content.showInsights) && (
          <View style={styles.insightsContainer}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Personalized Insights
            </Typography>
            
            <View style={styles.insightsList}>
              {personalizedInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <Card key={index} style={styles.insightCard}>
                    <View style={styles.insightHeader}>
                      <View style={[styles.insightIcon, { backgroundColor: `${insight.color}12` }]}>
                        <Icon size={16} color={insight.color} strokeWidth={2} />
                      </View>
                      <View style={styles.insightContent}>
                        <View style={styles.insightTitleRow}>
                          <Typography variant="caption" weight="semibold" color="muted">
                            {insight.category}
                          </Typography>
                          <Badge 
                            variant={insight.impact === 'Positive' ? 'success' : 'warning'} 
                            size="sm"
                          >
                            {insight.impact}
                          </Badge>
                        </View>
                        <Typography variant="body" weight="semibold" style={styles.insightText}>
                          {insight.insight}
                        </Typography>
                        <Typography variant="small" color="muted" style={styles.insightAction}>
                          💡 {insight.action}
                        </Typography>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
        )}

        {/* Body Composition Analysis */}
        {(content.showAll || content.showComposition) && (
          <View style={styles.compositionContainer}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Body Composition Analysis
            </Typography>
            
            <Card style={styles.compositionCard}>
              <View style={styles.compositionGrid}>
                <View style={styles.compositionItem}>
                  <View style={styles.compositionCircle}>
                    <Typography variant="h2" color="accent">
                      {healthMetrics.bodyComposition.muscle}%
                    </Typography>
                  </View>
                  <Typography variant="caption" weight="semibold">Muscle Mass</Typography>
                  <Typography variant="small" color="muted">Excellent</Typography>
                </View>
                
                <View style={styles.compositionItem}>
                  <View style={styles.compositionCircle}>
                    <Typography variant="h2" color="accent">
                      {healthMetrics.bodyComposition.fat}%
                    </Typography>
                  </View>
                  <Typography variant="caption" weight="semibold">Body Fat</Typography>
                  <Typography variant="small" color="muted">Optimal</Typography>
                </View>
                
                <View style={styles.compositionItem}>
                  <View style={styles.compositionCircle}>
                    <Typography variant="h2" color="accent">
                      {healthMetrics.bodyComposition.water}%
                    </Typography>
                  </View>
                  <Typography variant="caption" weight="semibold">Water</Typography>
                  <Typography variant="small" color="muted">Good</Typography>
                </View>
              </View>
            </Card>
          </View>
        )}

        {/* Inflammation & Recovery */}
        {(content.showAll || content.showRecovery) && (
          <View style={styles.recoveryContainer}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Recovery & Inflammation
            </Typography>
            
            <Card style={styles.recoveryCard}>
              <LinearGradient
                colors={['rgba(0, 212, 170, 0.03)', 'rgba(255, 255, 255, 0.98)']}
                style={styles.recoveryGradient}
              >
                <View style={styles.recoveryHeader}>
                  <View style={styles.recoveryIconContainer}>
                    <Heart size={28} color="#00D4AA" strokeWidth={2} />
                  </View>
                  <View style={styles.recoveryInfo}>
                    <Typography variant="h4">Inflammation Score</Typography>
                    <Typography variant="h1" color="accent" style={styles.recoveryScore}>
                      {healthMetrics.inflammationScore.current}
                    </Typography>
                    <Typography variant="small" color="muted">
                      {healthMetrics.inflammationScore.category} inflammation
                    </Typography>
                  </View>
                </View>
                
                <View style={styles.recoveryInsights}>
                  <Typography variant="body" color="secondary" style={styles.recoveryText}>
                    Your inflammation levels have decreased by 0.3 points this month, indicating excellent recovery and reduced oxidative stress.
                  </Typography>
                  
                  <View style={styles.recoveryTips}>
                    <Typography variant="caption" weight="semibold" style={styles.recoveryTipsTitle}>
                      Recovery Optimization Tips
                    </Typography>
                    <View style={styles.recoveryTipsList}>
                      <Typography variant="small" color="muted">• Continue anti-inflammatory diet</Typography>
                      <Typography variant="small" color="muted">• Maintain 7-8 hours sleep</Typography>
                      <Typography variant="small" color="muted">• Add omega-3 supplements</Typography>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* Enhanced Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowDetailModal(false)}
            >
              <X size={20} color="#64748B" strokeWidth={2} />
            </TouchableOpacity>
            <Typography variant="h3" style={styles.modalTitle}>
              AI Prediction Details
            </Typography>
            <View style={styles.modalPlaceholder} />
          </View>

          {selectedPrediction && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {/* Prediction Header */}
              <View style={styles.modalPredictionHeader}>
                <View style={[styles.modalPredictionIcon, { backgroundColor: `${selectedPrediction.color}15` }]}>
                  <selectedPrediction.icon size={32} color={selectedPrediction.color} strokeWidth={2} />
                </View>
                <View style={styles.modalPredictionInfo}>
                  <Typography variant="h2" style={styles.modalPredictionTitle}>
                    {selectedPrediction.title}
                  </Typography>
                  <Typography variant="body" color="secondary" style={styles.modalPredictionText}>
                    {selectedPrediction.prediction}
                  </Typography>
                </View>
              </View>

              {/* Confidence & Impact */}
              <View style={styles.modalMetricsContainer}>
                <Card style={styles.modalMetricCard}>
                  <Typography variant="caption" color="muted">Confidence Level</Typography>
                  <Typography variant="h1" style={[styles.modalMetricValue, { color: getConfidenceColor(selectedPrediction.confidence) }]}>
                    {selectedPrediction.confidence}%
                  </Typography>
                  <Typography variant="small" color="muted">AI Accuracy</Typography>
                </Card>
                
                <Card style={styles.modalMetricCard}>
                  <Typography variant="caption" color="muted">Impact Level</Typography>
                  <Typography variant="h1" color="accent" style={styles.modalMetricValue}>
                    {selectedPrediction.impact}
                  </Typography>
                  <Typography variant="small" color="muted">Expected Outcome</Typography>
                </Card>
              </View>

              {/* Detailed Analysis */}
              <Card style={styles.modalAnalysisCard}>
                <Typography variant="h4" style={styles.modalSectionTitle}>
                  Detailed Analysis
                </Typography>
                <Typography variant="body" color="secondary" style={styles.modalAnalysisText}>
                  {selectedPrediction.details}
                </Typography>
              </Card>

              {/* AI Recommendations */}
              <Card style={styles.modalRecommendationsCard}>
                <Typography variant="h4" style={styles.modalSectionTitle}>
                  AI Recommendations
                </Typography>
                <View style={styles.modalRecommendationsList}>
                  {selectedPrediction.recommendations.map((rec: string, index: number) => (
                    <View key={index} style={styles.modalRecommendationItem}>
                      <View style={[styles.modalRecommendationBullet, { backgroundColor: selectedPrediction.color }]} />
                      <Typography variant="body" style={styles.modalRecommendationText}>
                        {rec}
                      </Typography>
                    </View>
                  ))}
                </View>
              </Card>

              {/* Timeline & Next Steps */}
              <Card style={styles.modalTimelineCard}>
                <Typography variant="h4" style={styles.modalSectionTitle}>
                  Timeline & Next Steps
                </Typography>
                <View style={styles.modalTimelineContent}>
                  <View style={styles.modalTimelineItem}>
                    <Calendar size={18} color="#00D4AA" strokeWidth={2} />
                    <Typography variant="body" color="secondary">
                      Expected timeline: {selectedPrediction.timeline}
                    </Typography>
                  </View>
                  <View style={styles.modalTimelineItem}>
                    <Clock size={18} color="#4ECDC4" strokeWidth={2} />
                    <Typography variant="body" color="secondary">
                      Review progress weekly for optimal results
                    </Typography>
                  </View>
                </View>
              </Card>

              {/* Action Button */}
              <View style={styles.modalActionContainer}>
                <Button
                  variant="primary"
                  onPress={() => setShowDetailModal(false)}
                  style={styles.modalActionButton}
                >
                  <Typography variant="body" style={styles.modalActionText}>
                    Got it, thanks!
                  </Typography>
                </Button>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
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
    gap: 14,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 116, 139, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    gap: 2,
  },
  scrollView: {
    flex: 1,
  },
  timeframeContainer: {
    paddingVertical: 14,
  },
  timeframeScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  timeframeButtonActive: {
    backgroundColor: '#00D4AA',
  },

  // Category Filter
  categoryContainer: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#4ECDC4',
  },

  // Predictions Section
  predictionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    marginBottom: 14,
  },
  predictionsList: {
    gap: 12,
  },
  predictionCard: {
    padding: 16,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  predictionIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  predictionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  predictionInfo: {
    flex: 1,
    gap: 3,
  },
  predictionText: {
    lineHeight: 18,
  },
  predictionMetrics: {
    alignItems: 'flex-end',
    gap: 4,
  },
  confidenceContainer: {
    alignItems: 'flex-end',
    gap: 1,
  },
  confidenceText: {
    fontSize: 14,
  },
  trendEmoji: {
    fontSize: 16,
  },
  predictionDetails: {
    lineHeight: 18,
    marginBottom: 12,
  },
  predictionFooter: {
    flexDirection: 'row',
    gap: 6,
  },

  // Gamification Section
  gamificationContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  gamificationList: {
    gap: 16,
  },
  gamificationCard: {
    padding: 16,
  },
  gamificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  gamificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gamificationInfo: {
    flex: 1,
    gap: 3,
  },
  gamificationDescription: {
    lineHeight: 18,
  },

  // XP System
  xpSystemDetails: {
    gap: 12,
  },
  levelProgress: {
    gap: 8,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpProgressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  xpActivities: {
    gap: 6,
  },
  xpActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  xpValue: {
    fontWeight: '600',
  },

  // Streaks
  streakDetails: {
    gap: 10,
  },
  streakItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  streakInfo: {
    flex: 1,
  },
  streakCurrent: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: '700',
  },

  // Challenges
  challengesDetails: {
    gap: 12,
  },
  challengeItem: {
    gap: 6,
  },
  challengeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeProgress: {
    gap: 4,
  },
  challengeProgressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  challengeProgressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Rewards
  rewardsDetails: {
    gap: 8,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardStatus: {
    alignItems: 'flex-end',
    gap: 2,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '600',
  },

  // Celebrations
  celebrationsDetails: {
    gap: 8,
  },
  celebrationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  celebrationInfo: {
    flex: 1,
  },

  // Food Features Section
  foodFeaturesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  foodFeaturesList: {
    gap: 16,
  },
  foodFeatureCard: {
    padding: 16,
  },
  foodFeatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  foodFeatureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodFeatureInfo: {
    flex: 1,
    gap: 3,
  },
  foodFeatureDescription: {
    lineHeight: 18,
  },
  foodFeatureContent: {
    gap: 8,
    marginBottom: 12,
  },
  foodFeatureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  foodFeatureBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  foodFeatureText: {
    flex: 1,
    lineHeight: 20,
  },

  // Meal Planning Stats
  mealPlanningStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },

  // Recipe Recommendations
  recipeRecommendations: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  recipeInfo: {
    flex: 1,
  },

  // Grocery List
  groceryListInfo: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  groceryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  groceryStat: {
    alignItems: 'center',
    gap: 2,
  },
  savingsText: {
    fontWeight: '700',
  },

  // Restaurant Scans
  restaurantScans: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  scanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  scanInfo: {
    flex: 1,
  },

  // Macro Targets
  macroTargets: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  macroTarget: {
    alignItems: 'center',
    gap: 2,
  },
  macroLabel: {
    textTransform: 'capitalize',
  },
  macroRemaining: {
    fontWeight: '600',
  },

  // Metrics Section
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    width: (width - 50) / 2,
    padding: 14,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  metricValue: {
    marginBottom: 3,
  },

  // Insights Section
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  insightsList: {
    gap: 10,
  },
  insightCard: {
    padding: 14,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  insightIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
    gap: 3,
  },
  insightTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightText: {
    lineHeight: 18,
  },
  insightAction: {
    lineHeight: 14,
  },

  // Body Composition
  compositionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  compositionCard: {
    padding: 18,
  },
  compositionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  compositionItem: {
    alignItems: 'center',
    gap: 6,
  },
  compositionCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 212, 170, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },

  // Recovery Section
  recoveryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  recoveryCard: {
    overflow: 'hidden',
  },
  recoveryGradient: {
    padding: 18,
  },
  recoveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  recoveryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 212, 170, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveryInfo: {
    flex: 1,
    gap: 3,
  },
  recoveryScore: {
    marginVertical: 3,
  },
  recoveryInsights: {
    gap: 14,
  },
  recoveryText: {
    lineHeight: 20,
  },
  recoveryTips: {
    gap: 6,
  },
  recoveryTipsTitle: {
    marginBottom: 3,
  },
  recoveryTipsList: {
    gap: 3,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 116, 139, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
  },
  modalPlaceholder: {
    width: 32,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalPredictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  modalPredictionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPredictionInfo: {
    flex: 1,
    gap: 6,
  },
  modalPredictionTitle: {
    lineHeight: 26,
  },
  modalPredictionText: {
    lineHeight: 20,
  },
  modalMetricsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  modalMetricCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  modalMetricValue: {
    marginVertical: 6,
  },
  modalAnalysisCard: {
    padding: 18,
    marginBottom: 16,
  },
  modalSectionTitle: {
    marginBottom: 10,
  },
  modalAnalysisText: {
    lineHeight: 22,
  },
  modalRecommendationsCard: {
    padding: 18,
    marginBottom: 16,
  },
  modalRecommendationsList: {
    gap: 10,
  },
  modalRecommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  modalRecommendationBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 8,
  },
  modalRecommendationText: {
    flex: 1,
    lineHeight: 20,
  },
  modalTimelineCard: {
    padding: 18,
    marginBottom: 24,
  },
  modalTimelineContent: {
    gap: 10,
  },
  modalTimelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalActionContainer: {
    paddingBottom: 20,
  },
  modalActionButton: {
    width: '100%',
  },
  modalActionText: {
    color: 'white',
  },
});