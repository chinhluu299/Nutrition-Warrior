import { useNavigation } from "@react-navigation/native";
//import { styles } from "../screens/storyscreen/style";
import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StoryList = ({ stories, LoadMoreItem }) => {
  const itemRef = useRef(null);

  return (
    <FlatList
      data={stories}
      showsHorizontalScrollIndicator={false}
      horizontal
      pagingEnabled
      bounces={false}
      onEndReached={LoadMoreItem}
      onEndReachedThreshold={2}
      renderItem={({ index, item }) => (
        <View style={styles.content_item}>
          <View style={styles.content_image_video}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.content_image}
            />
          </View>
          <View style={styles.content_author}>
            <View style={styles.content_author_1}>
              <Image
                source={item.avatar}
                resizeMode="cover"
                style={styles.content_author_image}
              />
              <Text style={styles.content_author_text}>{item.name}</Text>
            </View>
            <Text style={styles.content_author_2}>{item.timestamp} ago</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
const styles = StyleSheet.create({
  content_item: {
    width: width,
  },
  content_image_video: {
    width: (width * 5) / 6,
    height: (width * 5) / 6,
    top: height / 12,
    left: width / 12,
    borderRadius: 24,
    backgroundColor: "black",
    overflow: "hidden",
  },
  content_image: {
    width: (width * 5) / 6,
    height: (width * 5) / 6,
  },
  content_author: {
    top: 75,
    height: 70,
    width: (width * 5) / 6,
    left: width / 12,
    borderRadius: 12,
    backgroundColor: "lightgray",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content_author_1: {
    alignItems: "center",
    flexDirection: "row",
  },
  content_author_image: {
    width: 50,
    height: 50,
  },
  content_author_text: {
    fontSize: 16,
    fontWeight: "600",
    left: 10,
  },
});
export default StoryList;
