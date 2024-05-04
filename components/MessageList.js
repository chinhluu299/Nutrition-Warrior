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

const MessageList = ({ messages, itempress }) => {
  return (
    <FlatList
      data={messages}
      showsVerticalScrollIndicator={false}
      renderItem={({ index, item }) => (
        <TouchableOpacity
          onPress={itempress}
          style={styles.messageItem}
          key={index}
        >
          <View style={styles.messageAvatar}>
            <Image
              source={require("../static/image-social.jpeg")}
              resizeMode="cover"
              style={styles.content_author_image}
            />
            <View>
              <Text style={styles.messageName}>{item.name}</Text>
              <Text style={styles.messageText}>
                {item.text.length < 20
                  ? item.text
                  : item.text.substring(0, 19) + "..."}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
          </View>
        </TouchableOpacity>
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
    padding: 10,
    marginTop: 5,
  },
  messageAvatar: {
    flexDirection: "row",
  },
  messageText: {
    fontSize: 16,
    marginLeft: 12,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#999",
  },
  content_author_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default MessageList;
