import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import MessageList from "../../components/MessageList";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import FollowList from "../../components/FollowList";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { Colors } from "../../resources/Colors";
import * as Clipboard from "expo-clipboard";

const FriendScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url } = route.params || {};
  const goBack = () => {
    navigation.goBack();
  };
  const userInfo = useSelector((state) => state.rootReducer.user);
  const [users, setUsers] = useState([]);
  const [isDeepLink, setIsDeepLink] = useState(false);
  const [deepLink, setDeepLink] = useState(false);

  const fetchFollowing = async () => {
    try {
      const res = await axios.get(
        "http://20.247.46.179:4007/api/v1/user/follow/" + userInfo.id
      );
      if (res.status == 200) {
        const data = res.data.data;
        setUsers(
          data.map((value, idx) => {
            return {
              id: value._id,
              name: value.name,
              avatar: value.photo,
              follow: true,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };
  const copyLink = async () => {
    await Clipboard.setStringAsync(
      "https://nw-service-linked.vercel.app/links/" + userInfo.id
    );
  };
  useEffect(() => {
    fetchFollowing();
  }, []);
  useEffect(() => {
    if (url) {
      setIsDeepLink(true);
    }
  }, [url]);
  const getUser = async (id) => {
    try {
      const res = await axios.get(
        `http://20.247.46.179:4007/api/v1/user/` + url
      );
      if (res.status == 200) {
        const data = res.data.data;
        setDeepLink({
          id: data._id,
          avatar: data.photo,
          name: data.name,
          follow: false,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isDeepLink && url) {
      getUser(url);
    }
  }, [isDeepLink]);
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("Follow", {}, { reset: true });
        }}
      >
        <Text style={styles.community}>More</Text>
      </TouchableOpacity> */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.back_control} onPress={goBack}>
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Following</Text>
      </View>
      <View>
        <FollowList users={users} setUsers={setUsers} />
      </View>
      <View style={styles.friend_refer}>
        <View style={styles.friend_refer_url}>
          <Text>
            {"https://nw-service-linked.vercel.app/links/" + userInfo.id}
          </Text>
        </View>
        <TouchableOpacity style={styles.copy} onPress={copyLink}>
          <Ionicons name="copy" size={30} color={Colors.primary_3} />
        </TouchableOpacity>
      </View>
      <Toast position="top" bottomOffset={30} />
      {deepLink && (
        <Pressable
          style={styles.deeplink}
          onPress={() => {
            setIsDeepLink(false);
          }}
        >
          <View style={styles.deeplink_container}>
            <View style={styles.messageAvatar}>
              <Image
                source={deepLink.avatar}
                resizeMode="cover"
                style={styles.content_author_image}
              />
              <View>
                <Text style={styles.author_name}>{deepLink.name}</Text>
              </View>
            </View>
            {deepLink.follow ? (
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
        </Pressable>
      )}
    </View>
  );
};
export default FriendScreen;
