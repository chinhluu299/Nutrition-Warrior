import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FoodNutrient = ({ protein, fat, fiber, carb, kcal }) => {
  return (
    <View style={styles.info_analytics}>
      <View style={styles.info_analytics_item}>
        <View
          style={[styles.info_analytics_protein_per, { flex: protein }]}
        ></View>
        <View style={[styles.info_analytics_fiber_per, { flex: fiber }]}></View>
        <View style={[styles.info_analytics_carbs_per, { flex: carb }]}></View>
        <View style={[styles.info_analytics_fat_per, { flex: fat }]}></View>
      </View>
      <View style={styles.info_analytics_item}>
        <View style={styles.info_analytics_item_left}>
          <View style={styles.info_analytics_item_color_protein}></View>
          <Text style={styles.info_analytics_item_type}>Protein</Text>
        </View>
        <Text style={styles.info_analytics_item_figure}>{protein}g</Text>
      </View>
      <View style={styles.info_analytics_item}>
        <View style={styles.info_analytics_item_left}>
          <View style={styles.info_analytics_item_color_fiber}></View>
          <Text style={styles.info_analytics_item_type}>Dietary fiber</Text>
        </View>
        <Text style={styles.info_analytics_item_figure}>{fiber}g</Text>
      </View>
      <View style={styles.info_analytics_item}>
        <View style={styles.info_analytics_item_left}>
          <View style={styles.info_analytics_item_color_carbs}></View>
          <Text style={styles.info_analytics_item_type}>Carbs</Text>
        </View>
        <Text style={styles.info_analytics_item_figure}>{carb}g</Text>
      </View>
      <View style={styles.info_analytics_item}>
        <View style={styles.info_analytics_item_left}>
          <View style={styles.info_analytics_item_color_fat}></View>
          <Text style={styles.info_analytics_item_type}>Fat</Text>
        </View>
        <Text style={styles.info_analytics_item_figure}>{fat}g</Text>
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
        <Text style={styles.info_analytics_item_figure}>{kcal} Kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info_analytics: {
    // flex: 1,
    // marginTop: 15,
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
  info_analytics_fiber_per: {
    flex: 0.5,
    height: 5,
    backgroundColor: "#a1def5",
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
  info_analytics_item_color_fiber: {
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: "#a1def5",
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
});

export default FoodNutrient;
