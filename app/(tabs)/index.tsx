import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Activity, Moon, Plus, Droplets, Flame, Zap, Target, TrendingUp, ChevronLeft, ChevronRight, Utensils, Coffee, Apple, Dumbbell, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { Avatar } from '../../components/Avatar';
import { ProgressRing } from '../../components/ProgressRing';
import { CameraScanner } from '../../components/CameraScanner';
import { NutritionSheet } from '../../components/NutritionSheet';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentVitalIndex, setCurrentVitalIndex] = useState(0);
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [showNutritionSheet, setShowNutritionSheet] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);
  const [waterGlasses, setWaterGlasses] = useState(6);
  
  const healthScore = 78;
  
  // Enhanced vitals with consistent colors
  const vitals = [
    { icon: Heart, label: 'Heart Rate', value: '72 BPM', color: '#FF6B6B', trend: '+2%' },
    { icon: Activity, label: 'Steps', value: '8,547', color: '#4ECDC4', trend: '+15%' },
    { icon: Moon, label: 'Sleep', value: '7h 23m', color: '#A8E6CF', trend: '+8%' },
    { icon: Flame, label: 'Calories Burned', value: '1,280', color: '#FFE66D', trend: '+12%' },
    { icon: Zap, label: 'Active Minutes', value: '45 min', color: '#FF8E8E', trend: '+20%' },
    { icon: Target, label: 'Workout Score', value: '85/100', color: '#B8A9FF', trend: '+5%' },
  ];

  // Today's quest
  const todaysQuest = {
    type: 'calories',
    current: 1850,
    target: 2200,
    goalTarget: 2000,
    label: 'Calories Remaining',
    goalName: 'Lean Bulk Goal',
  };

  const todaysMeals = [
    {
      meal: 'Breakfast',
      time: '8:30 AM',
      items: [
        { name: 'Greek Yogurt', calories: 130, icon: '🥛' },
        { name: 'Blueberries', calories: 85, icon: '🫐' },
        { name: 'Granola', calories: 150, icon: '🥣' },
      ],
      totalCalories: 365,
      color: '#FFE66D',
    },
    {
      meal: 'Lunch',
      time: '12:45 PM',
      items: [
        { name: 'Grilled Chicken', calories: 280, icon: '🍗' },
        { name: 'Quinoa Salad', calories: 220, icon: '🥗' },
        { name: 'Avocado', calories: 160, icon: '🥑' },
      ],
      totalCalories: 660,
      color: '#00D4AA',
    },
    {
      meal: 'Snack',
      time: '3:30 PM',
      items: [
        { name: 'Apple', calories: 95, icon: '🍎' },
        { name: 'Almonds', calories: 160, icon: '🥜' },
      ],
      totalCalories: 255,
      color: '#4ECDC4',
    },
  ];

  const macroBreakdown = {
    protein: { current: 125, target: 150, color: '#FF6B6B' },
    carbs: { current: 180, target: 220, color: '#FFE66D' },
    fat: { current: 65, target: 75, color: '#A8E6CF' },
  };

  const waterIntake = {
    current: waterGlasses,
    target: 8,
    glasses: Array(8).fill(false).map((_, i) => i < waterGlasses),
  };

  // Quick action items
  const quickActions = [
    {
      id: 'scan-food',
      title: 'Scan Food',
      subtitle: 'AI-powered recognition',
      icon: Utensils,
      color: '#00D4AA',
      gradientColors: ['#00D4AA', '#4ECDC4'],
      action: () => setShowCameraScanner(true),
    },
    {
      id: 'add-water',
      title: 'Add Water',
      subtitle: `${waterGlasses}/8 glasses`,
      icon: Droplets,
      color: '#4ECDC4',
      gradientColors: ['#4ECDC4', '#A8E6CF'],
      action: () => handleAddWater(),
    },
    {
      id: 'quick-workout',
      title: 'Quick Workout',
      subtitle: '5-15 min sessions',
      icon: Dumbbell,
      color: '#FF6B6B',
      gradientColors: ['#FF6B6B', '#FF8E8E'],
      action: () => handleQuickWorkout(),
    },
    {
      id: 'quick-add',
      title: 'Quick Add',
      subtitle: 'Common foods',
      icon: Plus,
      color: '#FFE66D',
      gradientColors: ['#FFE66D', '#FFF2A8'],
      action: () => setShowQuickAddModal(true),
    },
  ];

  // Quick add food items
  const quickAddItems = [
    { name: 'Water Glass', icon: '💧', calories: 0, action: () => handleAddWater() },
    { name: 'Coffee', icon: '☕', calories: 5, action: () => handleQuickAdd('Coffee', 5) },
    { name: 'Green Tea', icon: '🍵', calories: 2, action: () => handleQuickAdd('Green Tea', 2) },
    { name: 'Apple', icon: '🍎', calories: 95, action: () => handleQuickAdd('Apple', 95) },
    { name: 'Banana', icon: '🍌', calories: 105, action: () => handleQuickAdd('Banana', 105) },
    { name: 'Almonds (10)', icon: '🥜', calories: 70, action: () => handleQuickAdd('Almonds', 70) },
    { name: 'Greek Yogurt', icon: '🥛', calories: 130, action: () => handleQuickAdd('Greek Yogurt', 130) },
    { name: 'Protein Shake', icon: '🥤', calories: 150, action: () => handleQuickAdd('Protein Shake', 150) },
  ];

  const renderVitalCard = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.vitalCard, { width: width * 0.28 }]}>
      <View style={styles.vitalGradient}>
        <item.icon size={24} color={item.color} strokeWidth={2} />
        <Text style={styles.vitalValue}>{item.value}</Text>
        <Text style={styles.vitalLabel}>{item.label}</Text>
        <View style={styles.trendContainer}>
          <TrendingUp size={12} color={item.color} strokeWidth={2} />
          <Text style={[styles.trendText, { color: item.color }]}>{item.trend}</Text>
        </View>
      </View>
    </View>
  );

  const scrollToVital = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' 
      ? Math.max(0, currentVitalIndex - 1)
      : Math.min(vitals.length - 3, currentVitalIndex + 1);
    setCurrentVitalIndex(newIndex);
  };

  const handleAddWater = () => {
    if (waterGlasses < 8) {
      setWaterGlasses(prev => prev + 1);
    }
    setShowQuickAddModal(false);
  };

  const handleQuickAdd = (foodName: string, calories: number) => {
    // Simulate adding food to log
    console.log(`Added ${foodName} (${calories} cal) to food log`);
    setShowQuickAddModal(false);
    
    // Show success feedback
    // You could add a toast notification here
  };

  const handleQuickWorkout = () => {
    // Navigate to workout selection or start a quick workout
    console.log('Starting quick workout');
  };

  const handleScanComplete = (foodData: any) => {
    setSelectedFood(foodData);
    setShowCameraScanner(false);
    setShowNutritionSheet(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Health Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Avatar size={120} healthScore={healthScore} />
          </View>
          <Text style={styles.healthScore}>Health Score: {healthScore}</Text>
          <Text style={styles.healthStatus}>Excellent Progress!</Text>
        </View>

        {/* Enhanced Live Vitals HUD */}
        <View style={styles.vitalsContainer}>
          <View style={styles.vitalsHeader}>
            <Text style={styles.sectionTitle}>Live Vitals</Text>
            <View style={styles.vitalsNavigation}>
              <TouchableOpacity 
                style={[styles.navButton, currentVitalIndex === 0 && styles.navButtonDisabled]}
                onPress={() => scrollToVital('left')}
                disabled={currentVitalIndex === 0}
              >
                <ChevronLeft size={20} color={currentVitalIndex === 0 ? '#C7C7CC' : '#00D4AA'} strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, currentVitalIndex >= vitals.length - 3 && styles.navButtonDisabled]}
                onPress={() => scrollToVital('right')}
                disabled={currentVitalIndex >= vitals.length - 3}
              >
                <ChevronRight size={20} color={currentVitalIndex >= vitals.length - 3 ? '#C7C7CC' : '#00D4AA'} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={vitals.slice(currentVitalIndex, currentVitalIndex + 3)}
            renderItem={renderVitalCard}
            keyExtractor={(item, index) => `${currentVitalIndex}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vitalsGrid}
            scrollEnabled={false}
          />
        </View>

        {/* Enhanced Today's Quest */}
        <View style={styles.questContainer}>
          <Text style={styles.sectionTitle}>Today's Quest</Text>
          <LinearGradient
            colors={['#00D4AA', '#4ECDC4']}
            style={styles.questCard}
          >
            <View style={styles.questContent}>
              <View style={styles.questInfo}>
                <Text style={styles.questLabel}>{todaysQuest.label}</Text>
                <Text style={styles.questValue}>
                  {todaysQuest.target - todaysQuest.current} cal
                </Text>
                <View style={styles.questGoalRef}>
                  <Target size={14} color="rgba(255, 255, 255, 0.8)" strokeWidth={2} />
                  <Text style={styles.questGoalText}>
                    Goal: {todaysQuest.goalTarget} cal ({todaysQuest.goalName})
                  </Text>
                </View>
              </View>
              <View style={styles.questRings}>
                <ProgressRing
                  progress={todaysQuest.current / todaysQuest.target}
                  size={80}
                  strokeWidth={8}
                  color="#FFFFFF"
                />
                <View style={styles.questProgress}>
                  <Text style={styles.questProgressText}>
                    {Math.round((todaysQuest.current / todaysQuest.target) * 100)}%
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Today's Consumption Report */}
        <View style={styles.consumptionContainer}>
          <Text style={styles.sectionTitle}>Today's Consumption</Text>
          
          {/* Macro Breakdown */}
          <View style={styles.macroContainer}>
            <Text style={styles.subsectionTitle}>Macronutrients</Text>
            <View style={styles.macroGrid}>
              {Object.entries(macroBreakdown).map(([macro, data]) => (
                <View key={macro} style={styles.macroCard}>
                  <View style={styles.macroGradient}>
                    <Text style={styles.macroName}>
                      {macro.charAt(0).toUpperCase() + macro.slice(1)}
                    </Text>
                    <Text style={styles.macroValue}>
                      {data.current}g / {data.target}g
                    </Text>
                    <View style={styles.macroProgress}>
                      <View style={styles.macroProgressBg}>
                        <View 
                          style={[
                            styles.macroProgressFill, 
                            { 
                              width: `${Math.min((data.current / data.target) * 100, 100)}%`,
                              backgroundColor: data.color 
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Water Intake */}
          <View style={styles.waterContainer}>
            <Text style={styles.subsectionTitle}>Water Intake</Text>
            <View style={styles.waterCard}>
              <View style={styles.waterHeader}>
                <Droplets size={24} color="#4ECDC4" strokeWidth={2} />
                <Text style={styles.waterText}>
                  {waterIntake.current} / {waterIntake.target} glasses
                </Text>
              </View>
              <View style={styles.waterGlasses}>
                {waterIntake.glasses.map((filled, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.waterGlass, 
                      { backgroundColor: filled ? '#4ECDC4' : 'rgba(76, 205, 196, 0.2)' }
                    ]} 
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Meals Timeline */}
          <View style={styles.mealsContainer}>
            <Text style={styles.subsectionTitle}>Meals Timeline</Text>
            <View style={styles.mealsList}>
              {todaysMeals.map((meal, index) => (
                <View key={index} style={styles.mealCard}>
                  <View style={styles.mealGradient}>
                    <View style={styles.mealHeader}>
                      <View>
                        <Text style={styles.mealName}>{meal.meal}</Text>
                        <Text style={styles.mealTime}>{meal.time}</Text>
                      </View>
                      <View style={styles.mealCalories}>
                        <Text style={styles.mealCaloriesText}>{meal.totalCalories}</Text>
                        <Text style={styles.mealCaloriesLabel}>cal</Text>
                      </View>
                    </View>
                    <View style={styles.mealItems}>
                      {meal.items.map((item, itemIndex) => (
                        <View key={itemIndex} style={styles.mealItem}>
                          <Text style={styles.mealItemIcon}>{item.icon}</Text>
                          <Text style={styles.mealItemName}>{item.name}</Text>
                          <Text style={styles.mealItemCalories}>{item.calories} cal</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Enhanced Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={action.action}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradientColors}
                  style={styles.actionGradient}
                >
                  <View style={styles.actionIconContainer}>
                    <action.icon size={24} color="white" strokeWidth={2} />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </View>
                  <View style={styles.actionArrow}>
                    <ChevronRight size={16} color="rgba(255, 255, 255, 0.8)" strokeWidth={2} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Quick Add Modal */}
      <Modal
        visible={showQuickAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowQuickAddModal(false)}
      >
        <View style={styles.quickAddModal}>
          <View style={styles.quickAddHeader}>
            <TouchableOpacity onPress={() => setShowQuickAddModal(false)}>
              <Text style={styles.quickAddCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.quickAddTitle}>Quick Add</Text>
            <View style={styles.placeholder} />
          </View>
          
          <ScrollView style={styles.quickAddContent}>
            <Text style={styles.quickAddSubtitle}>
              Add common foods and drinks instantly
            </Text>
            
            <View style={styles.quickAddGrid}>
              {quickAddItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickAddItem}
                  onPress={item.action}
                  activeOpacity={0.8}
                >
                  <View style={styles.quickAddItemContent}>
                    <Text style={styles.quickAddItemIcon}>{item.icon}</Text>
                    <Text style={styles.quickAddItemName}>{item.name}</Text>
                    <Text style={styles.quickAddItemCalories}>
                      {item.calories} cal
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Camera Scanner */}
      <CameraScanner
        visible={showCameraScanner}
        onClose={() => setShowCameraScanner(false)}
        onScanComplete={handleScanComplete}
      />

      {/* Nutrition Sheet */}
      <NutritionSheet
        visible={showNutritionSheet}
        onClose={() => setShowNutritionSheet(false)}
        foodData={selectedFood}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  healthScore: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  healthStatus: {
    fontSize: 16,
    color: '#00D4AA',
    fontWeight: '600',
  },
  vitalsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  vitalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vitalsNavigation: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(199, 199, 204, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  vitalsGrid: {
    gap: 12,
  },
  vitalCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  vitalGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  questContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  questCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  questContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questInfo: {
    flex: 1,
  },
  questLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 8,
  },
  questValue: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  questGoalRef: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  questGoalText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  questRings: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questProgress: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questProgressText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  consumptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  macroContainer: {
    marginBottom: 24,
  },
  macroGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  macroCard: {
    flex: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  macroGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  macroName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  macroProgress: {
    width: '100%',
  },
  macroProgressBg: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  waterContainer: {
    marginBottom: 24,
  },
  waterCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  waterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  waterGlasses: {
    flexDirection: 'row',
    gap: 8,
  },
  waterGlass: {
    width: 24,
    height: 32,
    borderRadius: 6,
  },
  mealsContainer: {
    marginBottom: 24,
  },
  mealsList: {
    gap: 16,
  },
  mealCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  mealGradient: {
    padding: 20,
    borderRadius: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  mealCalories: {
    alignItems: 'center',
  },
  mealCaloriesText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  mealCaloriesLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  mealItems: {
    gap: 8,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mealItemIcon: {
    fontSize: 16,
  },
  mealItemName: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  mealItemCalories: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },

  // Enhanced Quick Actions
  actionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  actionGrid: {
    gap: 12,
    marginTop: 16,
  },
  actionCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  actionArrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quick Add Modal
  quickAddModal: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  quickAddHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  quickAddCancel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  quickAddTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 60,
  },
  quickAddContent: {
    flex: 1,
    padding: 20,
  },
  quickAddSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAddItem: {
    width: (width - 64) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  quickAddItemContent: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  quickAddItemIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  quickAddItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  quickAddItemCalories: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});