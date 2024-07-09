import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ResultScreen = ({ route }) => {
  const { response, imageUris } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageWrapper}>
        <FlatList
          data={imageUris}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          style={styles.flatList}
        />
        <View style={styles.dotsContainer}>
          {imageUris.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: currentIndex === index ? 1 : 0.5 },
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{response}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageWrapper: {
    width: width,
    height: (width * 3) / 4,
    marginBottom: 20,
  },
  imageContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: (width * 0.8 * 3) / 4,
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#6200EE",
    margin: 5,
  },
  resultContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6200EE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  flatList: {
    height: (width * 3) / 4,
  },
});

export default ResultScreen;
