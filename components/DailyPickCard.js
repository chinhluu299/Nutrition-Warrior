import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const DailyPickCard = ({ image, title, kcal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left_card}>
        <View style={styles.label}>
          <Text style={styles.label_text}>Daily pick</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        {/* <View style={styles.kcal}>
          <FontAwesome5 name="fire-alt" size={18} color={Colors.red} />
          <Text style={styles.kcal_text}>{kcal} Kcal</Text>
        </View> */}
      </View>
      <View style={styles.right_card}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.third,
  },
  left_card: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 15,
    paddingTop: 15,
  },
  right_card: {
    width: 150,
    backgroundColor: Colors.primary,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  label: {
    backgroundColor: Colors.primary,
    width: 100,
    alignItems: "center",
    padding: 2,
    borderRadius: 20,
    margin: 5,
  },
  label_text: {
    fontWeight: "800",
    color: Colors.text_white,
    //opacity: 0.7,
    fontSize: 12,
  },
  title: {
    flex: 1,
    marginHorizontal: 10,
    flexWrap:"wrap",
    fontWeight: "700",
    fontSize: 16,
    color: Colors.primary_3,
    opacity: 0.8,
  },
  kcal: {
    flex: 0.5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
  },
  kcal_text: {
    fontWeight: "700",
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    marginLeft: 5,
  },
});

export default DailyPickCard;
