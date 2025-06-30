import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Crown, Smartphone, Scale, Watch, Heart, Bell, Settings, CircleHelp as HelpCircle, ChevronRight, Brain, TrendingUp, ChartBar as BarChart3, Activity, Zap } from 'lucide-react-native';
import { Avatar } from '@/components/Avatar';
import { router } from 'expo-router';

export default function AccountScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [metricUnits, setMetricUnits] = React.useState(true);

  const deviceConnections = [
    { name: 'Smart Scale', icon: Scale, connected: true, color: '#00D4AA' },
    { name: 'Fitness Tracker', icon: Watch, connected: true, color: '#4ECDC4' },
    { name: 'Apple Health', icon: Heart, connected: false, color: '#FF6B6B' },
  ];

  const settingsOptions = [
    { title: 'Notifications', icon: Bell, hasSwitch: true, value: notificationsEnabled, onValueChange: setNotificationsEnabled },
    { title: 'Units', icon: Settings, subtitle: metricUnits ? 'Metric (kg, cm)' : 'Imperial (lbs, ft)', hasSwitch: true, value: metricUnits, onValueChange: setMetricUnits },
    { title: 'Privacy Settings', icon: Settings, hasChevron: true },
    { title: 'Help & Support', icon: HelpCircle, hasChevron: true },
  ];

  const analyticsFeatures = [
    {
      title: 'AI Health Predictions',
      description: 'Predictive health trends using machine learning',
      icon: Brain,
      color: '#6366F1',
      route: '/advanced-analytics'
    },
    {
      title: 'Performance Analytics',
      description: 'Workout optimization and peak performance insights',
      icon: TrendingUp,
      color: '#00D4AA',
      route: '/advanced-analytics'
    },
    {
      title: 'Nutrition Intelligence',
      description: 'Personalized meal recommendations and timing',
      icon: BarChart3,
      color: '#4ECDC4',
      route: '/advanced-analytics'
    },
    {
      title: 'Recovery Analysis',
      description: 'Sleep patterns, stress tracking, and recovery optimization',
      icon: Activity,
      color: '#A8E6CF',
      route: '/advanced-analytics'
    },
    {
      title: 'Metabolic Insights',
      description: 'Advanced body composition and metabolic age analysis',
      icon: Zap,
      color: '#FFE66D',
      route: '/advanced-analytics'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Clean Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your account and health insights</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Avatar size={72} healthScore={78} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Smith</Text>
              <Text style={styles.profileEmail}>john.smith@email.com</Text>
              <View style={styles.membershipBadge}>
                <Crown size={14} color="#FFD700" strokeWidth={2} />
                <Text style={styles.membershipText}>Premium Member</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Advanced Analytics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Advanced Analytics</Text>
            <View style={styles.aiPoweredBadge}>
              <Brain size={12} color="#6366F1" strokeWidth={2} />
              <Text style={styles.aiPoweredText}>AI Powered</Text>
            </View>
          </View>
          
          <View style={styles.analyticsContainer}>
            {analyticsFeatures.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.analyticsCard}
                onPress={() => router.push(feature.route)}
                activeOpacity={0.8}
              >
                <View style={styles.analyticsCardContent}>
                  <View style={styles.analyticsLeft}>
                    <View style={[styles.analyticsIcon, { backgroundColor: `${feature.color}12` }]}>
                      <feature.icon size={20} color={feature.color} strokeWidth={2} />
                    </View>
                    <View style={styles.analyticsInfo}>
                      <Text style={styles.analyticsTitle}>{feature.title}</Text>
                      <Text style={styles.analyticsDescription}>{feature.description}</Text>
                    </View>
                  </View>
                  <ChevronRight size={18} color="#94A3B8" strokeWidth={2} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Membership */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Membership</Text>
          <TouchableOpacity style={styles.membershipCard}>
            <View style={styles.membershipContent}>
              <Crown size={28} color="#FFD700" strokeWidth={2} />
              <View style={styles.membershipDetails}>
                <Text style={styles.membershipTitle}>Aura Premium</Text>
                <Text style={styles.membershipDescription}>
                  Unlimited access to all features
                </Text>
                <Text style={styles.membershipExpiry}>Expires: March 15, 2025</Text>
              </View>
              <ChevronRight size={20} color="#64748B" strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Device Connections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          <View style={styles.devicesContainer}>
            {deviceConnections.map((device, index) => (
              <View key={index} style={styles.deviceCard}>
                <View style={styles.deviceContent}>
                  <View style={[styles.deviceIcon, { backgroundColor: `${device.color}15` }]}>
                    <device.icon size={20} color={device.color} strokeWidth={2} />
                  </View>
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={[
                      styles.deviceStatus,
                      { color: device.connected ? '#00D4AA' : '#8E8E93' }
                    ]}>
                      {device.connected ? 'Connected' : 'Not Connected'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.deviceButton}>
                    <Text style={[
                      styles.deviceButtonText,
                      { color: device.connected ? '#FF6B6B' : '#00D4AA' }
                    ]}>
                      {device.connected ? 'Disconnect' : 'Connect'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            {settingsOptions.map((option, index) => (
              <View key={index} style={styles.settingRow}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <option.icon size={18} color="#8E8E93" strokeWidth={2} />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{option.title}</Text>
                    {option.subtitle && (
                      <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.settingRight}>
                  {option.hasSwitch && (
                    <Switch
                      value={option.value}
                      onValueChange={option.onValueChange}
                      trackColor={{ false: '#E5E5EA', true: '#00D4AA' }}
                      thumbColor="white"
                    />
                  )}
                  {option.hasChevron && (
                    <ChevronRight size={18} color="#8E8E93" strokeWidth={2} />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Aura Health v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ for your wellness journey</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B8860B',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  aiPoweredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  aiPoweredText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6366F1',
  },

  // Advanced Analytics Section
  analyticsContainer: {
    gap: 10,
  },
  analyticsCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  analyticsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  analyticsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  analyticsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyticsInfo: {
    flex: 1,
  },
  analyticsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  analyticsDescription: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 16,
  },

  // Membership Section
  membershipCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    backgroundColor: 'white',
  },
  membershipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
  },
  membershipDetails: {
    flex: 1,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  membershipDescription: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 6,
  },
  membershipExpiry: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
  },

  // Devices Section
  devicesContainer: {
    gap: 10,
  },
  deviceCard: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  deviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  deviceStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  deviceButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  deviceButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Settings Section
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.03)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(142, 142, 147, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 1,
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // App Info
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 36,
    gap: 6,
  },
  appInfoText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
});