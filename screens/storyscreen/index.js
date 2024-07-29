import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { styles } from "./style";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StoryColletions } from "../../static/StoryCollections";
import StoryList from "../../components/StoryList";
import axiosClient from "../../api/axiosClient";
import axios from "axios";
import LoadingLottie from "../../components/LoadingLottie";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

const StoryScreen = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const [current, setCurrent] = useState(1);
  const [stories, setStories] = useState([]);
  const [offset, setOffset] = useState(0);
  const [busy, setBusy] = useState(false);
  const baseUrl = "http://4.144.36.62:4007/api/v1/image/";
  const fetch = 10;
  const time = new Date();
  const userInfo = useSelector((state) => state.rootReducer.user);
  const nextHandle = () => {
    if (StoryColletions.length < current + 1) {
      setCurrent(current + 1);
    }
    setMedia(StoryColletions[current].image);
    setName(StoryColletions[current].setName);
    setAvatar(StoryColletions[current].avatar);
    setTimestamp(
      new Date().getTime() - StoryColletions[current].timestamp.getTime()
    );
  };
  const onPerson = () => {
    navigation.navigate("Profile", {}, { reset: true });
  }
  const LoadMoreItem = () => {
    setOffset(offset + fetch);
  };
  // useFocusEffect(useCallback(()=> {
  //   fetchStories();
  // },[offset]))
  useEffect(() => {
    fetchStories();
  }, [offset]);
  const goToUpstory = async () => {
    console.log("co bam duoc");
    navigation.navigate("UpStory", {}, { reset: true });
  };
  const fetchStories = async () => {
    try {
      const res = await axios.post(
        "http://4.144.36.62:4007/api/v1/story/seek",
        {
          userId: userInfo.id,
          limit: fetch,
          offset: offset,
          time: time,
        }
      );

      if (res.status === 200) {
        if (res.data.success) {
          const data = res.data.data;
          if (data.length == 0) return;
          for (var val of data) {
            const media = val.media;
            val.mediaLoaded = baseUrl + media;
            // val.author.photo = baseUrl + val.author.photo;
          }
          setStories([...stories, ...data]);
        }
        console.log(stories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   //setStories(StoryColletions);
  //   fetchStories();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity onPress={() => navigation.navigate("Friend",{},{reset:true})}>
          <Ionicons name="people" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.upStory} onPress={goToUpstory}>
          <Text style={styles.upStory_text}>Up story</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPerson}>
          <Ionicons name="person" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <StoryList stories={stories} LoadMoreItem={LoadMoreItem} />
        {/* {stories.length > 0 && (
          <View style={styles.content_comment}>
            <TextInput
              style={styles.content_comment_input}
              placeholder="Comment"
              value={comment}
              onChangeText={(text) => setComment(text)}
              editable={true}
            />
            <Ionicons name="send" style={styles.content_comment_icon} />
          </View>
        )} */}
      </View>
    </View>
  );
};

export default StoryScreen;
