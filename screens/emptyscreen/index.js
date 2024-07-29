import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const EmptyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.rootReducer.user.name);

  const logOut = async () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_USER" });
    navigation.reset({ routes: [{ name: "Login" }] });
  };

  const menuItems = [
    { icon: "message", text: "Advice", screen: "MessageScreen" },
    { icon: "food", text: "Analyze Meal", screen: "MealAnalyzeScreen" },
    { icon: "account", text: "Profile", screen: "Profile" },
    { icon: "speaker", text: "Feedback", screen: "Feedback" },
    { icon: "logout", text: "Logout", onPress: logOut },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={["#87D1D2", "#5FBFC0", "#3DADAE"]}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi, {userName}!</Text>
          <Text style={styles.subHeaderText}>
            What would you like to do today?
          </Text>
        </View>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() =>
                item.onPress ? item.onPress() : navigation.navigate(item.screen)
              }
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={30}
                  color="#3DADAE"
                />
              </View>
              <Text style={styles.menuItemText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87D1D2",
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#ffffff",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F7F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuItemText: {
    color: "#3DADAE",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default EmptyScreen;
