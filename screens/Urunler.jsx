import { View, Text, Pressable, Image, FlatList, Linking } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';


export default function Urunler({ route }) {

    const { restoranKodu } = route.params;
    function camelCaseToWords(str) {
        return str.replace(/([A-Z])/g, ' $1').trim();
    }

    const navigation = useNavigation();
    const [urunler, setUrunler] = useState()
    const handleBack = () => {
        navigation.goBack();
    };
    const { getUrunler } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUrunler(restoranKodu);
                console.log("data geldi: ", data);
                if (data) {
                    setUrunler(data);
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchData();
    }, []);

    const openGoogleMaps = (lat, lng) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Linking.openURL(url);
    };

    useEffect(() => {
        console.log(urunler)
    }, [urunler])

    const renderHeader = () => {
        console.log("first: ", urunler)
        return (
            <>
                <View style={{ marginTop: 32 }} className="flex flex-row w-auto">
                    <Pressable onPress={handleBack} className="flex flex-row items-center pr-5 ">
                        <Ionicons name="chevron-back" size={44} color="black" className="-ml-3" />
                        <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-3xl text-black -ml-1">Geri</Text>
                    </Pressable>
                </View>
                <View className="flex-row items-center gap-3 mt-8">
                    <Image
                        source={{ uri: urunler[0].logo_url }}
                        style={{ width: 87, height: 87, margin: 8 }}
                    />
                    <Text style={{ fontFamily: "ClashGrotesk-Medium" }} className="text-5xl text-black w-64">
                         {camelCaseToWords(urunler[0].restoran_ad)}
                    </Text>
                </View>
                <Text style={{ fontFamily: "ClashGrotesk-Regular" }} className="text-4xl text-black mt-8">
                    Mevcut Ürünler
                </Text>
            </>
        );
    };

    const flatListComponent = ({ item }) => {
        return (
            <Pressable onPress={() => openGoogleMaps(item.lat, item.lng)} style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: '#E6E6E6', paddingBottom: 16, marginTop: 24, gap: 8 }}>
                <Image
                    source={{ uri: item.image_link }}
                    style={{ width: 115, height: 115, borderRadius: 24 }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 28, color: 'black', marginBottom: 16 }}>
                        {item.urun_isim}
                    </Text>
                    <Text style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 18, color: 'black', marginBottom: 3 }}>
                        Fiyat: {item.fiyat} ₺
                    </Text>
                    <Text style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 18, color: 'gray' }}>
                        Kalan Adet: {item.adet}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <View className="flex-col justify-between px-5 bg-white flex-1">
            {urunler && urunler.length > 0 && (
                <FlatList
                    data={urunler}
                    renderItem={flatListComponent}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={renderHeader}
                />
            )}
        </View>
    )
}