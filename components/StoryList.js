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
import { CalculateDateAgo } from "../utils/dateUtils";
import { Colors } from "../resources/Colors";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StoryList = ({ stories, LoadMoreItem }) => {
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
              source={{ uri: item.mediaLoaded }}
              resizeMode="cover"
              style={styles.content_image}
            />
            <Text style={styles.content_image_content}>{item.content}</Text>
            
          </View>
          <View style={styles.content_author}>
            <View style={styles.content_author_1}>
              <Image
                source={item.author && {uri: item.author.photo}}
                resizeMode="cover"
                style={styles.content_author_image}
              />
              <Text style={styles.content_author_text}>
                {item.author && item.author.name}
              </Text>
            </View>
            <Text style={styles.content_author_2}>
              {CalculateDateAgo(item.time)}
            </Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item._id}
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
  content_image_content: {
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.35)",
    color:'#FFF',
    position: "absolute",
    bottom: 10,
    left: (width * 1) / 6,
    width: width * 1/2,
    textAlign: 'center',
    maxHeight: 100,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  content_author: {
    top: 75,
    height: 70,
    width: (width * 5) / 6,
    left: width / 12,
    borderRadius: 12,
    // backgroundColor: "#f5f5f5",
    backgroundColor: Colors.third,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  content_author_1: {
    alignItems: "center",
    flexDirection: "row",
  },
  content_author_image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  content_author_text: {
    fontSize: 16,
    fontWeight: "600",
    left: 10,
  },
});
export default StoryList;
