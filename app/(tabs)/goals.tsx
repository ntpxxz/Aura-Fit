import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Target, Plus, CircleCheck as CheckCircle, TrendingUp, Calendar, X, CreditCard as Edit3, Trash2, Play, Pause, Flame, Activity, Heart, Zap, Star, Award, ChevronRight, User, Scale, Dumbbell } from 'lucide-react-native';
import { ProgressRing } from '../../components/ProgressRing';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

const { width } = Dimensions.get('window');

export default function GoalsScreen() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalType, setNewGoalType] = useState('weight-loss');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  const goalTypes = [
    { id: 'weight-loss', label: 'Weight Loss', icon: Scale, color: '#EF4444' },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: Dumbbell, color: '#00D4AA' },
    { id: 'fitness', label: 'Fitness', icon: Activity, color: '#4ECDC4' },
    { id: 'health', label: 'Health', icon: Heart, color: '#10B981' },
  ];

  const [activeGoals, setActiveGoals] = useState([
    {
      id: 1,
      title: 'Summer Body Goal',
      type: 'Weight Loss',
      progress: 0.65,
      current: 6.5,
      target: 10,
      unit: 'kg',
      deadline: '2025-06-01',
      color: '#EF4444',
      status: 'active',
      streak: 12,
    },
    {
      id: 2,
      title: 'Strength Building',
      type: 'Muscle Gain',
      progress: 0.4,
      current: 2,
      target: 5,
      unit: 'kg',
      deadline: '2025-08-01',
      color: '#00D4AA',
      status: 'active',
      streak: 8,
    },
    {
      id: 3,
      title: 'Daily Steps',
      type: 'Fitness',
      progress: 0.8,
      current: 8000,
      target: 10000,
      unit: 'steps',
      deadline: '2025-12-31',
      color: '#4ECDC4',
      status: 'active',
      streak: 25,
    },
  ]);

  const handleCreateGoal = () => {
    const selectedType = goalTypes.find(type => type.id === newGoalType);
    const newGoal = {
      id: Date.now(),
      title: newGoalTitle,
      type: selectedType?.label || 'Custom',
      progress: 0,
      current: 0,
      target: parseFloat(newGoalTarget) || 0,
      unit: newGoalType === 'weight-loss' ? 'kg' : newGoalType === 'muscle-gain' ? 'kg' : 'points',
      deadline: newGoalDeadline,
      color: selectedType?.color || '#00D4AA',
      status: 'active',
      streak: 0,
    };
    
    setActiveGoals([...activeGoals, newGoal]);
    setShowCreateModal(false);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalDeadline('');
  };

  const handleDeleteGoal = (goalId: number) => {
    setActiveGoals(activeGoals.filter(goal => goal.id !== goalId));
  };

  const toggleGoalStatus = (goalId: number) => {
    setActiveGoals(activeGoals.map(goal => 
      goal.id === goalId 
        ? { ...goal, status: goal.status === 'active' ? 'paused' : 'active' }
        : goal
    ));
  };

  const getProgressText = (goal: any) => {
    const remaining = goal.target - goal.current;
    const percentage = Math.round(goal.progress * 100);
    return `${percentage}% • ${remaining.toFixed(1)} ${goal.unit} to go`;
  };

  return (
    <View style={styles.container}>
      {/* Minimalist Header */}
      <View style={styles.header}>
        <Typography variant="h2" align="center">Your Goals</Typography>
        <Typography variant="body" color="muted" align="center">
          Track your progress and stay motivated
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            {[
              { 
                icon: Target, 
                value: activeGoals.filter(g => g.status === 'active').length.toString(),
                label: 'Active Goals',
                color: '#00D4AA'
              },
              { 
                icon: TrendingUp, 
                value: `${Math.round(activeGoals.reduce((acc, goal) => acc + goal.progress, 0) / activeGoals.length * 100)}%`,
                label: 'Avg Progress',
                color: '#4ECDC4'
              },
              { 
                icon: Flame, 
                value: Math.max(...activeGoals.map(g => g.streak)).toString(),
                label: 'Best Streak',
                color: '#F59E0B'
              },
            ].map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={styles.statContent}>
                  <stat.icon size={20} color={stat.color} strokeWidth={2} />
                  <Typography variant="h3" style={styles.statValue}>
                    {stat.value}
                  </Typography>
                  <Typography variant="small" color="muted">
                    {stat.label}
                  </Typography>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Active Goals */}
        <View style={styles.goalsContainer}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">Active Goals</Typography>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setShowCreateModal(true)}
              style={styles.addButton}
            >
              <Plus size={20} color="#00D4AA" strokeWidth={2} />
            </Button>
          </View>

          <View style={styles.goalsList}>
            {activeGoals.map((goal) => (
              <Card key={goal.id} variant="default" style={styles.goalCard}>
                {/* Goal Header */}
                <View style={styles.goalHeader}>
                  <View style={styles.goalInfo}>
                    <View style={styles.goalTitleRow}>
                      <Typography variant="h4" style={styles.goalTitle}>
                        {goal.title}
                      </Typography>
                      <Badge 
                        variant={goal.status === 'active' ? 'success' : 'secondary'}
                        size="sm"
                      >
                        {goal.status === 'active' ? 'Active' : 'Paused'}
                      </Badge>
                    </View>
                    <Typography variant="caption" color="muted">
                      {goal.type}
                    </Typography>
                  </View>
                  
                  <View style={styles.goalProgress}>
                    <ProgressRing
                      progress={goal.progress}
                      size={60}
                      strokeWidth={6}
                      color={goal.color}
                    />
                    <View style={styles.progressCenter}>
                      <Typography variant="small" weight="bold">
                        {Math.round(goal.progress * 100)}%
                      </Typography>
                    </View>
                  </View>
                </View>

                {/* Progress Details */}
                <View style={styles.progressDetails}>
                  <View style={styles.progressBar}>
                    <View style={styles.progressTrack}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${goal.progress * 100}%`,
                            backgroundColor: goal.color 
                          }
                        ]} 
                      />
                    </View>
                    <Typography variant="small" color="muted">
                      {getProgressText(goal)}
                    </Typography>
                  </View>
                </View>

                {/* Goal Stats */}
                <View style={styles.goalStats}>
                  <View style={styles.statItem}>
                    <Typography variant="caption" weight="semibold">
                      {goal.current} / {goal.target} {goal.unit}
                    </Typography>
                    <Typography variant="small" color="muted">Progress</Typography>
                  </View>
                  <View style={styles.statItem}>
                    <Typography variant="caption" weight="semibold">
                      {goal.deadline}
                    </Typography>
                    <Typography variant="small" color="muted">Target Date</Typography>
                  </View>
                  <View style={styles.statItem}>
                    <Typography variant="caption" weight="semibold">
                      {goal.streak} days
                    </Typography>
                    <Typography variant="small" color="muted">Streak</Typography>
                  </View>
                </View>

                {/* Goal Actions */}
                <View style={styles.goalActions}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => toggleGoalStatus(goal.id)}
                    style={styles.actionButton}
                  >
                    {goal.status === 'active' ? (
                      <Pause size={16} color="#64748B" strokeWidth={2} />
                    ) : (
                      <Play size={16} color="#00D4AA" strokeWidth={2} />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => {}}
                    style={styles.actionButton}
                  >
                    <Edit3 size={16} color="#4ECDC4" strokeWidth={2} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => handleDeleteGoal(goal.id)}
                    style={styles.actionButton}
                  >
                    <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                  </Button>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Motivation Section */}
        <View style={styles.motivationContainer}>
          <Card style={styles.motivationCard}>
            <View style={styles.motivationContent}>
              <View style={styles.motivationHeader}>
                <Star size={24} color="#00D4AA" strokeWidth={2} />
                <Typography variant="h4">Keep Going!</Typography>
              </View>
              <Typography variant="body" color="secondary" style={styles.motivationText}>
                You're making great progress on your goals. Stay consistent and you'll achieve amazing results!
              </Typography>
              <View style={styles.motivationStats}>
                <Typography variant="caption" color="muted">
                  🔥 {Math.max(...activeGoals.map(g => g.streak))} day streak
                </Typography>
                <Typography variant="caption" color="muted">
                  🎯 {activeGoals.filter(g => g.progress > 0.5).length} goals over 50%
                </Typography>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Create Goal Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Button variant="ghost" onPress={() => setShowCreateModal(false)}>
              <X size={24} color="#64748B" strokeWidth={2} />
            </Button>
            <Typography variant="h4">Create New Goal</Typography>
            <Button variant="ghost" onPress={handleCreateGoal}>
              <Typography variant="body" color="accent">Save</Typography>
            </Button>
          </View>

          <ScrollView style={styles.modalContent}>
            <Input
              label="Goal Title"
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
              placeholder="Enter goal title"
            />

            <View style={styles.typeSection}>
              <Typography variant="body" weight="semibold" style={styles.typeLabel}>
                Goal Type
              </Typography>
              <View style={styles.typeGrid}>
                {goalTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeCard,
                      newGoalType === type.id && styles.typeCardSelected,
                    ]}
                    onPress={() => setNewGoalType(type.id)}
                  >
                    <type.icon 
                      size={20} 
                      color={newGoalType === type.id ? 'white' : type.color} 
                      strokeWidth={2} 
                    />
                    <Typography
                      variant="caption"
                      color={newGoalType === type.id ? 'primary' : 'secondary'}
                      weight="semibold"
                    >
                      {type.label}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Target"
              value={newGoalTarget}
              onChangeText={setNewGoalTarget}
              placeholder="Enter target value"
              keyboardType="numeric"
            />

            <Input
              label="Target Date"
              value={newGoalDeadline}
              onChangeText={setNewGoalDeadline}
              placeholder="YYYY-MM-DD"
            />
          </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
  },
  statContent: {
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    marginVertical: 4,
  },
  goalsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  goalsList: {
    gap: 16,
  },
  goalCard: {
    padding: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalInfo: {
    flex: 1,
    marginRight: 16,
  },
  goalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalTitle: {
    flex: 1,
  },
  goalProgress: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDetails: {
    marginBottom: 16,
  },
  progressBar: {
    gap: 8,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  goalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  motivationContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  motivationCard: {
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  motivationContent: {
    padding: 20,
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  motivationText: {
    lineHeight: 22,
    marginBottom: 16,
  },
  motivationStats: {
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  typeSection: {
    marginBottom: 24,
  },
  typeLabel: {
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: (width - 64) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
});