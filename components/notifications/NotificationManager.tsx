import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface NotificationSettings {
  mealReminders: boolean;
  waterReminders: boolean;
  workoutReminders: boolean;
  sleepReminders: boolean;
  goalReminders: boolean;
  weeklyReports: boolean;
  achievements: boolean;
  customReminders: CustomReminder[];
}

interface CustomReminder {
  id: string;
  title: string;
  message: string;
  time: string; // HH:MM format
  days: number[]; // 0-6 (Sunday-Saturday)
  enabled: boolean;
  type: 'meal' | 'water' | 'workout' | 'custom';
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  scheduleCustomReminder: (reminder: Omit<CustomReminder, 'id'>) => void;
  removeCustomReminder: (id: string) => void;
  sendInstantNotification: (title: string, body: string, data?: any) => void;
  requestPermissions: () => Promise<boolean>;
}

const defaultSettings: NotificationSettings = {
  mealReminders: true,
  waterReminders: true,
  workoutReminders: true,
  sleepReminders: true,
  goalReminders: true,
  weeklyReports: true,
  achievements: true,
  customReminders: [],
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    loadSettings();
    requestPermissions();
    setupDefaultReminders();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('notificationSettings');
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  };

  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      // Web notifications require different handling
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setPermissionGranted(permission === 'granted');
        return permission === 'granted';
      }
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    setPermissionGranted(finalStatus === 'granted');
    return finalStatus === 'granted';
  };

  const updateSettings = async (newSettings: Partial<NotificationSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await saveSettings(updated);
    
    // Reschedule notifications based on new settings
    await rescheduleNotifications(updated);
  };

  const setupDefaultReminders = async () => {
    if (!permissionGranted) return;

    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule default reminders based on settings
    if (settings.mealReminders) {
      await scheduleMealReminders();
    }
    if (settings.waterReminders) {
      await scheduleWaterReminders();
    }
    if (settings.workoutReminders) {
      await scheduleWorkoutReminders();
    }
    if (settings.sleepReminders) {
      await scheduleSleepReminders();
    }
    if (settings.goalReminders) {
      await scheduleGoalReminders();
    }
    if (settings.weeklyReports) {
      await scheduleWeeklyReports();
    }
  };

  const rescheduleNotifications = async (newSettings: NotificationSettings) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    if (newSettings.mealReminders) await scheduleMealReminders();
    if (newSettings.waterReminders) await scheduleWaterReminders();
    if (newSettings.workoutReminders) await scheduleWorkoutReminders();
    if (newSettings.sleepReminders) await scheduleSleepReminders();
    if (newSettings.goalReminders) await scheduleGoalReminders();
    if (newSettings.weeklyReports) await scheduleWeeklyReports();
    
    // Schedule custom reminders
    for (const reminder of newSettings.customReminders) {
      if (reminder.enabled) {
        await scheduleCustomReminderNotification(reminder);
      }
    }
  };

  const scheduleMealReminders = async () => {
    const mealTimes = [
      { time: { hour: 8, minute: 0 }, meal: 'breakfast', title: '🍳 Breakfast Time!', body: 'Start your day with a nutritious breakfast' },
      { time: { hour: 12, minute: 30 }, meal: 'lunch', title: '🥗 Lunch Break!', body: 'Time for a healthy lunch to fuel your afternoon' },
      { time: { hour: 18, minute: 30 }, meal: 'dinner', title: '🍽️ Dinner Time!', body: 'End your day with a balanced dinner' },
    ];

    for (const meal of mealTimes) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: meal.title,
          body: meal.body,
          data: { type: 'meal', meal: meal.meal },
          sound: true,
        },
        trigger: {
          hour: meal.time.hour,
          minute: meal.time.minute,
          repeats: true,
        },
      });
    }
  };

  const scheduleWaterReminders = async () => {
    // Schedule water reminders every 2 hours from 8 AM to 8 PM
    const waterTimes = [10, 12, 14, 16, 18, 20];
    
    for (const hour of waterTimes) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💧 Hydration Check!',
          body: 'Time to drink some water and stay hydrated',
          data: { type: 'water' },
          sound: true,
        },
        trigger: {
          hour,
          minute: 0,
          repeats: true,
        },
      });
    }
  };

  const scheduleWorkoutReminders = async () => {
    // Schedule workout reminders for weekdays at 7 AM and 6 PM
    const workoutTimes = [
      { hour: 7, minute: 0, title: '🌅 Morning Workout!', body: 'Start your day with energy - time for your morning workout!' },
      { hour: 18, minute: 0, title: '💪 Evening Workout!', body: 'End your workday strong with an evening workout session!' },
    ];

    for (const workout of workoutTimes) {
      // Schedule for weekdays only (Monday-Friday)
      for (let weekday = 2; weekday <= 6; weekday++) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: workout.title,
            body: workout.body,
            data: { type: 'workout' },
            sound: true,
          },
          trigger: {
            weekday,
            hour: workout.hour,
            minute: workout.minute,
            repeats: true,
          },
        });
      }
    }
  };

  const scheduleSleepReminders = async () => {
    // Sleep reminder at 10 PM
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🌙 Wind Down Time!',
        body: 'Consider starting your bedtime routine for better sleep quality',
        data: { type: 'sleep' },
        sound: true,
      },
      trigger: {
        hour: 22,
        minute: 0,
        repeats: true,
      },
    });
  };

  const scheduleGoalReminders = async () => {
    // Daily goal check at 8 PM
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎯 Goal Check-in!',
        body: 'How are you progressing on your health goals today?',
        data: { type: 'goals' },
        sound: true,
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
  };

  const scheduleWeeklyReports = async () => {
    // Weekly report on Sunday at 9 AM
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📊 Weekly Health Report!',
        body: 'Your weekly progress summary is ready to view',
        data: { type: 'weekly_report' },
        sound: true,
      },
      trigger: {
        weekday: 1, // Sunday
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
  };

  const scheduleCustomReminder = async (reminder: Omit<CustomReminder, 'id'>) => {
    const id = Date.now().toString();
    const newReminder: CustomReminder = { ...reminder, id };
    
    const updatedSettings = {
      ...settings,
      customReminders: [...settings.customReminders, newReminder],
    };
    
    await updateSettings(updatedSettings);
    
    if (newReminder.enabled) {
      await scheduleCustomReminderNotification(newReminder);
    }
  };

  const scheduleCustomReminderNotification = async (reminder: CustomReminder) => {
    const [hour, minute] = reminder.time.split(':').map(Number);
    
    for (const day of reminder.days) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: reminder.title,
          body: reminder.message,
          data: { type: 'custom', reminderId: reminder.id },
          sound: true,
        },
        trigger: {
          weekday: day === 0 ? 1 : day + 1, // Convert to Expo's weekday format
          hour,
          minute,
          repeats: true,
        },
      });
    }
  };

  const removeCustomReminder = async (id: string) => {
    const updatedSettings = {
      ...settings,
      customReminders: settings.customReminders.filter(r => r.id !== id),
    };
    
    await updateSettings(updatedSettings);
  };

  const sendInstantNotification = async (title: string, body: string, data?: any) => {
    if (!permissionGranted) return;

    if (Platform.OS === 'web') {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/icon.png' });
      }
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: true,
      },
      trigger: null, // Send immediately
    });
  };

  const contextValue: NotificationContextType = {
    settings,
    updateSettings,
    scheduleCustomReminder,
    removeCustomReminder,
    sendInstantNotification,
    requestPermissions,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Smart notification triggers based on user behavior
export class SmartNotificationTriggers {
  static async triggerMealSuggestion(lastMealTime: Date, mealType: string) {
    const now = new Date();
    const timeSinceLastMeal = now.getTime() - lastMealTime.getTime();
    const hoursElapsed = timeSinceLastMeal / (1000 * 60 * 60);

    if (hoursElapsed > 4 && mealType !== 'snack') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🍽️ Meal Suggestion',
          body: `It's been ${Math.floor(hoursElapsed)} hours since your last meal. Consider having a healthy snack!`,
          data: { type: 'smart_meal_suggestion' },
        },
        trigger: null,
      });
    }
  }

  static async triggerHydrationReminder(lastWaterIntake: Date, dailyGoal: number, currentIntake: number) {
    const now = new Date();
    const timeSinceWater = now.getTime() - lastWaterIntake.getTime();
    const hoursElapsed = timeSinceWater / (1000 * 60 * 60);
    const progressPercentage = (currentIntake / dailyGoal) * 100;

    if (hoursElapsed > 2 && progressPercentage < 80) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💧 Hydration Alert',
          body: `You're ${Math.round(100 - progressPercentage)}% away from your daily water goal. Time for a drink!`,
          data: { type: 'smart_hydration' },
        },
        trigger: null,
      });
    }
  }

  static async triggerWorkoutMotivation(lastWorkout: Date, weeklyGoal: number, currentWeekWorkouts: number) {
    const now = new Date();
    const daysSinceWorkout = Math.floor((now.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24));
    const progressPercentage = (currentWeekWorkouts / weeklyGoal) * 100;

    if (daysSinceWorkout >= 2 && progressPercentage < 70) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💪 Workout Motivation',
          body: `You've got this! ${weeklyGoal - currentWeekWorkouts} more workouts to reach your weekly goal.`,
          data: { type: 'smart_workout_motivation' },
        },
        trigger: null,
      });
    }
  }

  static async triggerGoalCelebration(goalName: string, progressPercentage: number) {
    if (progressPercentage >= 100) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🎉 Goal Achieved!',
          body: `Congratulations! You've completed your "${goalName}" goal. Time to celebrate!`,
          data: { type: 'goal_celebration', goalName },
        },
        trigger: null,
      });
    } else if (progressPercentage >= 75 && progressPercentage < 100) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🔥 Almost There!',
          body: `You're ${Math.round(progressPercentage)}% complete with "${goalName}". Keep pushing!`,
          data: { type: 'goal_milestone', goalName, progress: progressPercentage },
        },
        trigger: null,
      });
    }
  }

  static async triggerStreakMaintenance(streakType: string, currentStreak: number) {
    if (currentStreak >= 7) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🔥 Streak Master!',
          body: `Amazing! You've maintained your ${streakType} streak for ${currentStreak} days. Don't break it now!`,
          data: { type: 'streak_celebration', streakType, days: currentStreak },
        },
        trigger: null,
      });
    }
  }
}