import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ScanScreen from "./screens/scanscreen";
import SplashScreen from "./screens/splashscreen";
import * as Font from "expo-font";
import MyAnalyticsScreen from "./screens/myanalyticscreen";
import HomeScreen from "./screens/homescreen";
import SurveyScreen from "./screens/surveyscreen";
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./screens/searchscreen";
import LoginScreen from "./screens/loginscreen";
import RegisterScreen from "./screens/registerscreen";
import ForgotPasswordScreen from "./screens/forgotpassword";
import ExerciseScreen from "./screens/exercisescreen";
import ExerciseListScreen from "./screens/exerciselistscreen";
import ExerciseDetailScreen from "./screens/exercisedetailscreen";
import BottomNavigation from "./navigation/BottomNavigation";
import { Provider } from "react-redux";
import store from "./app/store";
import ProfileScreen from "./screens/profilescreen";
import TdeeScreen from "./screens/tdeescreen";
import MacroScreen from "./screens/macroscreen";
import MessageScreen from "./screens/MessageScreen";
import StoryScreen from "./screens/storyscreen";
import ChatScreen from "./screens/chatscreen";
import UpstoryScreen from "./screens/upstoryscreen";
import EmptyScreen from "./screens/emptyscreen";
import DoExerciseScreen from "./screens/doexercise";

const Stack = createNativeStackNavigator();

const userInfo = store.getState().rootReducer.user;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
        // initialRouteName={
        //   // userInfo.first_login == false ? "MainScreen" : "Splash"
        //   "Message"
        // }
        // initialRouteName={
        //   userInfo.first_login == false ? "MainScreen" : "Splash"
        // }
        >
          {/* <Stack.Screen
            name="EmptyScreen"
            component={EmptyScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="UpStory"
            component={UpstoryScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MessageScreen"
            component={MessageScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Story"
            component={StoryScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Macro"
            component={MacroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreen"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Survey"
            component={SurveyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Scan"
            component={ScanScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
        />*/}
          <Stack.Screen
            name="Exercise"
            component={ExerciseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExerciseDetail"
            component={ExerciseDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExerciseList"
            component={ExerciseListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoExercise"
            component={DoExerciseScreen}
            options={{ headerShown: false }}
          />
          {/*
          <Stack.Screen
            name="Analytic"
            component={MyAnalyticsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tdee"
            component={TdeeScreen}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
