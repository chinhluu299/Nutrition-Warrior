import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Touchable, TextInput } from "react-native";
import MessageList from "../../components/MessageList";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FollowList from "../../components/FollowList";
import axios from "axios";
import { Colors } from "../../resources/Colors";

const FollowScreen = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [searchKey, setSearchKey]  = useState("");
  
  const [users,setUsers] = useState([
    {
      id: "1",
      name: "Keria",
      avatar:
        "https://354a-171-250-164-136.ngrok-free.app/api/v1/image/1718530184099-nw-beatiful-beach.jpeg",
      follow: false,
    },
    {
      id: "2",
      name: "3Ker",
      avatar:
        "https://354a-171-250-164-136.ngrok-free.app/api/v1/image/1718530184099-nw-beatiful-beach.jpeg",
      follow: true,
    },
  ]);
  const searchPeople = () => {
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.back_control} onPress={goBack}>
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>You can know?</Text>
      </View>
      <View>
        <FollowList users={users} setUsers={setUsers} />
      </View>
      <View style={styles.searchPeople}>
        <TextInput style={styles.searchInput} value={searchKey} onChangeText={(txt) => setSearchKey(txt)}/>
        <TouchableOpacity style={styles.searchIcon} onPress={searchPeople}>
          <Ionicons name="search-circle" size={50} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FollowScreen;
