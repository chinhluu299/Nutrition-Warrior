import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const FoodScanComponent = ({ image, title, kcal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info_container}>
        <Image
          source={require("../assets/demo/burger.jpeg")}
          style={styles.info_image}
          resizeMode="stretch"
        ></Image>
        <View style={styles.info_info}>
          <Text style={styles.info_info_head}>Fast Food</Text>
          <Text style={styles.info_info_desc}>Kebab Burgers Maxi</Text>
        </View>
      </View>
      <View style={styles.info_analytics}>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_protein_per}></View>
          <View style={styles.info_analytics_carbs_per}></View>
          <View style={styles.info_analytics_fat_per}></View>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <View style={styles.info_analytics_item_color_protein}></View>
            <Text style={styles.info_analytics_item_type}>Protein</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>35g</Text>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <View style={styles.info_analytics_item_color_carbs}></View>
            <Text style={styles.info_analytics_item_type}>Carbs</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>20g</Text>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <View style={styles.info_analytics_item_color_fat}></View>
            <Text style={styles.info_analytics_item_type}>Fat</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>30g</Text>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <MaterialCommunityIcons
              name="fire-circle"
              size={20}
              color={"#FF4D00"}
            />
            <Text style={styles.info_analytics_item_type}>Calories</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>225Kcal</Text>
        </View>
      </View>
      <View
        style={[{ backgroundColor: "#D5D2D2" }, styles.info_search_container]}
      >
        <MaterialCommunityIcons
          size={60}
          name="text-search"
          color={Colors.secondary}
        ></MaterialCommunityIcons>
        <View style={styles.info_info}>
          <Text style={{ color: Colors.secondary }}>
            This is not what you want?{" "}
          </Text>
          <Text style={{ color: "black" }}>Search here</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info_search_container: {
    position: "absolute",
    height: 100,
    width: (width * 4) / 5,
    left: width / 10,
    bottom: 40,
    backgroundColor: "rgba(241,241,241,0.8)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
  },
  info_image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  info_info: {
    flex: 1,
    padding: 10,
  },
  info_info_head: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 5,
  },
  info_info_desc: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },

  info_analytics: {
    width: (width * 4) / 5,
    left: width / 10,
    marginTop: 30,
  },
  info_analytics_item: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
  },
  info_analytics_item_type: {
    fontWeight: "700",
    color: Colors.darker,
    marginLeft: 10,
  },
  info_analytics_item_figure: {
    fontWeight: "700",
    color: Colors.text,
    opacity: 0.6,
  },
  info_analytics_protein_per: {
    flex: 2,
    height: 5,
    backgroundColor: "#9EB386",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  info_analytics_carbs_per: {
    flex: 0.5,
    height: 5,
    backgroundColor: "#F4E3A9",
  },
  info_analytics_fat_per: {
    flex: 1,
    height: 5,
    backgroundColor: "#F0A2A3",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  info_analytics_item_left: {
    display: "flex",
    flexDirection: "row",
  },
  info_analytics_item_color_protein: {
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: "#9EB386",
    borderRadius: 4,
  },
  info_analytics_item_color_carbs: {
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: "#F4E3A9",
    borderRadius: 4,
  },
  info_analytics_item_color_fat: {
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: "#F0A2A3",
    borderRadius: 4,
  },
  info_container: {
    marginTop: 20,
    height: 100,
    width: (width * 4) / 5,
    left: width / 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
  },
});

export default FoodScanComponent;
