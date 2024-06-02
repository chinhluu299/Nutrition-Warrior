import { useNavigation } from "@react-navigation/native";
//import { styles } from "../screens/storyscreen/style";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Instructor = ({ status, setStatus, image, contents }) => {
  const [current,setCurrent] = useState(0);
  const handlePress = () => {
    if(current < contents.length - 1){
      setCurrent(current + 1);
    }else{
      setStatus(false)
    }
  }

  return (
   status &&  
    <Pressable style={styles.container} onPress={handlePress}>
      <Image style={styles.image} source={image} resizeMode="contain" />
      <View style={styles.balloon}>
        <Text style={styles.text}>{contents[current]}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  image: {
    position: "absolute",
    bottom: (-2 / 5) * width,
    left: 0,
    width: (3 / 5) * width,
  },
  balloon: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 24,
    backgroundColor: "#FFF",
    borderRadius: 20,
    maxWidth: (3 / 4) * width,
    marginBottom: (1 / 10) * width,
    marginLeft: (1 / 5) * width,
  },
});
export default Instructor;
