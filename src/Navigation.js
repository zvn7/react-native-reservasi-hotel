import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ReservasiScreen from './ReservasiScreen';
import KamarScreen from './KamarScreen';
import PengunjungScreen from './PengunjungScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Reservasi"
      screenOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen 
        name="Reservasi" 
        component={ReservasiScreen}
        options={{
          tabBarLabel: 'Reservasi',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Kamar" 
        component={KamarScreen} 
        options={{
          tabBarLabel: 'Kamar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bed" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Pengunjung" 
        component={PengunjungScreen}
        options={{
          tabBarLabel: 'Pengunjung',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Setting" 
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default Navigation;
