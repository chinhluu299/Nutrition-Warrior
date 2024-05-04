import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { styles } from "./style";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StoryColletions } from "../../static/StoryCollections";
import StoryList from "../../components/StoryList";

const StoryScreen = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const [current, setCurrent] = useState(1);
  const [stories, setStories] = useState([]);

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

  useEffect(() => {
    setStories(StoryColletions);
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
