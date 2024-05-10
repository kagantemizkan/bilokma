import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';

const LoginScreen = ({setUserLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const { login } = useContext(AuthContext)

  const handleLogin = async () => { 
    if (!email.trim() || !password.trim()) {
      alert('Lütfen eposta ve şifre giriniz.');
      return;
    }
    try {
      const data = await login(email, password);
      if(data == "Error: [auth/invalid-credential] The supplied auth credential is incorrect, malformed or has expired.") {
        alert('Girilen bilgiler yanlış.');
      } else if(data == "Error: [auth/invalid-email] The email address is badly formatted.") {
        alert('Email adresi doğru değil.');
      } else {
        navigation.navigate("HomeTab")
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  
  return (
    <View className="flex-1 flex-col justify-between py-8 px-5 bg-white">
      <Header />
      <View className="flex gap-3 justify-center">
        <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 36, marginBottom: 24 }}>
          <Text className="font-bold text-[#fa5353]">Bi'Lokma</Text>'ya giriş yap.
        </Text>
        <View className="border-2 flex flex-row items-center border-stone-300 rounded-2xl bg-[#F4F4F4]">
          <MaterialIcons name="alternate-email" size={28} className="ml-3" color="#868686" />
          <TextInput
            placeholderTextColor={"#868686"}
            className="flex-1 color-black"
            style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6 }}
            value={email}
            onChangeText={setEmail}
            placeholder="Eposta"
            keyboardType="email-address" // Set keyboard type for email
            autoCapitalize="none" // Prevent auto-capitalization
            textContentType="emailAddress" // Enable autofill for email on supported devices
          />
        </View>
        <View className="border-2 flex flex-row items-center border-stone-300 rounded-2xl bg-[#F4F4F4]">
          <MaterialIcons name="password" size={28} className="ml-3" color="#868686" />
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
          <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-3xl font-medium text-white">Giriş Yap</Text>
        </Pressable>

      </View>
      <View className="flex flex-row gap-2 items-center justify-center">
        <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, color: "gray" }}>
          Henüz hesabın yok mu?
        </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{ fontFamily: 'ClashGrotesk-Semibold', fontSize: 19 }} className="color-[#57B756]" >
            Kayıt Ol
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;