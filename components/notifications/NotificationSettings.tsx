import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Bell, Plus, X, Clock, Calendar, Trash2, CreditCard as Edit3 } from 'lucide-react-native';
import { useNotifications } from './NotificationManager';
import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface CustomReminder {
  id: string;
  title: string;
  message: string;
  time: string;
  days: number[];
  enabled: boolean;
  type: 'meal' | 'water' | 'workout' | 'custom';
}

export function NotificationSettings() {
  const { settings, updateSettings, scheduleCustomReminder, removeCustomReminder } = useNotifications();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<CustomReminder | null>(null);
  
  // Form state
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Weekdays
  const [reminderType, setReminderType] = useState<'meal' | 'water' | 'workout' | 'custom'>('custom');

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const reminderTypes = [
    { key: 'meal', label: 'Meal', icon: '🍽️' },
    { key: 'water', label: 'Water', icon: '💧' },
    { key: 'workout', label: 'Workout', icon: '💪' },
    { key: 'custom', label: 'Custom', icon: '⚡' },
  ];

  const notificationCategories = [
    {
      title: 'Meal Reminders',
      description: 'Breakfast, lunch, and dinner notifications',
      key: 'mealReminders',
      icon: '🍽️',
      enabled: settings.mealReminders,
    },
    {
      title: 'Water Reminders',
      description: 'Stay hydrated throughout the day',
      key: 'waterReminders',
      icon: '💧',
      enabled: settings.waterReminders,
    },
    {
      title: 'Workout Reminders',
      description: 'Daily exercise motivation',
      key: 'workoutReminders',
      icon: '💪',
      enabled: settings.workoutReminders,
    },
    {
      title: 'Sleep Reminders',
      description: 'Bedtime and wind-down notifications',
      key: 'sleepReminders',
      icon: '🌙',
      enabled: settings.sleepReminders,
    },
    {
      title: 'Goal Reminders',
      description: 'Progress check-ins and motivation',
      key: 'goalReminders',
      icon: '🎯',
      enabled: settings.goalReminders,
    },
    {
      title: 'Weekly Reports',
      description: 'Summary of your weekly progress',
      key: 'weeklyReports',
      icon: '📊',
      enabled: settings.weeklyReports,
    },
    {
      title: 'Achievements',
      description: 'Celebrate your milestones',
      key: 'achievements',
      icon: '🏆',
      enabled: settings.achievements,
    },
  ];

  const handleToggleSetting = (key: string, value: boolean) => {
    updateSettings({ [key]: value });
  };

  const handleCreateReminder = () => {
    if (!reminderTitle.trim() || !reminderMessage.trim()) return;

    const newReminder = {
      title: reminderTitle,
      message: reminderMessage,
      time: reminderTime,
      days: selectedDays,
      enabled: true,
      type: reminderType,
    };

    if (editingReminder) {
      // Update existing reminder
      const updatedReminders = settings.customReminders.map(r =>
        r.id === editingReminder.id ? { ...newReminder, id: editingReminder.id } : r
      );
      updateSettings({ customReminders: updatedReminders });
    } else {
      // Create new reminder
      scheduleCustomReminder(newReminder);
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleEditReminder = (reminder: CustomReminder) => {
    setEditingReminder(reminder);
    setReminderTitle(reminder.title);
    setReminderMessage(reminder.message);
    setReminderTime(reminder.time);
    setSelectedDays(reminder.days);
    setReminderType(reminder.type);
    setShowCreateModal(true);
  };

  const handleDeleteReminder = (id: string) => {
    removeCustomReminder(id);
  };

  const resetForm = () => {
    setEditingReminder(null);
    setReminderTitle('');
    setReminderMessage('');
    setReminderTime('09:00');
    setSelectedDays([1, 2, 3, 4, 5]);
    setReminderType('custom');
  };

  const toggleDay = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  const formatDaysText = (days: number[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && days.every(d => d >= 1 && d <= 5)) return 'Weekdays';
    if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
    return days.map(d => dayNames[d]).join(', ');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Bell size={24} color="#00D4AA" strokeWidth={2} />
        <Typography variant="h3">Notification Settings</Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Notification Categories */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Notification Types
          </Typography>
          <View style={styles.categoriesList}>
            {notificationCategories.map((category) => (
              <Card key={category.key} style={styles.categoryCard}>
                <View style={styles.categoryContent}>
                  <View style={styles.categoryLeft}>
                    <View style={styles.categoryIcon}>
                      <Typography variant="h4">{category.icon}</Typography>
                    </View>
                    <View style={styles.categoryInfo}>
                      <Typography variant="body" weight="semibold">
                        {category.title}
                      </Typography>
                      <Typography variant="small" color="muted">
                        {category.description}
                      </Typography>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.toggle,
                      category.enabled && styles.toggleActive,
                    ]}
                    onPress={() => handleToggleSetting(category.key, !category.enabled)}
                  >
                    <View
                      style={[
                        styles.toggleThumb,
                        category.enabled && styles.toggleThumbActive,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Custom Reminders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="h4" style={styles.sectionTitle}>
              Custom Reminders
            </Typography>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setShowCreateModal(true)}
              style={styles.addButton}
            >
              <Plus size={20} color="#00D4AA" strokeWidth={2} />
            </Button>
          </View>

          <View style={styles.remindersList}>
            {settings.customReminders.length === 0 ? (
              <Card style={styles.emptyCard}>
                <View style={styles.emptyContent}>
                  <Clock size={48} color="#94A3B8" strokeWidth={1} />
                  <Typography variant="body" color="muted" align="center">
                    No custom reminders yet
                  </Typography>
                  <Typography variant="small" color="muted" align="center">
                    Create personalized reminders to stay on track
                  </Typography>
                </View>
              </Card>
            ) : (
              settings.customReminders.map((reminder) => (
                <Card key={reminder.id} style={styles.reminderCard}>
                  <View style={styles.reminderContent}>
                    <View style={styles.reminderLeft}>
                      <View style={styles.reminderIcon}>
                        <Typography variant="body">
                          {reminderTypes.find(t => t.key === reminder.type)?.icon || '⚡'}
                        </Typography>
                      </View>
                      <View style={styles.reminderInfo}>
                        <Typography variant="body" weight="semibold">
                          {reminder.title}
                        </Typography>
                        <Typography variant="small" color="muted">
                          {reminder.message}
                        </Typography>
                        <View style={styles.reminderMeta}>
                          <View style={styles.reminderTime}>
                            <Clock size={12} color="#64748B" strokeWidth={2} />
                            <Typography variant="small" color="muted">
                              {reminder.time}
                            </Typography>
                          </View>
                          <View style={styles.reminderDays}>
                            <Calendar size={12} color="#64748B" strokeWidth={2} />
                            <Typography variant="small" color="muted">
                              {formatDaysText(reminder.days)}
                            </Typography>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.reminderActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEditReminder(reminder)}
                      >
                        <Edit3 size={16} color="#64748B" strokeWidth={2} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDeleteReminder(reminder.id)}
                      >
                        <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {!reminder.enabled && (
                    <Badge variant="secondary" size="sm" style={styles.disabledBadge}>
                      Disabled
                    </Badge>
                  )}
                </Card>
              ))
            )}
          </View>
        </View>

        {/* Smart Notifications Info */}
        <View style={styles.section}>
          <Card style={styles.infoCard}>
            <View style={styles.infoContent}>
              <Typography variant="h4" style={styles.infoTitle}>
                Smart Notifications
              </Typography>
              <Typography variant="body" color="muted" style={styles.infoDescription}>
                Aura uses AI to send personalized notifications based on your habits and goals. 
                These intelligent reminders adapt to your schedule and progress.
              </Typography>
              <View style={styles.infoFeatures}>
                <Typography variant="small" color="muted">
                  • Meal suggestions based on eating patterns
                </Typography>
                <Typography variant="small" color="muted">
                  • Hydration reminders when you need them most
                </Typography>
                <Typography variant="small" color="muted">
                  • Workout motivation at optimal times
                </Typography>
                <Typography variant="small" color="muted">
                  • Goal celebrations and milestone alerts
                </Typography>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Create/Edit Reminder Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          resetForm();
          setShowCreateModal(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                resetForm();
                setShowCreateModal(false);
              }}
            >
              <X size={24} color="#64748B" strokeWidth={2} />
            </TouchableOpacity>
            <Typography variant="h4">
              {editingReminder ? 'Edit Reminder' : 'Create Reminder'}
            </Typography>
            <TouchableOpacity onPress={handleCreateReminder}>
              <Typography variant="body" color="accent">
                {editingReminder ? 'Update' : 'Create'}
              </Typography>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Reminder Type */}
            <View style={styles.formSection}>
              <Typography variant="body" weight="semibold" style={styles.formLabel}>
                Type
              </Typography>
              <View style={styles.typeGrid}>
                {reminderTypes.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.typeCard,
                      reminderType === type.key && styles.typeCardSelected,
                    ]}
                    onPress={() => setReminderType(type.key as any)}
                  >
                    <Typography variant="h4">{type.icon}</Typography>
                    <Typography
                      variant="caption"
                      color={reminderType === type.key ? 'primary' : 'muted'}
                      weight="semibold"
                    >
                      {type.label}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Title */}
            <View style={styles.formSection}>
              <Typography variant="body" weight="semibold" style={styles.formLabel}>
                Title
              </Typography>
              <TextInput
                style={styles.textInput}
                value={reminderTitle}
                onChangeText={setReminderTitle}
                placeholder="Enter reminder title"
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Message */}
            <View style={styles.formSection}>
              <Typography variant="body" weight="semibold" style={styles.formLabel}>
                Message
              </Typography>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={reminderMessage}
                onChangeText={setReminderMessage}
                placeholder="Enter reminder message"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Time */}
            <View style={styles.formSection}>
              <Typography variant="body" weight="semibold" style={styles.formLabel}>
                Time
              </Typography>
              <TextInput
                style={styles.textInput}
                value={reminderTime}
                onChangeText={setReminderTime}
                placeholder="HH:MM"
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Days */}
            <View style={styles.formSection}>
              <Typography variant="body" weight="semibold" style={styles.formLabel}>
                Days
              </Typography>
              <View style={styles.daysGrid}>
                {dayNames.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayButton,
                      selectedDays.includes(index) && styles.dayButtonSelected,
                    ]}
                    onPress={() => toggleDay(index)}
                  >
                    <Typography
                      variant="caption"
                      color={selectedDays.includes(index) ? 'primary' : 'muted'}
                      weight="semibold"
                    >
                      {day}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Categories
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    padding: 16,
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    flex: 1,
    gap: 2,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#00D4AA',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },

  // Custom Reminders
  remindersList: {
    gap: 12,
  },
  emptyCard: {
    padding: 40,
  },
  emptyContent: {
    alignItems: 'center',
    gap: 12,
  },
  reminderCard: {
    padding: 16,
    position: 'relative',
  },
  reminderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  reminderIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderInfo: {
    flex: 1,
    gap: 4,
  },
  reminderMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  reminderTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reminderDays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reminderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 116, 139, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  // Info Card
  infoCard: {
    padding: 20,
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  infoContent: {
    gap: 12,
  },
  infoTitle: {
    marginBottom: 4,
  },
  infoDescription: {
    lineHeight: 22,
  },
  infoFeatures: {
    gap: 4,
    marginTop: 8,
  },

  // Modal
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
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
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
  daysGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  dayButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dayButtonSelected: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
});