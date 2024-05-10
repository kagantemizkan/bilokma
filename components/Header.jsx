import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack(); 
      };
    return (
        <View className="flex flex-row w-auto">
            <Pressable onPress={handleBack} className="flex flex-row items-center pr-5 ">
                <Ionicons name="chevron-back" size={44} color="#271B27" className="-ml-3" />
                <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-3xl text-[#271B27] -ml-1">Geri</Text>
            </Pressable>
        </View>
    )
}