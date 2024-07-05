import React, { useEffect, useRef, useState } from "react";
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
  TextInput,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import LoadingLottie from "../../components/LoadingLottie";

const UpstoryScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isText, setIsText] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const cameraRef = useRef(null);
  const messageRef = useRef(null);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsText(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsText(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    getPermissionAsync();
  }, []);
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
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        console.log("picture source", source);
        setCapturedImage(source);
        console.log(source);
      }
    }
  };
  const upload = async () => {
    setBusy(true);
    const frm = new FormData();
    frm.append("author", "65841052d8cdd868451e9edb");
    frm.append("content", text);
    frm.append("media", {
      uri: capturedImage,
      type: "image/jpeg",
      name: "story_image.jpg",
    });
    try {
      const res = await axios.postForm(
        "https://865d-115-79-219-34.ngrok-free.app/api/v1/story",
        frm
      );
      if (res.status === 201) {
        setTimeout(() => {
          setBusy(false);
           navigation.reset({
             routes: [{ name: "Story" }],
           });
        }, 1000);
      }else{
        setBusy(false);
      }
    } catch (error) {
      setBusy(false);
      Toast.show({
        type: "error",
        text1: "Upload stories failed! Try again!",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  const renderCameraButton = () => {
    return (
      <TouchableOpacity
        style={styles.captureButton}
        onPress={takePicture}
        disabled={false}
      ></TouchableOpacity>
    );
  };
  const goBack = () => {
    if (capturedImage == null) {
      navigation.goBack();
    }
    setCapturedImage(null);
    setIsText(false);
    setText("");
  };
  const openText = () => {
    setIsText(!isText);
  };
  const renderUploadButton = () => {
    return (
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={upload}
        disabled={false}
      >
        <Ionicons name="arrow-forward-circle" size={60} />
      </TouchableOpacity>
    );
  };
  if (hasPermission === null) {
    return <Text>No access to camera</Text>;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return !busy ? (
      <View
        style={
          isText == false
            ? styles.container
            : { backgroundColor: "rgba(0,0,0,0.2)", flex: 1 }
        }
      >
        {isText == true ? (
          <View style={styles.text_container}>
            <TextInput
              style={styles.text}
              value={text}
              onChangeText={(text) => setText(text)}
              autoFocus={true}
              placeholder="Aa..."
              multiline={true}
            />
          </View>
        ) : text.trim().length > 0 ? (
          <View style={styles.text_container}>
            <TextInput
              style={styles.text}
              editable={false}
              value={text}
              multiline={true}
            />
          </View>
        ) : (
          ""
        )}
        {capturedImage != null ? (
          <View style={styles.controls}>
            <TouchableOpacity style={styles.back_control} onPress={goBack}>
              <Ionicons name="arrow-back" style={styles.back_control_icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.info_control} onPress={openText}>
              <Ionicons name="text" style={styles.info_control_icon} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.controls_2}>
            <TouchableOpacity style={styles.back_control} onPress={goBack}>
              <Ionicons name="arrow-back" style={styles.back_control_icon} />
            </TouchableOpacity>
          </View>
        )}
        {capturedImage != null ? (
          <Image source={{ uri: capturedImage }} />
        ) : (
          <Camera
            style={styles.camera}
            type={cameraType}
            ref={cameraRef}
            onCameraReady={onCameraReady}
          ></Camera>
        )}
        {capturedImage == null
          ? renderCameraButton()
          : isText == false
          ? renderUploadButton()
          : ""}
      </View>
    ) : (
      <LoadingLottie isBusy={busy} />
    );
  }
};

export default UpstoryScreen;
