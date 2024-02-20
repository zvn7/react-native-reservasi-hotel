// src/SettingScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Display a confirmation dialog before logging out
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              // Remove the token from AsyncStorage
              await AsyncStorage.removeItem('token');
              console.log('Token deleted successfully');

              // Navigate to the login screen
              navigation.navigate('Login');
            } catch (error) {
              console.error('Logout failed:', error);
              // Handle the error, e.g., show an error message
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      {/* User Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>User Profile</Text>
        <Text style={styles.sectionText}>Name: John Doe</Text>
        {/* Add more user-related information here */}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SettingScreen;
