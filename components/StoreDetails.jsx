import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StoreDetails({ restaurants }) {
  const navigation = useNavigation();

  function camelCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }
  
  return (
    <>
      {restaurants.map((restaurant, index) => (
          <Pressable onPress={() => navigation.navigate('Urunler', { restoranKodu: restaurant.restoran_kodu })} key={index} className="border-[3px] rounded-3xl border-[#E6E6E6] mt-9 mx-5">
            <View key={index}>
              <Image
                source={{ uri: restaurant.header_url }} // Use restaurant headerUrl
                style={{ width: "auto", height: 110 }}
                className="rounded-t-3xl"
              />
              <Image
                source={{ uri: restaurant.logo_url }} // Use restaurant logoUrl
                style={{ width: 87, height: 87 }}
                className="rounded-full absolute top-16 left-4"
              />
              <View className="ml-32 mt-[10px] gap-2 border-b-[3xl] ">
                <Text
                  style={{ fontFamily: 'ClashGrotesk-Medium' }}
                  className="text-3xl text-black"
                >
                {camelCaseToWords(restaurant.restoran_ad)} {/* Restaurant name */}
                </Text>
                <View className="flex flex-row justify-between mb-3">
                  <View className="flex flex-row gap-1 items-center">
                    <Image
                      source={require('../assets/star.png')}
                      style={{ width: 18, height: 18 }}
                    />
                    <Text
                      style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 18, color: "gray" }}
                    >
                      5/{restaurant.rating}  {/* Use actual rating from data */}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: 'ClashGrotesk-Medium', fontSize: 18, marginRight: 32, color: "gray" }}
                  >
                    Kapanış: {restaurant.closing_time}  {/* Example: Use actual closing time from data */}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))
      }
    </>
  );
}
