import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { House, Box, Target, TrendingUp, User as UserIcon } from 'lucide-react-native';
import { GlobalHeader } from '../../components/GlobalHeader';

export default function TabLayout() {
  return (
    <>
      <GlobalHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#00D4AA',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.tabLabel,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <House size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="simulation"
          options={{
            title: 'Body',
            tabBarIcon: ({ size, color }) => (
              <Box size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            title: 'Goals',
            tabBarIcon: ({ size, color }) => (
              <Target size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: 'Reports',
            tabBarIcon: ({ size, color }) => (
              <TrendingUp size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ size, color }) => (
              <UserIcon size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    height: 84,
    paddingBottom: 20,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});