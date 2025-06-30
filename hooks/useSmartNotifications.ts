import { useEffect, useCallback } from 'react';
import { useNotifications, SmartNotificationTriggers } from '../components/notifications/NotificationManager';

interface UserActivity {
  lastMealTime?: Date;
  lastWaterIntake?: Date;
  lastWorkout?: Date;
  dailyWaterGoal: number;
  currentWaterIntake: number;
  weeklyWorkoutGoal: number;
  currentWeekWorkouts: number;
  goals: Array<{
    id: string;
    name: string;
    progress: number;
  }>;
  streaks: Array<{
    type: string;
    currentStreak: number;
  }>;
}

export function useSmartNotifications(userActivity: UserActivity) {
  const { sendInstantNotification } = useNotifications();

  const checkMealReminders = useCallback(async () => {
    if (userActivity.lastMealTime) {
      await SmartNotificationTriggers.triggerMealSuggestion(
        userActivity.lastMealTime,
        'main' // or determine meal type based on time
      );
    }
  }, [userActivity.lastMealTime]);

  const checkHydrationReminders = useCallback(async () => {
    if (userActivity.lastWaterIntake) {
      await SmartNotificationTriggers.triggerHydrationReminder(
        userActivity.lastWaterIntake,
        userActivity.dailyWaterGoal,
        userActivity.currentWaterIntake
      );
    }
  }, [userActivity.lastWaterIntake, userActivity.dailyWaterGoal, userActivity.currentWaterIntake]);

  const checkWorkoutMotivation = useCallback(async () => {
    if (userActivity.lastWorkout) {
      await SmartNotificationTriggers.triggerWorkoutMotivation(
        userActivity.lastWorkout,
        userActivity.weeklyWorkoutGoal,
        userActivity.currentWeekWorkouts
      );
    }
  }, [userActivity.lastWorkout, userActivity.weeklyWorkoutGoal, userActivity.currentWeekWorkouts]);

  const checkGoalProgress = useCallback(async () => {
    for (const goal of userActivity.goals) {
      await SmartNotificationTriggers.triggerGoalCelebration(
        goal.name,
        goal.progress
      );
    }
  }, [userActivity.goals]);

  const checkStreakMaintenance = useCallback(async () => {
    for (const streak of userActivity.streaks) {
      await SmartNotificationTriggers.triggerStreakMaintenance(
        streak.type,
        streak.currentStreak
      );
    }
  }, [userActivity.streaks]);

  // Trigger smart notifications based on user activity
  useEffect(() => {
    const interval = setInterval(() => {
      checkMealReminders();
      checkHydrationReminders();
      checkWorkoutMotivation();
      checkGoalProgress();
      checkStreakMaintenance();
    }, 30 * 60 * 1000); // Check every 30 minutes

    return () => clearInterval(interval);
  }, [
    checkMealReminders,
    checkHydrationReminders,
    checkWorkoutMotivation,
    checkGoalProgress,
    checkStreakMaintenance,
  ]);

  // Specific trigger functions for immediate use
  const triggerAchievementNotification = useCallback(async (achievementName: string) => {
    await sendInstantNotification(
      '🏆 Achievement Unlocked!',
      `Congratulations! You've earned the "${achievementName}" achievement!`,
      { type: 'achievement', name: achievementName }
    );
  }, [sendInstantNotification]);

  const triggerGoalCompletionNotification = useCallback(async (goalName: string) => {
    await sendInstantNotification(
      '🎉 Goal Completed!',
      `Amazing work! You've successfully completed your "${goalName}" goal!`,
      { type: 'goal_completion', goalName }
    );
  }, [sendInstantNotification]);

  const triggerMilestoneNotification = useCallback(async (milestone: string, value: number) => {
    await sendInstantNotification(
      '🌟 Milestone Reached!',
      `You've reached ${value} ${milestone}! Keep up the great work!`,
      { type: 'milestone', milestone, value }
    );
  }, [sendInstantNotification]);

  const triggerMotivationalNotification = useCallback(async (message: string) => {
    await sendInstantNotification(
      '💪 Stay Strong!',
      message,
      { type: 'motivation' }
    );
  }, [sendInstantNotification]);

  return {
    triggerAchievementNotification,
    triggerGoalCompletionNotification,
    triggerMilestoneNotification,
    triggerMotivationalNotification,
  };
}