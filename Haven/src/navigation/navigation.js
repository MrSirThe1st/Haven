import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../screens/TabScreens/Home";
import Profile from "../screens/TabScreens/Profile";
import Onboarding from "../screens/StackScreens/authentication/Onboarding";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/StackScreens/authentication/Login";
import SignUp from "../screens/StackScreens/authentication/SignUp";
import Settings from "../components/Settings";
import { useAuth } from "../auth/authContext";
import Delete from "../components/Delete";
import GoodBye from "../components/GoodBye";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Word"
      screenOptions={{
        tabBarActiveTintColor: "#7dac9a",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Word"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="cross"
              size={size}
              color={focused ? "#7dac9a" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="book-open"
              size={18}
              color={focused ? "#7dac9a" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("@onboarding_completed");
        if (value === null) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error reading data", error);
        setIsFirstLaunch(true);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Or a loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isFirstLaunch ? "Onboarding" : userLoggedIn ? "Tabs" : "Login"
        }
      >
        {isFirstLaunch ? (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        ) : userLoggedIn ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            {/* Add other authenticated screens like Settings, Goodbye, Delete */}
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="GoodBye"
              component={GoodBye}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Delete"
              component={Delete}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
