import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileInf from './UserProfileInf';
import ResetPass from './ResetPass';
import Support from './Support';



const SettingsScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const handleExit = () => {
    console.log("first")
    AsyncStorage.clear()
    navigation.navigate("OnBoarding")
  };

  return (
    <View className="bg-white flex-1">
      <Text style={{ fontFamily: 'ClashGrotesk-Semibold', marginTop: 32 }} className="text-[#fa5353] pl-7 text-5xl">Ayarlar</Text>
      <View className="border-[3px] rounded-3xl border-[#E6E6E6] py-4 mx-6 mt-10">
        <Pressable onPress={() => navigation.navigate("UserProfile")} className=" flex flex-row gap-8 pb-4 border-b-[3px] pl-4 border-[#E6E6E6]">
          <FontAwesome5 name="user-alt" size={28} color="black" />
          <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 24, color: "black" }}>Kullanıcı Bilgilerim</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ResetPass')} className="flex flex-row gap-6 py-4 border-b-[3px] pl-4 border-[#E6E6E6]">
          <MaterialIcons name="password" size={34} color="black" />
          <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 24, color: "black" }}>Şifre Değiştir</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Support')} className="flex flex-row gap-6 py-4 border-b-[3px] pl-4 border-[#E6E6E6]">
          <MaterialIcons name="support-agent" size={34} color="black" />
          <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 24, color: "black" }}>Destek</Text>
        </Pressable>
        <Pressable onPress={() => handleExit()} className="flex flex-row gap-6 pt-4 pl-4">
          <Ionicons name="exit-outline" size={34} color="black" />
          <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 24, color: "black" }}>Çıkış Yap</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SettingsScreen;
