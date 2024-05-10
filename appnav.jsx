import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserProfileInf from './screens/UserProfileInf';
import Support from './screens/Support';
import ResetPass from './screens/ResetPass';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardScreen from './screens/OnboardScreen';
import { checkAuthStatus } from './authUtils';
import { Text } from 'react-native';
import BottomTabBarOld from './components/BottomTabBarOld';
import SearchScreen from './screens/SearchScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
                component={HomeStack}
                options={{ tabBarIcon: 'home-outline' }} // Specify the icon name for the Home tab
            />
            <Tab.Screen
                name="SearchStack"
                component={SearchStack}
                options={{ tabBarIcon: 'search' }} // Specify the icon name for the Profile tab
            />

            <Tab.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{ tabBarIcon: 'settings-outline' }} // Specify the icon name for the Settings tab
            />
        </Tab.Navigator>
    )
}

function StackGroup() {

    const [initialRouteName, setInitialRouteName] = useState(null)

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('isOnboardingCompleted');

            console.log('isOnboardingCompleted Value: ', value, '\n', " ")

            if (value !== null) {
                setInitialRouteName('HomeTab')
            } else {
                setInitialRouteName('OnBoarding')
            }
        } catch (error) {
            console.warn('Error @checkOnboarding: ', error);
        }
    }
    // TODO: - check if user is logged in and add loading screen
    if (initialRouteName === null) return (<></>)

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName={initialRouteName}
        >
            <Stack.Screen name="OnBoarding" component={OnboardScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />

            <Stack.Screen name="HomeTab" component={TabGroup} />
            <Stack.Screen name="Collection" component={UserProfileInf} />
            <Stack.Screen name="Apperance" component={ResetPass} />
            <Stack.Screen name="AppIconChage" component={Support} />
        </Stack.Navigator>
    )
}


export default function AppNavigator() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        const isAuthenticated = await checkAuthStatus();
        setUserLoggedIn(isAuthenticated);
        setIsLoading(false);
    };
}

export default function AppNavigatior() {
    return (
        <>
            <NavigationContainer>
                <StackGroup />
            </NavigationContainer>
            <Toasts />
        </>
    )
}