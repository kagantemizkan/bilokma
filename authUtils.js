import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email, sifre) => {
  try {
    const response = await fetch('https://jvd7ru74z6.execute-api.eu-north-1.amazonaws.com/cloudproject/kullanici/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": sifre
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      if(data.basariliGiris) {
        await AsyncStorage.setItem('authToken', data.userData.email);
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

export const registerUser = async (ad, soyad, email, password) => {
  try {
    const response = await fetch("https://jvd7ru74z6.execute-api.eu-north-1.amazonaws.com/cloudproject/kullanici/addUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "isim": ad,
        "soyisim": soyad,
        "email": email,
        "password": password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      await AsyncStorage.setItem('authToken', data.email);
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'An error occurred' };
  }
};

export const checkAuthStatus = async () => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    return !!authToken; // Return true if authToken exists, false otherwise
  } catch (error) {
    return false;
  }
};
