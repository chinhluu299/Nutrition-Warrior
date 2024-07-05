import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MessageList from "../../components/MessageList";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FollowList from "../../components/FollowList";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const FriendScreen = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const userInfo = useSelector((state) => state.rootReducer.user);
  const [users, setUsers] = useState([
  ]);

  const fetchFollowing = async () => {
    try {
      const res = await axios.get(
        "http://4.191.72.115:4007/api/v1/user/follow/" + userInfo.id
      );
      if (res.status == 200) {
        const data = res.data.data;
        setUsers(data.map((value,idx) => {
          return {
            id: value._id,
            name: value.name,
            avatar: value.photo,
            follow: true,
          };
        }))
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
    
  }

  useEffect(() => {
    fetchFollowing();
  },[])
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Follow", {}, { reset: true });
        }}
      >
        {/* <Text style={styles.community}>More</Text> */}
      </TouchableOpacity>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.back_control} onPress={goBack}>
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Following</Text>
      </View>
      <View>
        <FollowList users={users} setUsers={setUsers} />
      </View>
      <Toast position="top" bottomOffset={30} />
    </View>
  );
};
export default FriendScreen;
