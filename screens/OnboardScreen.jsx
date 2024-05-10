import { View, Text, styles, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardScreen() {
    const navigation = useNavigation();
    const handleRegister = () => {
        navigation.navigate('Register');
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };
    //    AsyncStorage.setItem('authToken', "data.userData.email")

    return (
        <View className="bg-white">
            <View className={`h-3/5 items-center justify-center bg-[#E7FFE7] rounded-b-3xl`} >
                <LottieView style={{
                    width: "100%",
                    height: 300
                }} source={require('../assets/onboardAnimation.json')} autoPlay loop  />

            </View>
            <View className="h-2/5 items-center justify-between py-7 bg-white">
                <View className="w-full px-10">
                    <Text style={{fontFamily: 'ClashGrotesk-Bold'}} className="text-5xl text-[#271B27] pt-5">
                        <Text className="font-bold text-[#fa5353]">Bi'Lokma</Text>'ya Hoş Geldin
                    </Text>
                    <Text style={{fontFamily: 'ClashGrotesk-Medium'}} className="text-2xl text-[#271B27] pt-5 font-semibold">
                        En leziz pastanelerin son saatlere kalan ürünlerini ucuza al!
                    </Text>
                </View>

                <View className="flex-row gap-6 items-center justify-center w-full mb-5">
                    <Pressable onPress={handleRegister} className="items-center justify-center bg-white border-[#57B756] border-2 py-4 px-9 rounded-3xl">
                        <Text style={{fontFamily: 'ClashGrotesk-Semibold'}} className="text-3xl font-medium text-[#57B756]">Kayıt Ol</Text>
                    </Pressable>
                    <Pressable onPress={handleLogin} className="items-center justify-center bg-[#fa5353] py-4 px-9 rounded-3xl">
                        <Text style={{fontFamily: 'ClashGrotesk-Semibold'}} className="text-3xl font-medium text-white">Giriş Yap</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}