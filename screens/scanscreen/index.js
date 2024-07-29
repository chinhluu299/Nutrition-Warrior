import "react-native-gesture-handler";

import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Easing,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
  Touchable,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { styles } from "./style";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../resources/Colors";
import FoodScanComponent from "../../components/FoodScanComponent";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import detectionApi from "../../api/detectionApi";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { ImageManipulator } from "expo-image-manipulator";
const setTimeout = global.setTimeout;

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

export default ScanScreen = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const bottomSheetModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const snapPoints = ["25%", "55%", "75%"];

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        console.log("picture source", source);
        setCapturedImage(source);
        setIsScanning(true);
        await callObjectDetectionApi(data);
      }
    }
  };

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }
  const callObjectDetectionApi = async (imageData) => {
    try {
      const response = await detectionApi.detectFood({
        image: {
          uri: imageData.uri,
          type: "image/jpeg",
          name: "captured_image.jpg",
        },
      });
      if (response.data.success) {
        console.log("🚀 ~ callObjectDetectionApi ~ data:", response.data);
        const detectedObjects = response.data.detected_objects;
        let containsUnderscore = false;
        if (
          response.data.detected_objects &&
          response.data.detected_objects.length > 0
        ) {
          detectedObjects.forEach((object) => {
            if (object[1].includes("_")) {
              containsUnderscore = true;
            }
          });
        }
        if (
          !containsUnderscore &&
          response.data.detected_objects &&
          response.data.detected_objects.length > 0 &&
          detectedObjects.some((object) => object[2] > 0.75)
        ) {
          navigation.navigate("Search", {
            detectedObjects: response.data.detected_objects,
          });
          console.log(
            "🚀 ~ callObjectDetectionApi ~ detected_objects:",
            response.data.detected_objects
          );
        } else {
          console.log("No objects detected, using gemini instead");
          const prompt = `
Analyze the given image and identify all the food items present. Return the results in the following JSON format:
- If no food items are detected:
{
  "detected_objects": [],
  "message": "Object detection successful",
  "success": true
}
- If food items are detected, use this format:
{
  "detected_objects": [
    [null, "Name of the food item", null]
    ...
  ],
  "message": "Object detection successful",
  "success": true
}
Ensure that each detected food item appears only once in the "detected_objects" array, even if it is detected multiple times in the image. Replace "Name of the food item" with the actual detected food item name. The first and third values in the "detected_objects" array can be null.
`;

          try {
            const API_KEY = "AIzaSyB-ZAPGcMZfqZPUHSi6oszgvWCiOAVWBsg";
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({
              model: "gemini-1.5-flash",
            });
            const response = await fetch(imageData.uri);
            const blob = await response.blob();
            const base64 = await blobToBase64(blob);
            const imagePart = base64ToGenerativePart(base64, blob.type);

            const result = await model.generateContent([prompt, imagePart]);
            const analysisResponse = JSON.parse(await result.response.text());
            console.log(
              "🚀 ~ handleAnalyze ~ detected_objects:",
              analysisResponse.detected_objects
            );

            if (analysisResponse.detected_objects.length <= 0) {
              handlePresentModal();
            } else {
              navigation.navigate("Search", {
                detectedObjects: analysisResponse.detected_objects,
              });
            }
          } catch (error) {
            handlePresentModal();
            setIsScanning(false);
          }
        }
        setIsScanning(false);
      } else {
        console.error(response.data.message);
      }

      setIsScanning(false);
    } catch (error) {
      console.error(error.message);
      setIsScanning(false);
    }
  };

  useEffect(() => {
    getPermissionAsync();
    startAnimation();
    console.log("Start animation");
  });
  const onCameraReady = () => {
    setTimeout(async () => {
      await takePicture();
    }, 2000);
  };
  const getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  //animation
  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };
  const openSearchFood = () => {
    //result == null ? setResult(1) : setResult(null);
    navigation.navigate("Search");
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [(width * 4) / 5, 0],
  });
  //
  const renderCameraButton = () => {
    if (!isScanning) {
      return (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
          disabled={isScanning}
        >
          <Ionicons name="camera" size={50} color="white" />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <ActivityIndicatorLoadingPage isBusy={isBusy} type={1} />
            <Camera
              style={styles.camera}
              type={cameraType}
              ref={cameraRef}
              onCameraReady={onCameraReady}
            >
              {/* <View style={styles.controls}>
                <TouchableOpacity style={styles.back_control}>
                  <Ionicons
                    name="arrow-back"
                    style={styles.back_control_icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.info_control}>
                  <SimpleLineIcons
                    name="energy"
                    style={styles.info_control_icon}
                  />
                </TouchableOpacity>
              </View> */}
              <View style={styles.scanning_block}>
                {isScanning && (
                  <Text style={styles.scanning_text}>Scanning...</Text>
                )}
              </View>
              <View style={styles.scan}>
                <View style={styles.scan_top_left}></View>
                <View style={styles.scan_top_right}></View>
                <View style={styles.scan_bottom_left}></View>
                <View style={styles.scan_bottom_right}></View>
                <Animated.View
                  style={[styles.scan_effect, { transform: [{ translateY }] }]}
                >
                  <LinearGradient
                    colors={["rgba(255,255,255,0.5)", "transparent"]}
                    stops={[0, 1]}
                    style={styles.scan_effect_background}
                  />
                </Animated.View>
              </View>
              {renderCameraButton()}
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 50 }}
                onDismiss={() => setIsOpen(false)}
              >
                {result != null ? (
                  <FoodScanComponent />
                ) : (
                  <View style={styles.container}>
                    <Image
                      style={styles.image_sorry}
                      source={require("../../assets/sorry.jpg")}
                      resizeMode="stretch"
                    />
                    <Text style={styles.text_sorry}>We can't find it</Text>
                    <TouchableOpacity
                      style={[
                        { backgroundColor: "#D5D2D2" },
                        styles.info_search_container,
                      ]}
                      onPress={openSearchFood}
                    >
                      <MaterialCommunityIcons
                        size={60}
                        name="search-web"
                        color={Colors.secondary}
                      ></MaterialCommunityIcons>
                      <View style={styles.info_info}>
                        <Text>Search for a food</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </BottomSheetModal>
            </Camera>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    );
  }
};
{
  /* <View style={styles.container}>
      <View style={styles.info_container}>
        <Image source={require('../../assets/demo/burger.jpeg')} style={styles.info_image} resizeMode='stretch'></Image>
        <View style={styles.info_info}>
          <Text style={styles.info_info_head}>Fast Food</Text>
          <Text style={styles.info_info_desc}>Kebab Burgers Maxi</Text>
        </View>
      </View>
      <View style={styles.info_analytics}>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_protein_per}></View>
          <View style={styles.info_analytics_carbs_per}></View>
          <View style={styles.info_analytics_fat_per}></View>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <View style={styles.info_analytics_item_color_protein}></View>
            <Text style={styles.info_analytics_item_type}>Protein</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>35g</Text>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <View style={styles.info_analytics_item_color_carbs}></View>
            <Text style={styles.info_analytics_item_type}>Carbs</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>20g</Text>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <View style={styles.info_analytics_item_color_fat}></View>
            <Text style={styles.info_analytics_item_type}>Fat</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>30g</Text>
        </View>
        <View style={styles.info_analytics_item}>
          <View style={styles.info_analytics_item_left}>
            <MaterialCommunityIcons name="fire-circle" size={20} color={"#FF4D00"} />
            <Text style={styles.info_analytics_item_type}>Calories</Text>
          </View>
          <Text style={styles.info_analytics_item_figure}>225Kcal</Text>
        </View>
      </View>
      <View style={[{backgroundColor:"#D5D2D2"},styles.info_search_container]}>
        <MaterialCommunityIcons size={60} name="search-web" color={Colors.secondary}></MaterialCommunityIcons>
        <View style={styles.info_info}>
          <Text style={{color:Colors.primary}}>This is not what you want? </Text>
          <Text style={{color:"#FFFFFF"}}>Search here</Text>
        </View>
      </View>
    </View> */
}
