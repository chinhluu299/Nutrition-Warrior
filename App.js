import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Linking } from "react-native";
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
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import ProfileScreen from "./screens/profilescreen";
import TdeeScreen from "./screens/tdeescreen";
import MacroScreen from "./screens/macroscreen";
import MessageScreen from "./screens/MessageScreen";
import StoryScreen from "./screens/storyscreen";
import ChatScreen from "./screens/chatscreen";
import UpstoryScreen from "./screens/upstoryscreen";
import EmptyScreen from "./screens/emptyscreen";
import DoExerciseScreen from "./screens/doexercise";
import RecipeScreen from "./screens/foodrecipe";
import FollowScreen from "./screens/followscreen";
import FriendScreen from "./screens/friendscreen";
import MealAnalyzeScreen from "./screens/MealAnalyzeScreen";
import ResultScreen from "./screens/ResultScreen";
// import FeedbackScreen from "./screens/FeedbackScreen";
import { registerForPushNotificationsAsync } from "./utils/tokenRegister";
import * as Notifications from "expo-notifications";
import FeedbackScreen from "./screens/FeedbackScreen";

const Stack = createNativeStackNavigator();

const userInfo = store.getState().rootReducer.user;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const navigationRef = useRef();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  //const userInfo = useSelector((state) => state.rootReducer.user);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: " + token);
        dispatch({
          type: "UPDATE_PUSH_TOKEN",
          payload: {
            pushToken: token,
          },
        });
      })
      .catch((err) => console.log(err));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data: { screen },
              },
            },
          },
        } = response;

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
        if (screen) {
          props.navigation.navigate(screen);
        }

        ///console.log("handle deep link")
      });
    const handleDeepLink = (event) => {
      const url = handleUrl(event);
      if (url) {
        if (userInfo.id) {
          navigationRef.current?.navigate("Friend", { url: url });
        } else {
          navigationRef.current?.navigate("Login", { url: url });
        }
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    const subcription = Linking.addEventListener("url", handleDeepLink);
    return () => {
      // subcription.remove();
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const handleUrl = (event) => {
    const url = event.url;
    const id = url.match(/\/links\/(\d+)/)?.[1]; // Lấy ID từ URL
    if (id) {
      setInitialUrl(url);
      navigationRef.current?.navigate("Friend", { id });
    }
  };
  // useEffect(() => {

  //   return () => {
  //   };
  // }, []);

  return (
    // <Provider store={store}>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName={
        //   "Exercise"
        // }
        initialRouteName={
          userInfo && userInfo.first_login == false ? "MainScreen" : "Splash"
        }
      >
        {/* <Stack.Screen
            name="EmptyScreen"
            component={EmptyScreen}
            options={{ headerShown: false }}
          />  */}
        {/* <Stack.Screen
          name="Story"
          component={StoryScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="UpStory"
          component={UpstoryScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />

        {/* <Stack.Screen
            name="Follow"
            component={FollowScreen}
            options={{ headerShown: false }}
          /> */}
        <Stack.Screen
          name="Friend"
          component={FriendScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
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
          name="Recipe"
          component={RecipeScreen}
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
        />
        <Stack.Screen
          name="MealAnalyzeScreen"
          component={MealAnalyzeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="FeedbackScreen"
          component={FeedbackScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
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

        <Stack.Screen
          name="Analytic"
          component={MyAnalyticsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tdee"
          component={TdeeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
