import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MessageList from "../../components/MessageList";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { name: "Chinh luu", text: "Anh yeuu", timestamp: "20-09-2024 5:00 PM" },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
    {
      name: "Huy nguyen",
      text: "Mau check tin nhan cua em di anh oi",
      timestamp: "20-09-2024 10:00 AM",
    },
  ]);
  const navigation = useNavigation();
  const selectChat = () => {
    navigation.navigate("MessageScreen", {}, { reset: true });
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.back_control} onPress={goBack}>
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Messages</Text>
      </View>

      <MessageList messages={messages} itempress={selectChat} />
    </View>
  );
};
export default ChatScreen;
