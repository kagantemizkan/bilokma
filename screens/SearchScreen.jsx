import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { BlurView } from 'expo-blur';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const { searchBar } = useContext(AuthContext);


  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [isThereSearch, setIsThereSearch] = useState(false)


  function camelCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  const handleSearch = async () => {
    if (searchText.trim() !== '') {
      try {
        const capitalizedSearchText = searchText.charAt(0).toUpperCase() + searchText.slice(1);
        const data = await searchBar(capitalizedSearchText)
        const parsedData = JSON.parse(data)
        console.log("SearchScreen: ", parsedData)

        const updatedData = parsedData.map(item => ({
          ...item,
          data: {
            ...item.data,
            restoran_ad: camelCaseToWords(item.restoran_ad)
          }
        }));
        setIsThereSearch(true)
        console.log("dsa", updatedData);
        setSearchResults(updatedData);
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };



  const FlatListComponent = ({ item }) => {
    return (
      <View className="mt-4 mx-7 border-b-[3px] pb-8 border-gray-300">
        <View  className="flex-row items-center">
          <Image
            source={{ uri: item.logo_url }}
            style={{ width: 50, height: 50, margin: 8 }}
          />
          <Text style={{ fontFamily: 'ClashGrotesk-Medium' }} className="text-black text-4xl">{item.urun_isim}</Text>
        </View>
        <View className="mt-5 flex-row items-center gap-3">
          <Image
            source={{ uri: item.image_link }}
            style={{ width: 125, height: 125, borderRadius: 24 }}
          />
          <View style={{ marginLeft: 10 }} className="flex flex-col gap-3">
            <Text style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 24, color: 'black' }}>
              Fiyat: {item.fiyat} ₺
            </Text>
            <Text style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 18, color: 'gray' }}>
              Kalan Adet: {item.adet}
            </Text>
            <View className="flex-row gap-2 mt-5">
              <FontAwesome6 name="location-dot" size={24} color="black" />
              <Text style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 20, color: 'black' }}>{item.restoran_ad}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ marginTop: 32 }}>
        <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-[#fa5353] pl-7 text-5xl">Bi'Lokma</Text>
        <View style={{ marginBottom: 34, borderWidth: 2, flexDirection: 'row', alignItems: 'center', borderColor: '#C0C0C0', borderRadius: 20, backgroundColor: '#F4F4F4', marginHorizontal: 20, marginTop: 20 }}>
          <MaterialIcons name="search" size={28} style={{ marginLeft: 10, color: '#868686' }} />
          <TextInput
            placeholder="Ürün Ara"
            placeholderTextColor="#868686"
            style={{ flex: 1, fontFamily: 'ClashGrotesk-Medium', fontSize: 19, marginHorizontal: 6, color: '#000000' }}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch} // Call handleSearch when the user submits the search text
            keyboardType="default"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
        </View>
      </View>

      {searchResults && searchResults.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', gap: 15, alignItems: 'flex-start', marginTop: 100 }}>
          <Image
            source={require('../assets/homevector.png')}
            style={{ width: 314, height: 261, position: 'absolute', left: 14 }}
          />
          <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 32, marginLeft: 40, color: 'black' }}>Üzgünüz, şu anda ürün bulunamamıştır.</Text>
          <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 25, marginLeft: 40, color: 'black' }}>Daha sonra tekrar bakınız.</Text>
          <Pressable onPress={async () => await notifee.requestPermission()} style={{ backgroundColor: '#57B756', paddingVertical: 16, paddingHorizontal: 36, marginTop: 12, borderRadius: 36, marginLeft: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'ClashGrotesk-Semibold', fontSize: 30, color: 'white', marginHorizontal: 35 }}>Bildirimleri Aç</Text>
          </Pressable>
          <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 16, marginLeft: 40, color: '#5E5E5E' }}>
            *Bildirimleri açarak eklenen ürünlerden ilk siz haberdar olun. 
          </Text>
        </View>
      )}
      
      {isThereSearch ? (
        <FlatList
          data={searchResults}
          ListFooterComponent={<View style={{ marginBottom: 32 }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <FlatListComponent item={item} />}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 150 }}>
          <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 42, textAlign: 'center', color: "gray" }}>Dilediğiniz ürünü arayın.</Text>
        </View>
      )}




    </View>
  );
}
