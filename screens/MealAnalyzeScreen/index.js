import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { width } = Dimensions.get("window");

function base64ToGenerativePart(base64, mimeType) {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const MealAnalyzeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [imageUris, setImageUris] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUris((prevUris) => [...prevUris, result.assets[0].uri]);
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUris((prevUris) => [...prevUris, result.assets[0].uri]);
    }
  };

  const API_KEY = "AIzaSyB-ZAPGcMZfqZPUHSi6oszgvWCiOAVWBsg";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleAnalyze = async () => {
    setLoading(true);
    const prompt = `**Analyze the image:**

* Identify all food items present in the image.
* For each food item:
  * Estimate the portion size.
  * Provide a general nutritional breakdown (calories, carbohydrates, protein, fat, fiber).
  * Indicate if the food is a good source of any specific vitamins or minerals.
* If the image does not  contain any food, state "The image does not contain any food items."

**Example output:**

The image shows a plate with a medium-sized grilled salmon fillet (approximately 150g), a side of roasted broccoli (approximately 1 cup), and a small bowl of brown rice (approximately 1/2 cup).

- Salmon (150g): Calories: 250, Protein: 30g, Fat: 12g, Carbohydrates: 0g, Fiber: 0g. Salmon is a good source of omega-3 fatty acids, vitamin D, and selenium.
- Broccoli (1 cup): Calories: 50, Protein: 4g, Fat: 0.5g, Carbohydrates: 10g, Fiber: 2.5g. Broccoli is a good source of vitamin C, vitamin K, and folate.
- Brown rice (1/2 cup): Calories: 100, Protein: 5g, Fat: 1g, Carbohydrates: 20g, Fiber: 2g. Brown rice is a good source of fiber and complex carbohydrates.

Overall, this meal provides a good balance of protein, healthy fats, carbohydrates, and fiber. It is also a good source of omega-3 fatty acids, vitamin C, vitamin D, vitamin K, selenium, and folate.**`;
    const advicePrompt = `Based on the identified food items in the image and their nutritional content, analyze whether the meal provides a balanced and complete nutritional intake.

* If the meal is adequate, state that it provides a good balance of nutrients.
* If the meal lacks some essential vitamins or minerals, identify the missing nutrients and suggest specific food sources rich in those nutrients.

**Example output:**

This meal appears to be a well-balanced and nutritious choice. However, it might be beneficial to include a source of vitamin A, such as carrots, oranges, or leafy greens.

- Additional tips:

* Consider adding a disclaimer that the provided information is for general informational purposes and should not substitute professional dietary advice. Remember to response with readable formatting`;
    try {
      const imageParts = await Promise.all(
        imageUris.map(async (uri) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const base64 = await blobToBase64(blob);
          return base64ToGenerativePart(base64, blob.type);
        })
      );

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response.text();
      console.log("🚀 ~ handleAnalyze ~ response:", response);

      setTimeout(() => {
        setLoading(false);
        navigation.navigate("ResultScreen", { response, imageUris });
      }, 2000);
    } catch (error) {
      console.error("Error analyzing images:", error);
      setLoading(false);
      alert("There was an error analyzing the images. Please try again.");
    }
  };

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const removeImage = (index) => {
    setImageUris((prevUris) => prevUris.filter((_, i) => i !== index));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(index)}
      >
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.innerContainer}>
            <Button
              title="Select from Gallery"
              onPress={handleImagePicker}
              color="#6200EE"
            />
            <View style={styles.space} />
            <Button
              title="Take a Picture"
              onPress={handleCamera}
              color="#6200EE"
            />
            <View style={styles.space} />
            {imageUris.length > 0 ? (
              <View style={styles.carouselContainer}>
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
                <View style={styles.space} />
                <Button
                  title="Analyze"
                  onPress={handleAnalyze}
                  color="#6200EE"
                />
              </View>
            ) : (
              <Text style={styles.text}>No image selected</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    width: "100%",
  },
  space: {
    height: 10,
  },
  carouselContainer: {
    height: "70%",
    alignItems: "center",
    marginTop: 10,
  },
  flatList: {
    height: 220,
  },
  imageContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: (width * 0.8 * 3) / 4,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#6200EE",
    margin: 5,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default MealAnalyzeScreen;
