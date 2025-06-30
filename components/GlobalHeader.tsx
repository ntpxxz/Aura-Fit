import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Scan, Search, X, Plus, Clock, Star, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from './Avatar';
import { NutritionSheet } from './NutritionSheet';
import { CameraScanner } from './CameraScanner';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export function GlobalHeader() {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showNutritionSheet, setShowNutritionSheet] = useState(false);
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const statusData = {
    steps: { current: 8547, target: 10000 },
    calories: { current: 1850, target: 2200 },
    healthScore: { current: 78, target: 100 },
  };

  const mockFoodData = {
    name: 'Greek Yogurt',
    brand: 'Chobani',
    grade: 'A+',
    serving: '1 cup (227g)',
    nutrition: {
      calories: 130,
      protein: 20,
      carbs: 6,
      fat: 0,
      fiber: 0,
      sugar: 4,
    },
    healthBenefits: ['High Protein', 'Probiotic', 'Low Fat'],
  };

  const recentScans = [
    { name: 'Greek Yogurt', time: '2 hours ago', calories: 130, grade: 'A+' },
    { name: 'Banana', time: '4 hours ago', calories: 105, grade: 'A' },
    { name: 'Chicken Breast', time: '6 hours ago', calories: 280, grade: 'A+' },
    { name: 'Oatmeal', time: '1 day ago', calories: 150, grade: 'A' },
  ];

  const popularFoods = [
    { name: 'Avocado', calories: 160, grade: 'A+', icon: '🥑' },
    { name: 'Salmon', calories: 206, grade: 'A+', icon: '🐟' },
    { name: 'Quinoa', calories: 222, grade: 'A', icon: '🌾' },
    { name: 'Blueberries', calories: 84, grade: 'A+', icon: '🫐' },
    { name: 'Almonds', calories: 161, grade: 'A', icon: '🥜' },
    { name: 'Sweet Potato', calories: 112, grade: 'A', icon: '🍠' },
  ];

  const handleSmartScan = () => {
    setShowScanModal(false);
    setShowCameraScanner(true);
  };

  const handleScanComplete = (foodData: any) => {
    setSelectedFood(foodData);
    setShowCameraScanner(false);
    setShowNutritionSheet(true);
  };

  const handleRecentScan = (food: any) => {
    setSelectedFood({
      ...mockFoodData,
      name: food.name,
      nutrition: { ...mockFoodData.nutrition, calories: food.calories },
      grade: food.grade,
    });
    setShowScanModal(false);
    setShowNutritionSheet(true);
  };

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
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.content}>
          {/* Clean Profile Hub - Only Avatar */}
          <TouchableOpacity 
            style={styles.profileHub}
            onPress={() => setShowStatusModal(true)}
            activeOpacity={0.8}
          >
            <Avatar size={36} healthScore={statusData.healthScore.current} />
          </TouchableOpacity>

          {/* Modern Actions - Removed Analytics Button */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={() => setShowScanModal(true)}
              activeOpacity={0.8}
            >
              <Scan size={16} color="white" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push('/notifications')}
              activeOpacity={0.8}
            >
              <Bell size={16} color="#64748B" strokeWidth={2} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Enhanced Status Modal with Better Clarity */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setShowStatusModal(false)}
          activeOpacity={1}
        >
          <View style={styles.statusModal}>
            {/* Solid Background with Subtle Gradient */}
            <LinearGradient
              colors={['#FFFFFF', '#FAFBFC', '#F8FAFC']}
              style={styles.modalGradient}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>Today's Progress</Text>
                  <Text style={styles.modalSubtitle}>Your health metrics overview</Text>
                </View>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setShowStatusModal(false)}
                >
                  <X size={18} color="#64748B" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Enhanced Status Details with Better Contrast */}
              <View style={styles.statusDetails}>
                {[
                  {
                    key: 'steps',
                    label: 'Steps',
                    current: statusData.steps.current,
                    target: statusData.steps.target,
                    unit: '',
                    color: '#A8E6CF',
                    icon: '👟',
                    progress: statusData.steps.current / statusData.steps.target
                  },
                  {
                    key: 'calories',
                    label: 'Calories',
                    current: statusData.calories.current,
                    target: statusData.calories.target,
                    unit: 'cal',
                    color: '#4ECDC4',
                    icon: '🔥',
                    progress: statusData.calories.current / statusData.calories.target
                  },
                  {
                    key: 'healthScore',
                    label: 'Health Score',
                    current: statusData.healthScore.current,
                    target: statusData.healthScore.target,
                    unit: 'pts',
                    color: '#00D4AA',
                    icon: '💚',
                    progress: statusData.healthScore.current / statusData.healthScore.target
                  }
                ].map((item, index) => (
                  <View key={item.key} style={styles.statusItem}>
                    <View style={styles.statusItemHeader}>
                      <View style={styles.statusItemLeft}>
                        <View style={[styles.statusIcon, { backgroundColor: `${item.color}20` }]}>
                          <Text style={styles.statusEmoji}>{item.icon}</Text>
                        </View>
                        <View style={styles.statusItemInfo}>
                          <Text style={styles.statusLabel}>{item.label}</Text>
                          <Text style={styles.statusValue}>
                            {item.current.toLocaleString()}{item.unit} / {item.target.toLocaleString()}{item.unit}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.statusPercentage}>
                        <Text style={[styles.percentageText, { color: item.color }]}>
                          {Math.round(item.progress * 100)}%
                        </Text>
                      </View>
                    </View>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBarTrack}>
                        <View 
                          style={[
                            styles.progressBarFill, 
                            { 
                              width: `${Math.min(item.progress * 100, 100)}%`,
                              backgroundColor: item.color 
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Quick Insights with Better Background */}
              <View style={styles.quickInsights}>
                <Text style={styles.insightsTitle}>AI Insights</Text>
                <View style={styles.insightsList}>
                  <View style={styles.insightItem}>
                    <Text style={styles.insightText}>🎯 85% to your step goal - great progress!</Text>
                  </View>
                  <View style={styles.insightItem}>
                    <Text style={styles.insightText}>⚡ Peak energy window: 10-11 AM</Text>
                  </View>
                  <View style={styles.insightItem}>
                    <Text style={styles.insightText}>💪 Optimal workout time: 6-7 PM</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Scan Modal */}
      <Modal
        visible={showScanModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowScanModal(false)}
      >
        <View style={styles.scanModalContainer}>
          <View style={styles.scanBackground} />
          
          {/* Scan Modal Header */}
          <View style={styles.scanHeader}>
            <TouchableOpacity 
              onPress={() => setShowScanModal(false)}
              style={styles.closeButton}
            >
              <X size={22} color="#64748B" strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.scanTitle}>Smart Scan</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Smart Scan Method */}
            <View style={styles.scanMethodContainer}>
              <Text style={styles.sectionTitle}>AI-Powered Scanner</Text>
              <TouchableOpacity
                style={styles.smartScanCard}
                onPress={handleSmartScan}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#00D4AA', '#4ECDC4']}
                  style={styles.smartScanGradient}
                >
                  <View style={styles.smartScanHeader}>
                    <View style={styles.smartScanIconContainer}>
                      <Scan size={28} color="white" strokeWidth={2} />
                    </View>
                    <View style={styles.accuracyBadge}>
                      <Text style={styles.accuracyText}>99% Accuracy</Text>
                    </View>
                  </View>
                  
                  <View style={styles.smartScanContent}>
                    <Text style={styles.smartScanTitle}>Universal Scanner</Text>
                    <Text style={styles.smartScanSubtitle}>
                      AI-powered food recognition with nutritional analysis
                    </Text>
                    <Text style={styles.smartScanDescription}>
                      Instant barcode scanning • Food identification • Nutrition facts
                    </Text>
                  </View>

                  <View style={styles.smartScanAction}>
                    <Text style={styles.actionText}>Tap to Start Scanning</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Quick Search */}
            <View style={styles.quickSearchContainer}>
              <Text style={styles.sectionTitle}>Search Database</Text>
              <View style={styles.searchContainer}>
                <View style={styles.searchGradient}>
                  <Search size={18} color="#8E8E93" strokeWidth={2} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for food..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#8E8E93"
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <X size={16} color="#8E8E93" strokeWidth={2} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* Recent Scans */}
            <View style={styles.recentContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Scans</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.recentList}>
                {recentScans.map((food, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentItem}
                    onPress={() => handleRecentScan(food)}
                  >
                    <View style={styles.recentGradient}>
                      <View style={styles.recentIcon}>
                        <Clock size={14} color="#8E8E93" strokeWidth={2} />
                      </View>
                      
                      <View style={styles.recentContent}>
                        <Text style={styles.recentName}>{food.name}</Text>
                        <Text style={styles.recentTime}>{food.time}</Text>
                      </View>
                      
                      <View style={styles.recentStats}>
                        <Text style={styles.recentCalories}>{food.calories} cal</Text>
                        <View style={[styles.recentGrade, { backgroundColor: getGradeColor(food.grade) }]}>
                          <Text style={styles.recentGradeText}>{food.grade}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Foods */}
            <View style={styles.popularContainer}>
              <Text style={styles.sectionTitle}>Popular Foods</Text>
              <View style={styles.popularGrid}>
                {popularFoods.map((food, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.popularItem}
                    onPress={() => handleRecentScan(food)}
                  >
                    <View style={styles.popularGradient}>
                      <Text style={styles.popularIcon}>{food.icon}</Text>
                      <Text style={styles.popularName}>{food.name}</Text>
                      <Text style={styles.popularCalories}>{food.calories} cal</Text>
                      <View style={[styles.popularGrade, { backgroundColor: getGradeColor(food.grade) }]}>
                        <Star size={8} color="white" strokeWidth={2} />
                        <Text style={styles.popularGradeText}>{food.grade}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Add Section */}
            <View style={styles.quickAddContainer}>
              <View style={styles.quickAddCard}>
                <View style={styles.quickAddHeader}>
                  <Plus size={20} color="#00D4AA" strokeWidth={2} />
                  <Text style={styles.quickAddTitle}>Quick Add</Text>
                </View>
                <Text style={styles.quickAddSubtitle}>
                  Add common foods instantly without scanning
                </Text>
                <View style={styles.quickAddButtons}>
                  <TouchableOpacity style={styles.quickAddButton}>
                    <Text style={styles.quickAddButtonText}>Water</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quickAddButton}>
                    <Text style={styles.quickAddButtonText}>Coffee</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quickAddButton}>
                    <Text style={styles.quickAddButtonText}>Apple</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <CameraScanner
        visible={showCameraScanner}
        onClose={() => setShowCameraScanner(false)}
        onScanComplete={handleScanComplete}
      />

      <NutritionSheet
        visible={showNutritionSheet}
        onClose={() => setShowNutritionSheet(false)}
        foodData={selectedFood}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },

  // Clean Profile Hub - Only Avatar, No Status Rings
  profileHub: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  // Modern Actions - Removed Analytics Button
  actions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  scanButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00D4AA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 116, 139, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  
  // Enhanced Status Modal with Better Clarity
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statusModal: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    // Add border for better definition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  modalGradient: {
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 16,
    // Add subtle border bottom
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 116, 139, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDetails: {
    paddingHorizontal: 24,
    gap: 20,
    paddingBottom: 8,
  },
  statusItem: {
    gap: 12,
    // Add subtle background for better separation
    backgroundColor: 'rgba(248, 250, 252, 0.6)',
    borderRadius: 16,
    padding: 16,
  },
  statusItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    // Add subtle border
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  statusEmoji: {
    fontSize: 20,
  },
  statusItemInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  statusPercentage: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  quickInsights: {
    padding: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    marginTop: 8,
    // Add subtle background
    backgroundColor: 'rgba(0, 212, 170, 0.02)',
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  insightsList: {
    gap: 8,
  },
  insightItem: {
    paddingVertical: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 20,
  },

  // Scan Modal
  scanModalContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  scanBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#F8FAFC',
  },
  scanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 36,
  },

  // Smart Scan Method
  scanMethodContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  smartScanCard: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  smartScanGradient: {
    borderRadius: 18,
    padding: 18,
  },
  smartScanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  smartScanIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accuracyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accuracyText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },
  smartScanContent: {
    marginBottom: 14,
  },
  smartScanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  smartScanSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 18,
  },
  smartScanDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  smartScanAction: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },

  // Quick Search
  quickSearchContainer: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  searchContainer: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },

  // Recent Scans
  recentContainer: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  seeAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00D4AA',
  },
  recentList: {
    gap: 10,
  },
  recentItem: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  recentGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 10,
    backgroundColor: 'white',
  },
  recentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(142, 142, 147, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentContent: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 1,
  },
  recentTime: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
  },
  recentStats: {
    alignItems: 'flex-end',
    gap: 3,
  },
  recentCalories: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  recentGrade: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  recentGradeText: {
    fontSize: 9,
    fontWeight: '700',
    color: 'white',
  },

  // Popular Foods
  popularContainer: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  popularItem: {
    width: (width - 60) / 3,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  popularGradient: {
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    minHeight: 90,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  popularIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  popularName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 2,
  },
  popularCalories: {
    fontSize: 9,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 4,
  },
  popularGrade: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
    gap: 1,
  },
  popularGradeText: {
    fontSize: 7,
    fontWeight: '700',
    color: 'white',
  },

  // Quick Add
  quickAddContainer: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  quickAddCard: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  quickAddHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  quickAddTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  quickAddSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 14,
  },
  quickAddButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  quickAddButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 212, 170, 0.08)',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.15)',
  },
  quickAddButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00D4AA',
  },
});