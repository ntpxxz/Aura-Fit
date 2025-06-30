import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Plus, Minus, Check } from 'lucide-react-native';

interface NutritionSheetProps {
  visible: boolean;
  onClose: () => void;
  foodData: any;
}

export function NutritionSheet({ visible, onClose, foodData }: NutritionSheetProps) {
  const [servings, setServings] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');

  if (!foodData) return null;

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

  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const adjustedNutrition = {
    calories: Math.round(foodData.nutrition.calories * servings),
    protein: Math.round(foodData.nutrition.protein * servings),
    carbs: Math.round(foodData.nutrition.carbs * servings),
    fat: Math.round(foodData.nutrition.fat * servings),
    fiber: Math.round(foodData.nutrition.fiber * servings),
    sugar: Math.round(foodData.nutrition.sugar * servings),
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#8E8E93" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Nutrition Info</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Food Info */}
          <View style={styles.foodInfo}>
            <View style={styles.foodHeader}>
              <View>
                <Text style={styles.foodName}>{foodData.name}</Text>
                <Text style={styles.foodBrand}>{foodData.brand}</Text>
              </View>
              <View style={[styles.gradeContainer, { backgroundColor: getGradeColor(foodData.grade) }]}>
                <Text style={styles.gradeText}>{foodData.grade}</Text>
              </View>
            </View>
            <Text style={styles.serving}>{foodData.serving}</Text>
          </View>

          {/* Servings */}
          <View style={styles.servingsContainer}>
            <Text style={styles.sectionTitle}>Servings</Text>
            <View style={styles.servingsControl}>
              <TouchableOpacity
                style={styles.servingButton}
                onPress={() => setServings(Math.max(0.5, servings - 0.5))}
              >
                <Minus size={20} color="#00D4AA" strokeWidth={2} />
              </TouchableOpacity>
              <Text style={styles.servingsText}>{servings}</Text>
              <TouchableOpacity
                style={styles.servingButton}
                onPress={() => setServings(servings + 0.5)}
              >
                <Plus size={20} color="#00D4AA" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nutrition Facts */}
          <View style={styles.nutritionContainer}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{adjustedNutrition.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{adjustedNutrition.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{adjustedNutrition.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{adjustedNutrition.fat}g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{adjustedNutrition.fiber}g</Text>
                <Text style={styles.nutritionLabel}>Fiber</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{adjustedNutrition.sugar}g</Text>
                <Text style={styles.nutritionLabel}>Sugar</Text>
              </View>
            </View>
          </View>

          {/* Health Benefits */}
          <View style={styles.benefitsContainer}>
            <Text style={styles.sectionTitle}>Health Benefits</Text>
            <View style={styles.benefitsList}>
              {foodData.healthBenefits.map((benefit: string, index: number) => (
                <View key={index} style={styles.benefitItem}>
                  <Check size={16} color="#00D4AA" strokeWidth={2} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Meal Selection */}
          <View style={styles.mealContainer}>
            <Text style={styles.sectionTitle}>Add to Meal</Text>
            <View style={styles.mealButtons}>
              {meals.map((meal) => (
                <TouchableOpacity
                  key={meal}
                  style={[
                    styles.mealButton,
                    selectedMeal === meal && styles.mealButtonSelected,
                  ]}
                  onPress={() => setSelectedMeal(meal)}
                >
                  <Text
                    style={[
                      styles.mealButtonText,
                      selectedMeal === meal && styles.mealButtonTextSelected,
                    ]}
                  >
                    {meal}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Log Button */}
        <View style={styles.logContainer}>
          <TouchableOpacity style={styles.logButton} onPress={onClose}>
            <LinearGradient
              colors={['#00D4AA', '#4ECDC4']}
              style={styles.logGradient}
            >
              <Text style={styles.logText}>Log Food</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 40,
  },
  foodInfo: {
    padding: 20,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  foodBrand: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 4,
  },
  gradeContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  serving: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  servingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  servingsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  servingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  servingsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginHorizontal: 40,
  },
  nutritionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  benefitsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  benefitsList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  benefitText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  mealContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mealButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mealButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mealButtonSelected: {
    borderColor: '#00D4AA',
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
  },
  mealButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  mealButtonTextSelected: {
    color: '#00D4AA',
  },
  logContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  logButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});