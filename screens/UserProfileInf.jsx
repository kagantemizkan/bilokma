import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserProfileInf() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [epost, setEpost] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const storedName = await AsyncStorage.getItem("kullaniciAd");
            const soyisim = await AsyncStorage.getItem("soyisim");
            const email = await AsyncStorage.getItem("email");
            setEpost(email);
            setSurname(soyisim);
            setName(storedName);
        };
        fetchData();
    }, []);

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
                <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-[#fa5353] pl-7 text-5xl">Kullanıcı</Text>
            </View>


            <View className="flex-col mb-5 gap-2">
                <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-3xl text-[#271B27] mx-7">İsim</Text>
                <View style={{ borderWidth: 2, flexDirection: 'row', alignItems: 'center', borderColor: '#C0C0C0', borderRadius: 20, backgroundColor: '#F4F4F4', marginHorizontal: 20 }}>
                    <FontAwesome6 name="circle-user" size={28} style={{ marginLeft: 10, color: '#868686' }} />
                    <TextInput
                        placeholder={name}
                        placeholderTextColor="#868686"
                        style={{ flex: 1, fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6, color: '#000000' }}
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={name} // Call handleSearch when the user submits the search text
                        keyboardType="default"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />
                </View>
            </View>

            <View className="flex-col mb-5 gap-2">
                <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-3xl text-[#271B27] mx-7">Soyisim</Text>
                <View style={{ borderWidth: 2, flexDirection: 'row', alignItems: 'center', borderColor: '#C0C0C0', borderRadius: 20, backgroundColor: '#F4F4F4', marginHorizontal: 20 }}>
                    <FontAwesome6 name="circle-user" size={28} style={{ marginLeft: 10, color: '#868686' }} />
                    <TextInput
                        placeholder={surname}
                        placeholderTextColor="#868686"
                        style={{ flex: 1, fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6, color: '#000000' }}
                        value={surname}
                        onChangeText={setSurname}
                        onSubmitEditing={surname} // Call handleSearch when the user submits the search text
                        keyboardType="default"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />
                </View>
            </View>

            <View className="flex-col mb-5 gap-2">
                <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-3xl text-[#271B27] mx-7">Eposta</Text>
                <View style={{ borderWidth: 2, flexDirection: 'row', alignItems: 'center', borderColor: '#C0C0C0', borderRadius: 20, backgroundColor: '#F4F4F4', marginHorizontal: 20 }}>
                    <Entypo name="email" size={28} style={{ marginLeft: 10, color: '#868686' }} />
                    <TextInput
                        placeholder={epost}
                        placeholderTextColor="#868686"
                        style={{ flex: 1, fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6, color: '#000000' }}
                        value={epost}
                        onChangeText={setEpost}
                        onSubmitEditing={epost} // Call handleSearch when the user submits the search text
                        keyboardType="default"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />
                </View>
            </View>
            <Pressable className="items-center justify-center bg-[#fa5353] py-4 mx-6 mt-3 rounded-3xl">
                <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-3xl font-medium text-white">Değiştir</Text>
            </Pressable>
        </View>
    )
}