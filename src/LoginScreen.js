import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.137.26:3000/loginUser", {
        email,
        password,
      });

      const { token } = response.data;

      // Simpan token ke AsyncStorage
      await AsyncStorage.setItem("token", token);

      // Lakukan navigasi ke layar reservasi
      navigation.navigate('Navigation');
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login failed", "Invalid email or password");
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://raw.githubusercontent.com/zvn7/img/main/ava%20(1).jpg' }} style={styles.logo} />
      <Text style={styles.title}>Selamat Datang!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholderTextColor="#bdc3c7"
        />

        <TextInput
          style={styles.input}
          placeholder="Masukkan Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#bdc3c7"
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
  },
  signUpText: {
    marginTop: 20,
    fontSize: 14,
    color: '#ffffff',
  },
  signUpLink: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
