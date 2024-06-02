import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import Instructor from "../../components/Instructor";

const EmptyScreen = () => {
  const image = require("../../assets/instructor/present-unscreen.gif")
  const contents = ["Hey, I'm Chinh. I am your instructor.", "Let's me give you some instructions"]
  const [status, setStatus] = useState("");
  return (
    <View style={styles.container}>
      <Instructor image={image} contents={contents} setStatus={setStatus}
      status={status}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})
export default EmptyScreen;
