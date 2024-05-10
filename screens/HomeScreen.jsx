import React, { useEffect, useState, useContext } from 'react';
import { FlatList, View, Image, Text, Pressable, Dimensions, Button, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import firestore from '@react-native-firebase/firestore';
import { center } from '@shopify/react-native-skia';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StoreDetails from '../components/StoreDetails';
import { AuthContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import SelectDropdown from 'react-native-select-dropdown'
import notifee from '@notifee/react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [city, setCity] = useState(null);
  const [isThereAnyData, setIsThereAnyData] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const navigation = useNavigation();

  const [kullaniciAd, setKullaniciAd] = useState("")
  const { getRestaurant } = useContext(AuthContext)


  useEffect(() => {
    const convertCoordinatesToCity = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC6zwA4XOjuWdvid1DT1rjdwWCg1TLcx14`
        );
        const data = await response.json();
        const parts = data.results[0].formatted_address.split('/');
        const cityNameWithCountry = parts[parts.length - 1].trim();
        const cityNameOnly = cityNameWithCountry.split(',')[0].trim(); 
        setCity(cityNameOnly)

      } catch (error) {
        console.error('Hata:', error);
        setCity('Şehir bilgisi alınamadı');
      }
    };

    // Get user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Call convertCoordinatesToCity with user's coordinates
        convertCoordinatesToCity(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
        setCity('Konum bilgisi alınamadı');
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurant(city);
        if (data.length > 0) {
          setIsThereAnyData(false)
        } else {
          setIsThereAnyData(true)
        }
        if (data) {
          setRestaurants(data);
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchData();
  }, [city])





  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const kulad = await AsyncStorage.getItem("kullaniciAd");
        if (kulad) {
          setKullaniciAd(kulad);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  const data = [
    { id: '1', name: 'Item 1' },
  ];

  const emojisWithIcons = [
    { title: 'Kocaeli' },
    { title: 'Istanbul' },
    { title: 'Ankara' },
  ];

  const renderHeader = () => {
    return (
      <>
        <Text style={{ fontFamily: 'ClashGrotesk-Medium' }} className="pl-7 text-4xl text-black">Merhaba,
          <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-[#fa5353]"> {kullaniciAd}</Text> 👋
        </Text>
        <View style={{ paddingHorizontal: 30, alignItems: 'center' }}>
          <View style={{ backgroundColor: '#c5ffc5', borderRadius: 20, flexDirection: 'row', alignItems: 'center', margin: 14, paddingHorizontal: 10 }}>
            <Image
              source={require('../assets/homevector2.png')}
              style={{ width: 87, height: 87, margin: 8 }}
            />
            <Text style={{ fontFamily: 'ClashGrotesk-Semibold', fontSize: 20, paddingRight: 12, color: "black" }}>Son kalan ürünleri keşfet uyguna satın al.</Text>
          </View>
          <View style={{ marginTop: 18, flexDirection: "row", justifyContent: "space-between", width: screenWidth - 45 }}>
            <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 32, color: 'black' }}>Keşfet</Text>

            <SelectDropdown
              data={emojisWithIcons}
              onSelect={(selectedItem, index) => {
                setCity(selectedItem.title); // Set the selected item's title as the city
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <AntDesign
                      name={"down"} // Use the icon name from the map
                      size={26}
                      color={"black"} // Dynamic color based on tab focus
                    />
                    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 32, color: 'black' }}>
                      {city}
                    </Text>
                  </View>

                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />

          </View>
        </View>

      </>
    );
  };


  return (
    <View className="bg-white" style={{ flex: 1 }}>
      {isThereAnyData ? (
        <>
          <Text style={{ fontFamily: 'ClashGrotesk-Medium' }} className="pl-7 text-4xl text-black">Merhaba,
            <Text style={{ fontFamily: 'ClashGrotesk-Semibold' }} className="text-[#fa5353]"> {kullaniciAd}</Text> 👋
          </Text>

          <View style={{ paddingHorizontal: 30, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#c5ffc5', borderRadius: 20, flexDirection: 'row', alignItems: 'center', margin: 14, paddingHorizontal: 10 }}>
              <Image
                source={require('../assets/homevector2.png')}
                style={{ width: 87, height: 87, margin: 8 }}
              />
              <Text style={{ fontFamily: 'ClashGrotesk-Semibold', fontSize: 20, paddingRight: 12, color: "black"  }}>Son kalan ürünleri keşfet uyguna satın al.</Text>
            </View>
            <View style={{ marginTop: 18, flexDirection: "row", justifyContent: "space-between", width: screenWidth - 45 }}>
              <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 32, color: 'black' }}>Keşfet</Text>

              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  setCity(selectedItem.title); // Set the selected item's title as the city
                  console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <AntDesign
                        name={"down"} // Use the icon name from the map
                        size={26}
                        color={"black"} // Dynamic color based on tab focus
                      />
                      <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 32, color: 'black' }}>
                        {city}
                      </Text>
                    </View>

                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center", gap: 15, alignItems: "flex-start", marginBottom: 35 }}>
            <Image
              source={require('../assets/homevector.png')}
              style={{ width: 314, height: 261, position: 'absolute', left: 14 }}
              className="absolute left-14"
            />
            <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 32, marginLeft: 40, color: 'black' }}>Üzgünüz, şu anda ürün bulunamamıştır. </Text>
            <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 25, marginLeft: 40, color: 'black' }}>Daha sonra tekrar bakınız.</Text>
            <Pressable onPress={async()  => await notifee.requestPermission()} style={{ backgroundColor: '#57B756', paddingVertical: 16, paddingHorizontal: 36, marginTop: 12, borderRadius: 36, marginLeft: 40, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontFamily: 'ClashGrotesk-Semibold', fontSize: 30, color: 'white', marginHorizontal: 35 }}>Bildirimleri Aç</Text>
            </Pressable>
            <Text style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 16, marginLeft: 40, color: '#5E5E5E' }}>
              *Bildirimleri açarak eklenen ürünlerden ilk siz haberdar olun.
            </Text>
          </View>
        </>
      ) : (
        <FlatList
          data={data}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={<View style={{ paddingBottom: 100 }} />}
          renderItem={({ item }) => (
            <StoreDetails restaurants={restaurants} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});