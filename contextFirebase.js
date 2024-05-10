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


  const getRestaurant = async (sehir) => {
    try {
      const snapshot = await firestore()
        .collection('restoranlar')
        .where('sehir', '==', sehir)
        .get();

      if (snapshot.empty) {
        console.log('Bu şehirde restoran bulunmamaktadır.');
        return [];
      }

      const fetchedRestaurants = await Promise.all(snapshot.docs.map(async (doc) => {
        const logo = doc.data().restoran_isim + '/logo.jpg';
        const header = doc.data().restoran_isim + '/header.jpg';
        const logo_ref = storage().ref(logo);
        const header_ref = storage().ref(header);
        const [logo_url, header_url] = await Promise.all([
          logo_ref.getDownloadURL(),
          header_ref.getDownloadURL()
        ]);

        return {
          id: doc.id,
          data: doc.data(),
          logoUrl: logo_url,
          headerUrl: header_url
        };
      }));

      setRestaurantData(fetchedRestaurants);

      return fetchedRestaurants;

    } catch (error) {
      console.error('Hata:', error);
      return [];
    }
  };


  const getUrunler = async (restoran_kodu) => {
    try {

      const snapshot = await firestore()
        .collection('satistaki-urunler')
        .where('restoran_kodu', '==', restoran_kodu)
        .get();

      if (snapshot.empty) {
        console.log('Bu restoranda ürün bulunmamaktadır.');
        return [];
      }

      const fetchedRestaurants = await Promise.all(snapshot.docs.map(async (doc) => {
        console.log(doc.id, ' => ', doc.data());
        const urun = doc.data().restoran_isim + '/urunler/' + doc.data().urun_isim + ".jpg";
        const logo = doc.data().restoran_isim + '/logo.jpg';
        console.log(urun);
        const logo_ref = storage().ref(logo);
        const urun_ref = storage().ref(urun);
        const [urun_url, logo_url] = await Promise.all([
          urun_ref.getDownloadURL(),
          logo_ref.getDownloadURL()
        ]);

        const restoranSnapshot = await firestore()
          .collection('restoranlar')
          .where('restoran_kodu', '==', doc.data().restoran_kodu)
          .get();

        let lat = null;
        let lng = null;
        if (!restoranSnapshot.empty) {
          const restoranData = restoranSnapshot.docs[0].data();
          console.log('Restoran Data:', restoranData.lat, restoranData.lng);
          lat = restoranData.lat;
          lng = restoranData.lng;
        }

        return {
          id: doc.id,
          data: doc.data(),
          urunfoto_Url: urun_url,
          logo_Url: logo_url,
          lat: lat,
          lng: lng
        };
      }));

      setUrunlerData(fetchedRestaurants);

      return fetchedRestaurants;


    } catch (error) {
      console.error('Hata:', error);
      return [];
    }
  };

  const register = async (email, password, isim, soyisim) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      console.log('User account created & signed in!');

      await firestore()
        .collection('kullanicilar')
        .doc(email)
        .set({
          isim: isim,
          soyisim: soyisim,
          email: email,
        });

      AsyncStorage.setItem("kullaniciAd", isim)
      AsyncStorage.setItem("soyisim", soyisim)
      AsyncStorage.setItem("email", email)

      return { isim: isim, soyisim: soyisim, email: email };

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return ('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        return ('That email address is invalid!');
      } else {
        return (error);
      }
    }
  };


  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      const documentSnapshot = await firestore()
        .collection('kullanicilar')
        .doc(email)
        .get();

      if (documentSnapshot.exists) {
        AsyncStorage.setItem("kullaniciAd", documentSnapshot.data().isim)
        AsyncStorage.setItem("soyisim", documentSnapshot.data().soyisim)
        AsyncStorage.setItem("email", documentSnapshot.data().email)

        return true;
      } else {
        throw new Error('Belirtilen kullanıcı bulunamadı.');
      }
    } catch (error) {
      return error;

    }
  };

  const searchBar = async (searchText) => {
    try {
      const querySnapshot = await firestore()
        .collection('satistaki-urunler')
        .where('urun_isim', '>=', searchText)
        .where('urun_isim', '<=', searchText + '\uf8ff')
        .get();

      if (querySnapshot.empty) {
        console.log('Arama sonuçları bulunamadı.');
        return [];
      }

      const results = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const urun = doc.data().restoran_isim + '/urunler/' + doc.data().urun_isim + ".jpg";
        const logo = doc.data().restoran_isim + '/logo.jpg';
        const logo_ref = storage().ref(logo);
        const urun_ref = storage().ref(urun);
        const [urun_url, logo_url] = await Promise.all([
          urun_ref.getDownloadURL(),
          logo_ref.getDownloadURL()
        ]);

        return {
          id: doc.id,
          data: doc.data(),
          urunfoto_Url: urun_url,
          logo_Url: logo_url
        };
      }));

      return results;
    } catch (error) {
      console.error('Hata:', error);
      return [];
    }
  };



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
