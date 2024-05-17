import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserProfileInf from './screens/UserProfileInf';
import Support from './screens/Support';
import ResetPass from './screens/ResetPass';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardScreen from './screens/OnboardScreen';
import BottomTabBarOld from './components/BottomTabBarOld';
import SearchScreen from './screens/SearchScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urunler from './screens/Urunler';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabGroup() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // Hide the header for all tabs
            }}
            tabBar={props => <BottomTabBarOld {...props} />}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeScreen}
                options={{ tabBarIcon: 'home-outline' }} // Specify the icon name for the Home tab
            />
            <Tab.Screen
                name="SearchStack"
                component={SearchScreen}
                options={{ tabBarIcon: 'search' }} // Specify the icon name for the Profile tab
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsScreen}
                options={{ tabBarIcon: 'settings-outline' }} // Specify the icon name for the Settings tab
            />
        </Tab.Navigator>
    );
}

function StackGroup() {
    const [initialRouteName, setInitialRouteName] = useState(null);

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('authToken');
            console.log(value);
            console.log('isOnboardingCompleted Value: ', value, '\n', ' ');

            if (value !== null) {
                setInitialRouteName('HomeTab');
            } else {
                setInitialRouteName('OnBoarding');
            }
        } catch (error) {
            console.warn('Error @checkOnboarding: ', error);
        }
    };

    // TODO: - check if user is logged in and add loading screen
    if (initialRouteName === null) return <></>;

    return (
        <Stack.Navigator
            screenOptions={{
                headerBackVisible: false,
                headerShadowVisible: false,
                headerTitle: " ",
                headerStyle: {
                    
                },
                
            }}
            initialRouteName={initialRouteName}
        >
            <Stack.Screen options={{ headerShown: false }} name="OnBoarding" component={OnboardScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false }} name="HomeTab" component={TabGroup} />
            <Stack.Screen options={{ headerShown: false }} name="Urunler" component={Urunler} />
            <Stack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfileInf} />
            <Stack.Screen options={{ headerShown: false }} name="ResetPass" component={ResetPass} />
            <Stack.Screen options={{ headerShown: false }} name="Support" component={Support} />
        </Stack.Navigator>
    );
}

function AppNavigatior() {
    return (
        <>
            <NavigationContainer>
                <StackGroup />
            </NavigationContainer>
        </>
    );
}

export default AppNavigatior;
