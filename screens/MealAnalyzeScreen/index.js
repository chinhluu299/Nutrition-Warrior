import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Colors } from "../../resources/Colors";
import Back from "../../components/Back";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  const [analysis, setAnalysis] = useState("");
  const [advice, setAdvice] = useState("");

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

  const API_KEY = "AIzaSyBcDJy5RSggu9Y-_w76AD2raqOP6kavYCw";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleAnalyze = async () => {
    setLoading(true);
    const analysisPrompt = `Analyze the image and provide a detailed breakdown of the food items:

1. Identify all food items in the image.
2. For each food item:
   - Estimate the portion size
   - Provide nutritional information (calories, carbs, protein, fat, fiber)
   - List key vitamins and minerals

Format the response clearly with bullet points and sections for each food item.
If no food is present, state "No food items detected in the image."`;

    const advicePrompt = `Based on the food items identified, provide nutritional advice:

1. Evaluate if the meal is balanced and nutritionally complete.
2. Suggest improvements or additions if needed.
3. Highlight any potential health benefits or concerns.
4. Provide 2-3 quick tips for making the meal healthier.

Format the response with clear headings and bullet points for easy readability.
Note: This advice is for informational purposes and does not replace professional dietary guidance.`;

    try {
      const imageParts = await Promise.all(
        imageUris.map(async (uri) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const base64 = await blobToBase64(blob);
          return base64ToGenerativePart(base64, blob.type);
        })
      );

      const analysisResult = await model.generateContent([
        analysisPrompt,
        ...imageParts,
      ]);
      let analysisResponse = await analysisResult.response.text();
      analysisResponse = analysisResponse.replace(/[*#]/g, "");
      setAnalysis(analysisResponse);

      const adviceResult = await model.generateContent([
        advicePrompt,
        analysisResponse,
      ]);
      let adviceResponse = await adviceResult.response.text();
      adviceResponse = adviceResponse.replace(/[*#]/g, "");
      setAdvice(adviceResponse);
      console.log("🚀 ~ handleAnalyze ~ adviceResponse:", adviceResponse);
      console.log("🚀 ~ handleAnalyze ~ analysisResponse:", analysisResponse);
      setLoading(false);
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
        <Icon name="close" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleImagePicker}
              >
                <Icon name="photo-library" size={24} color="white" />
                <Text style={styles.buttonText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCamera}>
                <Icon name="camera-alt" size={24} color="white" />
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
            </View>

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
                <TouchableOpacity
                  style={styles.analyzeButton}
                  onPress={handleAnalyze}
                >
                  <Text style={styles.analyzeButtonText}>Analyze</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.text}>No image selected</Text>
            )}

            {analysis && (
              <View style={styles.resultSection}>
                <Text style={styles.sectionTitle}>Analysis</Text>
                <Text style={styles.resultText}>{analysis}</Text>
              </View>
            )}

            {advice && (
              <View style={styles.resultSection}>
                <Text style={styles.sectionTitle}>Advice</Text>
                <Text style={styles.resultText}>{advice}</Text>
              </View>
            )}
          </>
        )}
      </View>
      {/* <Back backEvent={() => navigation.goBack()} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: "10%",
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  carouselContainer: {
    alignItems: "center",
    marginBottom: 20,
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary_2,
    margin: 4,
  },
  analyzeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  analyzeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  resultSection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.primary,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
export default MealAnalyzeScreen;
