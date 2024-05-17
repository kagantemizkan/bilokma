import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context';

export default function Support() {
    const navigation = useNavigation();
    const [supportText, setSupportText] = useState()
    const [epost, setEpost] = useState("");

    const { support } = useContext(AuthContext)
    const email = AsyncStorage.getItem("email");

    useEffect(() => {
        const fetchData = async () => {
            const email = await AsyncStorage.getItem("email");
            setEpost(email);
        };
        fetchData();
    }, []);

    const sendSupportText = async () => {
        console.log(epost)
        console.log(supportText)   
        try {
            support(epost, supportText)
            .then((data) => {
                if(data){
                    alert("Desteğiniz bize ulaştı.")
                }
            })
        } catch (error) {
            console.error('Support error:', error);
        }
    };



    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginTop: 32 }} className="flex flex-row justify-between bg-white px-5 mb-10">
                <Pressable onPress={handleBack} className="flex flex-row items-center">
                    <Ionicons name="chevron-back" size={44} color="#271B27" className="-ml-3" />
                    <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-3xl text-[#271B27] -ml-1">Geri</Text>
                </Pressable>
                <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-[#fa5353] pl-7 text-5xl">Destek</Text>
            </View>
            <View style={{ marginBottom: 5, gap: 2 }}>
                <View style={{ borderWidth: 2, borderColor: '#C0C0C0', borderRadius: 20, backgroundColor: '#F4F4F4', marginHorizontal: 20 }}>
                    <TextInput
                        placeholderTextColor={"#868686"}
                        style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 19, paddingHorizontal: 10, paddingTop: 10, color: '#000000', height: 175 }}
                        placeholder={"Destek almak istediğiniz konuyu yazınız..."}
                        editable
                        multiline
                        onChangeText={setSupportText}
                        value={supportText}
                        textAlignVertical="top" // Add this line
                    />
                </View>
            </View>

            <Pressable onPress={() => sendSupportText()} className="items-center justify-center bg-[#fa5353] py-4 mx-6 mt-3 rounded-3xl">
                <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-3xl font-medium text-white">Onayla</Text>
            </Pressable>
        </View>
    )
}