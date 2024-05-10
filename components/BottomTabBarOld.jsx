import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';

const windowWidth = Dimensions.get('window').width;

const BottomTabBarOld = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const { navigate } = useNavigation();
    const linePosition = useRef(new Animated.Value(0)).current;
    const numberOfTabs = state.routes.length; // Get the number of tabs

    useEffect(() => {
        Animated.timing(linePosition, {
            toValue: state.index * (windowWidth / numberOfTabs),
            duration: 175,
            useNativeDriver: false,
        }).start();
    }, [linePosition, state.index, numberOfTabs]);

    // Define interpolation for the color of the Animated.View
    const lineColor = linePosition.interpolate({
        inputRange: [0, windowWidth / 2],
        outputRange: ['#343434', '#343434'], // Change these colors as needed
    });

    const getIconColor = (isFocused) => {
        return isFocused ? '#fff' : '#000'; // White for focused tab, black for others
    };

    // Mapping of tab names to icon names
    const tabIconMap = {
        Home: 'arrow-back-circle',
        Profile: 'person-outline',
        Settings: 'settings-outline',
        // Add more tab names and their corresponding icon names here
    };

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={80} style={{ flexDirection: 'row', zIndex: 75, position: "absolute" }} className="bottom-0">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            zIndex: 100,
                            flex: 1,
                            flexDirection: 'column',
                            marginVertical: 18,
                            gap: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        key={route.name}
                    >
                        <Ionicons
                            name={options.tabBarIcon} // Use the icon name from the map
                            size={26}
                            color={getIconColor(isFocused)} // Dynamic color based on tab focus
                        />
                    </TouchableOpacity>
                );
            })}
            <Animated.View
                style={{
                    zIndex: 85,
                    position: 'absolute',
                    height: 35,
                    bottom: 14,
                    left: -33,
                    borderRadius: 100,
                    width: windowWidth / (numberOfTabs * 1.65), // Adjust width based on the number of tabs
                    marginHorizontal: 60,
                    backgroundColor: lineColor,
                    opacity: 0.7,
                    transform: [{ translateX: linePosition }],
                }}
            />
        </BlurView>
    );
};

export default BottomTabBarOld;