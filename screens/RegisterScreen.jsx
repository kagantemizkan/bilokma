import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { registerUser } from '../authUtils';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const { register } = useContext(AuthContext)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.');
      return;
    }
    try {
      await register(email, password, name, surname)
      .then((data) => {
        console.log(data)
        if(data == "That email address is invalid!") {
        alert("Email adresi yanlış.")
        } else if(data == "That email address is already in use!") {
          alert("Email adresi daha önceden kullanılmış.")
        } else if(data =="Error: [auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]") {
          alert("Şifre 6 haneden uzun olmalı.")
        } else {
          navigation.navigate("HomeTab")
        }
      })
    } catch (error) {
      console.error('Register error:', error);
    }
  };
  return (
    <View className="flex-1 flex-col justify-between py-8 px-5 bg-white">
      <Header />
      <View className="flex gap-3 justify-center">
        <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 36, marginBottom: 24 }}>
          <Text className="font-bold text-[#fa5353]">Bi'Lokma</Text>'ya kayıt ol.
        </Text>
        <View className="border-2 flex flex-row items-center border-stone-300 rounded-2xl bg-[#F4F4F4]">
          <Feather name="user" size={28} className="ml-3" color="#868686" />
          <TextInput
            placeholderTextColor={"#868686"}
            className="flex-1 color-black"
            style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6 }}
            value={name}
            onChangeText={setName}
            placeholder="Ad"
            keyboardType="email-address" // Set keyboard type for email
            autoCapitalize="none" // Prevent auto-capitalization
            textContentType="emailAddress" // Enable autofill for email on supported devices
          />
        </View>
        <View className="border-2 flex flex-row items-center border-stone-300 rounded-2xl bg-[#F4F4F4]">
          <Feather name="user" size={28} className="ml-3" color="#868686" />
          <TextInput
            placeholderTextColor={"#868686"}
            className="flex-1 color-black"
            style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6 }}
            value={surname}
            onChangeText={setSurname}
            placeholder="Soyad"
            keyboardType="default"
            autoCapitalize="words" // Prevent auto-capitalization
            textContentType="emailAddress" // Enable autofill for email on supported devices
          />
        </View>
        <View className="border-2 flex flex-row items-center border-stone-300 rounded-2xl bg-[#F4F4F4]">
          <MaterialIcons name="alternate-email" size={28} className="ml-3" color="#868686" />
          <TextInput
            placeholderTextColor={"#868686"}
            className="flex-1 color-black"
            style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6 }}
            value={email}
            onChangeText={setEmail}
            placeholder="Eposta"
            keyboardType="default" // Set keyboard type for email
            autoCapitalize="words" // Prevent auto-capitalization
            textContentType="emailAddress" // Enable autofill for email on supported devices
          />
        </View>
        <View className="border-2 flex flex-row items-center border-stone-300 rounded-2xl bg-[#F4F4F4]">
          <MaterialIcons name="password" size={28} className="ml-3" color="#868686"/>
          <TextInput
            placeholderTextColor={"#868686"}
            className="flex-1 color-black"
            style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6 }}
            value={password}
            onChangeText={setPassword}
            placeholder="Şifre"
            secureTextEntry={true} // Hide password characters
            textContentType="password" // Enable autofill for password on supported devices
          />
        </View>
        <Pressable onPress={handleLogin} className="items-center justify-center bg-[#fa5353] py-4 px-9 mt-3 rounded-3xl">
          <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-3xl font-medium text-white">Kayıt Ol</Text>
        </Pressable>

      </View>
      <View className="flex flex-row gap-2 items-center justify-center">
        <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 16, textAlign: "center", color: "gray" }}>
          Bi'Lokma'ya kayıt olarak hizmet ve koşulları kabul etmiş sayılıyorsunuz.
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;