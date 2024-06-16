import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { styles } from "./style";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StoryColletions } from "../../static/StoryCollections";
import StoryList from "../../components/StoryList";
import axiosClient from "../../api/axiosClient";
import axios from "axios";

const StoryScreen = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const [current, setCurrent] = useState(1);
  const [stories, setStories] = useState([]);
  const [offset, setOffset] = useState(0);

  const fetch = 10;
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

  const LoadMoreItem = () => {
    console.log("1111");
  };
  const fetchStories = async () => {
    try {
      console.log("dang load");
      console.log("chay lau vai l");
      const res = await axios.post(
        "https://8eb5-14-241-170-199.ngrok-free.app/api/v1/story/seek",
        {
          userId: "665c21d58dd162b8026b3763",
        }
      );
      console.log("chay xong roio");
      console.log(res);

      if (res.status === 200) {
        if (res.data.success) {
          const data = res.data.data;
          for (var val of data) {
            const media = val.media;
            val.mediaLoaded =
              "https://8eb5-14-241-170-199.ngrok-free.app/api/v1/image/"+media;
            
          }
          setStories(data);
        }
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //setStories(StoryColletions);
    fetchStories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity>
          <Ionicons name="people" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbox" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <StoryList stories={stories} LoadMoreItem={LoadMoreItem} />
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
      </View>
    </View>
  );
};

export default StoryScreen;
