import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "../screens/searchscreen";

// Screens
import HomeScreen from "../screens/homescreen";
import MyAnalyticsScreen from "../screens/myanalyticscreen";
import { Colors } from "../resources/Colors";
import ExerciseScreen from "../screens/exercisescreen";
import ScanScreen from "../screens/scanscreen";
import { View, TouchableOpacity } from "react-native";

//Screen names
const homeName = "Home";
const analyticName = "Analytics";
const exerciseName = "Exercise";
const searchName = "Search";
const scanName = "Scan";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -7,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 20,
      marginRight: 20,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
      }}
    >
      <Ionicons name="scan" size={30} style={{ color: Colors.darker }} />
    </View>
  </TouchableOpacity>
);

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
          } else if (rn === searchName) {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === scanName) {
            iconName = focused ? "scan" : "scan-outline";
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
        ],
      })}
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
        name={scanName}
        component={ScanScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={analyticName}
        component={MyAnalyticsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={searchName}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
