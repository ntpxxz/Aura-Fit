import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Calendar, Filter, Search, ChevronDown, Utensils, TrendingUp, ChartBar as BarChart3, Clock, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';

const { width } = Dimensions.get('window');

export default function FoodHistoryScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [selectedMeal, setSelectedMeal] = useState('All Meals');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const periods = ['Today', 'This Week', 'Last Week', 'This Month', 'Last Month'];
  const mealTypes = ['All Meals', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  // Comprehensive food history data
  const foodHistory = [
    {
      date: '2025-01-20',
      dayName: 'Today',
      totalCalories: 1850,
      targetCalories: 2200,
      meals: [
        {
          type: 'Breakfast',
          time: '8:30 AM',
          foods: [
            { name: 'Greek Yogurt', calories: 130, icon: '🥛', grade: 'A+' },
            { name: 'Blueberries', calories: 85, icon: '🫐', grade: 'A+' },
            { name: 'Granola', calories: 150, icon: '🥣', grade: 'B+' },
          ],
          totalCalories: 365,
        },
        {
          type: 'Lunch',
          time: '12:45 PM',
          foods: [
            { name: 'Grilled Chicken', calories: 280, icon: '🍗', grade: 'A+' },
            { name: 'Quinoa Salad', calories: 220, icon: '🥗', grade: 'A' },
            { name: 'Avocado', calories: 160, icon: '🥑', grade: 'A+' },
          ],
          totalCalories: 660,
        },
        {
          type: 'Snack',
          time: '3:30 PM',
          foods: [
            { name: 'Apple', calories: 95, icon: '🍎', grade: 'A+' },
            { name: 'Almonds', calories: 160, icon: '🥜', grade: 'A' },
          ],
          totalCalories: 255,
        },
        {
          type: 'Dinner',
          time: '7:15 PM',
          foods: [
            { name: 'Salmon', calories: 350, icon: '🐟', grade: 'A+' },
            { name: 'Sweet Potato', calories: 120, icon: '🍠', grade: 'A' },
            { name: 'Broccoli', calories: 55, icon: '🥦', grade: 'A+' },
          ],
          totalCalories: 525,
        },
      ],
      macros: { protein: 125, carbs: 180, fat: 65 },
      waterIntake: 6,
      avgGrade: 'A',
    },
    {
      date: '2025-01-19',
      dayName: 'Yesterday',
      totalCalories: 2050,
      targetCalories: 2200,
      meals: [
        {
          type: 'Breakfast',
          time: '8:00 AM',
          foods: [
            { name: 'Oatmeal', calories: 150, icon: '🥣', grade: 'A' },
            { name: 'Banana', calories: 105, icon: '🍌', grade: 'A+' },
            { name: 'Honey', calories: 64, icon: '🍯', grade: 'B' },
          ],
          totalCalories: 319,
        },
        {
          type: 'Lunch',
          time: '1:00 PM',
          foods: [
            { name: 'Turkey Sandwich', calories: 420, icon: '🥪', grade: 'B+' },
            { name: 'Mixed Greens', calories: 25, icon: '🥬', grade: 'A+' },
            { name: 'Cherry Tomatoes', calories: 30, icon: '🍅', grade: 'A+' },
          ],
          totalCalories: 475,
        },
        {
          type: 'Snack',
          time: '4:00 PM',
          foods: [
            { name: 'Protein Bar', calories: 240, icon: '🍫', grade: 'B' },
            { name: 'Green Tea', calories: 2, icon: '🍵', grade: 'A+' },
          ],
          totalCalories: 242,
        },
        {
          type: 'Dinner',
          time: '7:30 PM',
          foods: [
            { name: 'Beef Stir Fry', calories: 380, icon: '🥘', grade: 'A' },
            { name: 'Brown Rice', calories: 220, icon: '🍚', grade: 'A' },
            { name: 'Mixed Vegetables', calories: 80, icon: '🥕', grade: 'A+' },
          ],
          totalCalories: 680,
        },
        {
          type: 'Snack',
          time: '9:00 PM',
          foods: [
            { name: 'Dark Chocolate', calories: 155, icon: '🍫', grade: 'B+' },
            { name: 'Herbal Tea', calories: 0, icon: '🍵', grade: 'A+' },
          ],
          totalCalories: 155,
        },
      ],
      macros: { protein: 140, carbs: 195, fat: 78 },
      waterIntake: 8,
      avgGrade: 'A-',
    },
    {
      date: '2025-01-18',
      dayName: 'Friday',
      totalCalories: 1920,
      targetCalories: 2200,
      meals: [
        {
          type: 'Breakfast',
          time: '7:45 AM',
          foods: [
            { name: 'Smoothie Bowl', calories: 280, icon: '🥤', grade: 'A' },
            { name: 'Chia Seeds', calories: 60, icon: '🌱', grade: 'A+' },
            { name: 'Coconut Flakes', calories: 35, icon: '🥥', grade: 'B+' },
          ],
          totalCalories: 375,
        },
        {
          type: 'Lunch',
          time: '12:30 PM',
          foods: [
            { name: 'Caesar Salad', calories: 320, icon: '🥗', grade: 'B' },
            { name: 'Grilled Chicken', calories: 200, icon: '🍗', grade: 'A+' },
            { name: 'Parmesan', calories: 110, icon: '🧀', grade: 'B' },
          ],
          totalCalories: 630,
        },
        {
          type: 'Snack',
          time: '3:45 PM',
          foods: [
            { name: 'Trail Mix', calories: 180, icon: '🥜', grade: 'B+' },
            { name: 'Sparkling Water', calories: 0, icon: '💧', grade: 'A+' },
          ],
          totalCalories: 180,
        },
        {
          type: 'Dinner',
          time: '8:00 PM',
          foods: [
            { name: 'Pasta Primavera', calories: 450, icon: '🍝', grade: 'B+' },
            { name: 'Side Salad', calories: 85, icon: '🥗', grade: 'A+' },
            { name: 'Olive Oil Dressing', calories: 120, icon: '🫒', grade: 'A' },
          ],
          totalCalories: 655,
        },
      ],
      macros: { protein: 98, carbs: 210, fat: 72 },
      waterIntake: 7,
      avgGrade: 'B+',
    },
    {
      date: '2025-01-17',
      dayName: 'Thursday',
      totalCalories: 2180,
      targetCalories: 2200,
      meals: [
        {
          type: 'Breakfast',
          time: '8:15 AM',
          foods: [
            { name: 'Avocado Toast', calories: 320, icon: '🥑', grade: 'A' },
            { name: 'Poached Egg', calories: 70, icon: '🥚', grade: 'A+' },
            { name: 'Orange Juice', calories: 110, icon: '🍊', grade: 'B' },
          ],
          totalCalories: 500,
        },
        {
          type: 'Lunch',
          time: '1:15 PM',
          foods: [
            { name: 'Sushi Roll', calories: 350, icon: '🍣', grade: 'A' },
            { name: 'Miso Soup', calories: 35, icon: '🍲', grade: 'A+' },
            { name: 'Edamame', calories: 95, icon: '🫛', grade: 'A+' },
          ],
          totalCalories: 480,
        },
        {
          type: 'Snack',
          time: '4:30 PM',
          foods: [
            { name: 'Greek Yogurt', calories: 100, icon: '🥛', grade: 'A+' },
            { name: 'Berries', calories: 60, icon: '🫐', grade: 'A+' },
          ],
          totalCalories: 160,
        },
        {
          type: 'Dinner',
          time: '7:45 PM',
          foods: [
            { name: 'Grilled Steak', calories: 400, icon: '🥩', grade: 'A' },
            { name: 'Roasted Vegetables', calories: 120, icon: '🥕', grade: 'A+' },
            { name: 'Quinoa', calories: 180, icon: '🌾', grade: 'A' },
          ],
          totalCalories: 700,
        },
        {
          type: 'Snack',
          time: '9:30 PM',
          foods: [
            { name: 'Cottage Cheese', calories: 120, icon: '🥛', grade: 'A+' },
            { name: 'Walnuts', calories: 185, icon: '🥜', grade: 'A' },
          ],
          totalCalories: 305,
        },
      ],
      macros: { protein: 155, carbs: 165, fat: 85 },
      waterIntake: 9,
      avgGrade: 'A',
    },
  ];

  const getCalorieStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return { status: 'On Track', color: '#00D4AA', variant: 'success' as const };
    if (percentage < 90) return { status: 'Under Target', color: '#F59E0B', variant: 'warning' as const };
    return { status: 'Over Target', color: '#EF4444', variant: 'error' as const };
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return '#00D4AA';
      case 'A-':
        return '#4ECDC4';
      case 'B+':
      case 'B':
        return '#FFE66D';
      case 'B-':
        return '#F59E0B';
      default:
        return '#FF6B6B';
    }
  };

  const filteredHistory = foodHistory.filter(day => {
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const hasMatchingFood = day.meals.some(meal =>
        meal.foods.some(food => food.name.toLowerCase().includes(searchLower))
      );
      if (!hasMatchingFood) return false;
    }

    // Filter by meal type
    if (selectedMeal !== 'All Meals') {
      const hasMealType = day.meals.some(meal => meal.type === selectedMeal);
      if (!hasMealType) return false;
    }

    return true;
  });

  const weeklyStats = {
    avgCalories: Math.round(foodHistory.reduce((sum, day) => sum + day.totalCalories, 0) / foodHistory.length),
    avgWater: Math.round(foodHistory.reduce((sum, day) => sum + day.waterIntake, 0) / foodHistory.length),
    totalMeals: foodHistory.reduce((sum, day) => sum + day.meals.length, 0),
    avgGrade: 'A-',
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
          <Typography variant="h2">Food History</Typography>
          <Typography variant="body" color="muted">
            Complete nutrition log and insights
          </Typography>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Search and Filters */}
        <View style={styles.filtersContainer}>
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search foods..."
            style={styles.searchInput}
            containerStyle={styles.searchContainer}
          />
          
          <TouchableOpacity 
            style={styles.filterToggle}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="#64748B" strokeWidth={2} />
            <Typography variant="caption" color="muted">Filters</Typography>
            <ChevronDown 
              size={16} 
              color="#64748B" 
              strokeWidth={2}
              style={[styles.chevron, showFilters && styles.chevronRotated]}
            />
          </TouchableOpacity>
        </View>

        {/* Filter Options */}
        {showFilters && (
          <View style={styles.filterOptions}>
            <Card style={styles.filterCard}>
              <View style={styles.filterSection}>
                <Typography variant="h4" style={styles.filterTitle}>Time Period</Typography>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                  {periods.map((period) => (
                    <TouchableOpacity
                      key={period}
                      style={[
                        styles.filterChip,
                        selectedPeriod === period && styles.filterChipActive,
                      ]}
                      onPress={() => setSelectedPeriod(period)}
                    >
                      <Typography
                        variant="caption"
                        color={selectedPeriod === period ? 'primary' : 'muted'}
                        weight="semibold"
                      >
                        {period}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Typography variant="h4" style={styles.filterTitle}>Meal Type</Typography>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                  {mealTypes.map((meal) => (
                    <TouchableOpacity
                      key={meal}
                      style={[
                        styles.filterChip,
                        selectedMeal === meal && styles.filterChipActive,
                      ]}
                      onPress={() => setSelectedMeal(meal)}
                    >
                      <Typography
                        variant="caption"
                        color={selectedMeal === meal ? 'primary' : 'muted'}
                        weight="semibold"
                      >
                        {meal}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Card>
          </View>
        )}

        {/* Weekly Summary Stats */}
        <View style={styles.summaryContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>Weekly Summary</Typography>
          <View style={styles.summaryGrid}>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <BarChart3 size={24} color="#00D4AA" strokeWidth={2} />
                <Typography variant="h3" color="accent">{weeklyStats.avgCalories}</Typography>
                <Typography variant="small" color="muted">Avg Calories</Typography>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Utensils size={24} color="#4ECDC4" strokeWidth={2} />
                <Typography variant="h3" color="accent">{weeklyStats.totalMeals}</Typography>
                <Typography variant="small" color="muted">Total Meals</Typography>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <Star size={24} color="#FFE66D" strokeWidth={2} />
                <Typography variant="h3" color="accent">{weeklyStats.avgGrade}</Typography>
                <Typography variant="small" color="muted">Avg Grade</Typography>
              </View>
            </Card>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryContent}>
                <TrendingUp size={24} color="#A8E6CF" strokeWidth={2} />
                <Typography variant="h3" color="accent">{weeklyStats.avgWater}</Typography>
                <Typography variant="small" color="muted">Avg Water</Typography>
              </View>
            </Card>
          </View>
        </View>

        {/* Food History List */}
        <View style={styles.historyContainer}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Food Log History ({filteredHistory.length} days)
          </Typography>
          
          <View style={styles.historyList}>
            {filteredHistory.map((day, dayIndex) => {
              const calorieStatus = getCalorieStatus(day.totalCalories, day.targetCalories);
              
              return (
                <Card key={day.date} style={styles.dayCard}>
                  {/* Day Header */}
                  <View style={styles.dayHeader}>
                    <View style={styles.dayInfo}>
                      <Typography variant="h4" weight="bold">{day.dayName}</Typography>
                      <Typography variant="caption" color="muted">{day.date}</Typography>
                    </View>
                    <View style={styles.dayStats}>
                      <View style={styles.caloriesSummary}>
                        <Typography variant="body" weight="semibold">
                          {day.totalCalories} / {day.targetCalories} cal
                        </Typography>
                        <Badge variant={calorieStatus.variant} size="sm">
                          {calorieStatus.status}
                        </Badge>
                      </View>
                      <View style={styles.gradeContainer}>
                        <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(day.avgGrade) }]}>
                          <Typography variant="caption" style={styles.gradeText}>
                            {day.avgGrade}
                          </Typography>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Calorie Progress */}
                  <View style={styles.calorieProgress}>
                    <View style={styles.progressTrack}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${Math.min((day.totalCalories / day.targetCalories) * 100, 100)}%`,
                            backgroundColor: calorieStatus.color 
                          }
                        ]} 
                      />
                    </View>
                  </View>

                  {/* Meals List */}
                  <View style={styles.mealsContainer}>
                    {day.meals.map((meal, mealIndex) => (
                      <View key={mealIndex} style={styles.mealRow}>
                        <View style={styles.mealHeader}>
                          <View style={styles.mealInfo}>
                            <View style={styles.mealTypeRow}>
                              <Utensils size={14} color="#64748B" strokeWidth={2} />
                              <Typography variant="body" weight="semibold">{meal.type}</Typography>
                            </View>
                            <View style={styles.mealTimeRow}>
                              <Clock size={12} color="#94A3B8" strokeWidth={2} />
                              <Typography variant="small" color="muted">{meal.time}</Typography>
                            </View>
                          </View>
                          <Typography variant="caption" weight="bold" color="accent">
                            {meal.totalCalories} cal
                          </Typography>
                        </View>

                        {/* Food Items */}
                        <View style={styles.foodItems}>
                          {meal.foods.map((food, foodIndex) => (
                            <View key={foodIndex} style={styles.foodItem}>
                              <View style={styles.foodLeft}>
                                <Typography variant="body" style={styles.foodIcon}>
                                  {food.icon}
                                </Typography>
                                <Typography variant="body" style={styles.foodName}>
                                  {food.name}
                                </Typography>
                              </View>
                              <View style={styles.foodRight}>
                                <Typography variant="small" color="muted">
                                  {food.calories} cal
                                </Typography>
                                <View style={[styles.foodGrade, { backgroundColor: getGradeColor(food.grade) }]}>
                                  <Typography variant="small" style={styles.foodGradeText}>
                                    {food.grade}
                                  </Typography>
                                </View>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Day Summary */}
                  <View style={styles.daySummary}>
                    <View style={styles.summaryRow}>
                      <Typography variant="small" color="muted">Macros:</Typography>
                      <Typography variant="small" weight="semibold">
                        P: {day.macros.protein}g • C: {day.macros.carbs}g • F: {day.macros.fat}g
                      </Typography>
                    </View>
                    <View style={styles.summaryRow}>
                      <Typography variant="small" color="muted">Water:</Typography>
                      <Typography variant="small" weight="semibold">
                        {day.waterIntake} glasses
                      </Typography>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>

        {/* Load More */}
        <View style={styles.loadMoreContainer}>
          <Button variant="outline" onPress={() => {}}>
            <Typography variant="body">Load More Days</Typography>
          </Button>
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
  scrollView: {
    flex: 1,
  },

  // Filters
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
    alignItems: 'flex-end',
  },
  searchContainer: {
    flex: 1,
    marginBottom: 0,
  },
  searchInput: {
    backgroundColor: 'white',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 48,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  filterOptions: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  filterCard: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    marginBottom: 8,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },

  // Summary Stats
  summaryContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 24,
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
    alignItems: 'center',
    gap: 8,
  },

  // History List
  historyContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  historyList: {
    gap: 16,
  },
  dayCard: {
    padding: 20,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dayInfo: {
    flex: 1,
  },
  dayStats: {
    alignItems: 'flex-end',
    gap: 8,
  },
  caloriesSummary: {
    alignItems: 'flex-end',
    gap: 4,
  },
  gradeContainer: {
    alignItems: 'flex-end',
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeText: {
    color: 'white',
    fontWeight: '700',
  },
  calorieProgress: {
    marginBottom: 20,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Meals
  mealsContainer: {
    gap: 16,
    marginBottom: 20,
  },
  mealRow: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealInfo: {
    flex: 1,
    gap: 4,
  },
  mealTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mealTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foodItems: {
    gap: 8,
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
    gap: 8,
    flex: 1,
  },
  foodIcon: {
    fontSize: 16,
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

  // Day Summary
  daySummary: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Load More
  loadMoreContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
});