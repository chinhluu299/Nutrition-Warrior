import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../resources/Colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const FollowList = ({ users, setUsers }) => {
  const userInfo = useSelector((state) => state.rootReducer.user);
  const FollowHandle = async (val) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === val.id ? { ...user, follow: !user.follow } : user
      )
    );
    try {
      console.log({
        userId: userInfo.id,
        targetId: val.id,
      });
      await axios.post("http://20.247.46.179:4007/api/v1/user/follow", {
        userId: userInfo.id,
        targetId: val.id,
      });
    } catch (error) {
      console.log("Delete friend " + error);
    }
  };
  const UnfollowHandle = async (val) => {
    console.log({
      userId: userInfo.id,
      targetId: val.id,
    });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === val.id ? { ...user, follow: !user.follow } : user
      )
    );
    try {
      await axios.request({
        method: "delete",
        url: "http://20.247.46.179:4007/api/v1/user/follow",
        data: {
          userId: userInfo.id,
          targetId: val.id,
        },
      });
    } catch (error) {
      console.log("Delete friend " + error);
    }
  };
  const pingHandle = async () => {
    //const res = await axios.post("/")
  };
  return (
    <FlatList
      data={users}
      showsVerticalScrollIndicator={false}
      renderItem={({ index, item }) => (
        <View style={styles.messageItem}>
          <View style={styles.messageAvatar}>
            <Image
              source={{ uri: item.avatar }}
              resizeMode="cover"
              style={styles.content_author_image}
            />
            <View>
              <Text style={styles.author_name}>{item.name}</Text>
            </View>
          </View>
          <View>
            {/* <TouchableOpacity style={styles.unfollow_button} onPress={pingHandle}>
              <Text style={styles.unfollow_text}>Ping</Text>
            </TouchableOpacity> */}
            {item.follow ? (
              <TouchableOpacity
                style={styles.unfollow_button}
                onPress={() => UnfollowHandle(item)}
              >
                <Text style={styles.unfollow_text}>Unfollow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.follow_button}
                onPress={() => FollowHandle(item)}
              >
                <Text style={styles.follow_text}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  messageAvatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    marginLeft: 12,
  },
  author_name: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: Colors.primary_3,
  },
  follow_button: {
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 20,
    width: 110,
    backgroundColor: Colors.primary_2,
    borderWidth: 2,
    borderColor: Colors.primary_2,
  },
  unfollow_button: {
    width: 110,
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.primary_2,
  },
  unfollow_text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary_2,
    textAlign: "center",
  },
  follow_text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
    textAlign: "center",
  },
  content_author_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default FollowList;
