import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {

  const [error, setError] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [urunlerData, setUrunlerData] = useState([]);
  const [eklenenUrun, setEklenenUrun] = useState()
  const [eklenenPastane, setEklenenPastane] = useState()


  // AWS
  const getRestaurant = async (sehir) => {
    let gelenSehir = sehir.toLowerCase()
    try {
      const response = await fetch(`https://m6pjp9gbg7.execute-api.eu-north-1.amazonaws.com/restoranlar?sehir=${gelenSehir}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  };
  // AWS
  const getUrunler = async (restoran_kodu) => {
    const gelenrestoran_kodu = restoran_kodu.toLowerCase()
    try {
      const response = await fetch(`https://m6pjp9gbg7.execute-api.eu-north-1.amazonaws.com/?restoran_kodu=${gelenrestoran_kodu}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("getUrunler: ", data)
        return data;
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  };
  // AWS
  const register = async (email, password, isim, soyisim) => {
    try {
      const response = await fetch("https://jvd7ru74z6.execute-api.eu-north-1.amazonaws.com/cloudproject/kullanici/addUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "isim": isim,
          "soyisim": soyisim,
          "email": email,
          "password": password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.body.email)
        await AsyncStorage.setItem('authToken', "userLogin");
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  };
  // AWS
  const login = async (email, password) => {
    try {
      const response = await fetch('https://jvd7ru74z6.execute-api.eu-north-1.amazonaws.com/cloudproject/kullanici/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        await AsyncStorage.setItem('authToken', "userLogin");
        if(data.basariliGiris) {
          return { success: true };
        } else {
          return { success: false, error: 'An error occurred' };
        }
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  };

  // AWS
  const searchBar = async (searchText) => {
   try {
      const response = await fetch('https://jvd7ru74z6.execute-api.eu-north-1.amazonaws.com/cloudproject/kullanici/filtrele', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "searchText": searchText,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.body)
        return data.body;
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  };

  // Firebase
  const onResult = async (querySnapshot) => {
    console.log('Got updates for the "satistaki-urunler" collection.');

    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      querySnapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          await notifee.displayNotification({
            title: 'Yeni Ürünler Eklendi',
            body: change.doc.data().restoran_isim + " restoranı " + change.doc.data().urun_isim + " ekledi.",
            android: {
              channelId,
            },
          });
          console.log('New product added:', change.doc.data().restoran_isim);
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function onError(error) {
    console.error('Error while listening to "satistaki-urunler" collection:', error);
  }

  firestore().collection('satistaki-urunler').onSnapshot(onResult, onError);

  // Firebase
  const support = async (email, text) => {
    try {
      const urun_kodu = Math.floor(Math.random() * 9000000000) + 1000000000;

      await firestore()
        .collection('destek')
        .doc(email)
        .set({
          [urun_kodu]: text,
        });
      return true;
    } catch (error) {
      return error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, getRestaurant, getUrunler, register, searchBar, support, error, restaurantData }}>
      {children}
    </AuthContext.Provider>
  );
};
