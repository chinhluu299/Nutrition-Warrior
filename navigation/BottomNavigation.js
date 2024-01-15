import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "../screens/homescreen";
import MyAnalyticsScreen from "../screens/myanalyticscreen";
import { Colors } from "../resources/Colors";
import ExerciseScreen from "../screens/exercisescreen";

//Screen names
const homeName = "Home";
const analyticName = "Analytics";
const exerciseName = "Exercise";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === exerciseName) {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (rn === analyticName) {
            iconName = focused ? "analytics" : "analytics-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: "flex",
            height: 60,
            padding: 10,
            borderRadius: 5,
          },
          null,
        ],
      })}
      // tabBarOptions={{
      //   activeTintColor: "tomato",
      //   inactiveTintColor: "grey",
      //   labelStyle: { paddingBottom: 10, fontSize: 10 },
      //   style: { padding: 10, height: 100 },
      // }}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={exerciseName}
        component={ExerciseScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={analyticName}
        component={MyAnalyticsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
