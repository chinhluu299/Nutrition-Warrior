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
import * as Permissions from "expo-permissions";
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
import { ImageManipulator } from "expo-image-manipulator";
const setTimeout = global.setTimeout;

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
        console.log("====================================");
        console.log(1);
        console.log("====================================");
        await callObjectDetectionApi(data);
      }
    }
    // console.log("====================================");
    // console.log(1);
    // console.log("====================================");
    // if (cameraRef.current) {
    //   const photo = await cameraRef.current.takePictureAsync({
    //     quality: 0.7, // 0 to 1
    //   });
    //   console.log("====================================");
    //   console.log(2);
    //   console.log("====================================");
    //   let processedImage = await ImageManipulator.manipulateAsync(
    //     photo.uri,
    //     [{ resize: { width: 640 } }],
    //     { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    //   );
    //   console.log("====================================");
    //   console.log(3);
    //   console.log("====================================");
    //   setCapturedImage(processedImage);
    //   setIsScanning(true);

    //   await callObjectDetectionApi(processedImage);
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
      console.log("ok nhe ban toi oiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      console.log(response);
      console.log("====================================");
      console.log("xxx");
      console.log("====================================");
      if (response.data.success) {
        console.log(response.data);
        if (
          response.data.detected_objects &&
          response.data.detected_objects.length > 0
        ) {
          console.log("Detected objects:", response.data.detected_objects);
        } else {
          console.log("No objects detected.");
          handlePresentModal();
        }
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
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
              <View style={styles.controls}>
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
              </View>
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
              <View style={styles.info_container}>
                {/* Button test de show dialog */}
                <Button
                  title="Test"
                  onPress={handlePresentModal}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Re-run"
                  onPress={takePicture}
                  style={{ flex: 1 }}
                />
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
              </View>
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
