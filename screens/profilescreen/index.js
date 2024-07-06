import React, { useState, useEffect } from "react";
import * as Font from "expo-font";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { styles } from "./style";
import ProgressKcal from "../../components/ProgressKcal";
import ProgressKcalItem from "../../components/ProgressKcalItem";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "../../resources/Colors";
import DailyPickCard from "../../components/DailyPickCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import authApi from "../../api/authApi";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const userInfo = useSelector((state) => state.rootReducer.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [height, setHeight] = useState(parseFloat(userInfo.height));
  const [weight, setWeight] = useState(parseFloat(userInfo.current_weight));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [name, setName] = useState(userInfo.name == null ? "" : userInfo.name);
  const [email, setEmail] = useState(
    userInfo.email == null ? "" : userInfo.email
  );
  const [phone, setPhone] = useState(
    userInfo.phone == null ? "" : userInfo.phone
  );
  const [gender, setGender] = useState(
    userInfo.gender == null ? "" : userInfo.gender
  );
  const [picture, setPicture] = useState(
    userInfo.profile_picture == null ? "" : { uri: userInfo.profile_picture }
  );
  const [dob, setDob] = useState(
    userInfo.date_of_birth == null ? "" : userInfo.date_of_birth
  );
  const [address, setAddress] = useState(
    userInfo.address == null ? "" : userInfo.address
  );
  const [isBusy, setIsBusy] = useState(false);
  const changeBMI = async () => {
    try {
      const res = await authApi.updateHeightWeight(userInfo.id, {
        height: height,
        current_weight: weight,
      });
      if (res.status == 200) {
        dispatch({
          type: "UPDATE_HEIGHT_WEIGHT",
          payload: res.data.data,
        });
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadFonts = async () => {
    await Font.loadAsync({
      "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
      "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
      "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
      "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
      "Inter-ExtraLight": require("../../assets/fonts/Inter-ExtraLight.ttf"),
      "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
      "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
      "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
      "Inter-Thin": require("../../assets/fonts/Inter-Thin.ttf"),
    });
    setFontLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);
  const changeDate = (event, selectedDate) => {
    setShowDate(false);
    setDob(
      selectedDate.getMonth() +
        1 +
        "-" +
        selectedDate.getDate() +
        "-" +
        selectedDate.getFullYear()
    );
  };
  const handleChoosePhoto = async () => {
    // ImagePicker.launchImageLibrary(
    //   { mediaType: "photo", includeBase64: false },
    //   (response) => {
    //     if (response) {
    //       setPicture(response);
    //     }
    //   }
    // );
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0]);
    }
  };
  const handleEditBMI = async () => {
    setModalVisible(true);
  };
  const logOut = async () => {
    dispatch({
      type: "LOGOUT",
    });
    dispatch({
      type: "CLEAR_USER",
    });
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };
  const saveUpdate = async () => {
    setIsBusy(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("phone_number", phone);
      form.append("address", address);
      form.append("picture", {
        uri: picture.uri,
        type: "image/jpeg",
        name: userInfo.id + "_avatar.jpg",
      });
      form.append("gender", gender);
      form.append("date_of_birth", dob);
      // form.append("_method", "put");
      console.log(form);

      const res = await authApi.updateProfile(userInfo.id, form);
      // console.log(res);
      if (res.status == 200) {
        const data = res.data;
        if (data.success) {
          setIsEdit(false);
          Toast.show({
            type: "success",
            text1: "Update profile successfully",
          });
        } else {
          Toast.show({
            type: "error",
            text1: data.message,
          });
        }
        setIsBusy(false);
      } else {
        Toast.show({
          type: "error",
          text1: data.message,
        });
      }
      setIsBusy(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      console.trace(error);
      setIsBusy(false);
    }
  };
  const handlePress = () => {
    setModalVisible(false);
  };
  if (fontLoaded) {
    return (
      <View style={styles.background}>
        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <Pressable style={styles.modalContainer} onPress={handlePress}>
            <View style={styles.modalContent}>
              {/* <Text style={styles.background_title_text}>Search</Text> */}
              <View style={styles.searchContainer}>
                <Text style={styles.bmi_text}>BMI</Text>
                <TextInput
                  style={styles.searchInput}
                  keyboardType="number-pad"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChangeText={(value) => setWeight(parseFloat(value))}
                />
                <TextInput
                  style={styles.searchInput}
                  keyboardType="number-pad"
                  placeholder="Height (cm)"
                  value={height}
                  onChangeText={(value) => setHeight(parseFloat(value))}
                />
                <TouchableOpacity
                  style={styles.button_change}
                  onPress={changeBMI}
                >
                  <Text style={styles.button_change_text}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
        <TouchableOpacity
          onPress={(e) => setIsEdit(!isEdit)}
          style={{ zIndex: 2 }}
        >
          <Ionicons name="pencil-sharp" size={20} style={styles.edit} />
        </TouchableOpacity>
        {isEdit ? (
          <TouchableOpacity onPress={(e) => saveUpdate()}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={(e) => logOut()}>
            <Ionicons name="log-out" size={20} style={styles.logout} />
          </TouchableOpacity>
        )}
        <View style={styles.timestamp}>
          <Text style={styles.timestamp_text}>Profile</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.daily_kcal_left}>
            {isEdit && (
              <TouchableOpacity
                onPress={handleChoosePhoto}
                style={styles.changePhoto}
              >
                <Ionicons name="pencil-sharp" size={30} />
              </TouchableOpacity>
            )}
            {picture == null || picture == "" ? (
              <Image
                source={require("../../static/story-1.jpeg")}
                style={styles.avatar}
              />
            ) : (
              <Image source={{ uri: picture.uri }} style={styles.avatar} />
            )}
          </View>
          <View style={styles.content} showsHorizontalScrollIndicator={false}>
            <View style={!isEdit && styles.profile}>
              <View
                style={isEdit ? styles.content_row_edit : styles.content_row}
              >
                <Text style={styles.text_input_title}>Full name</Text>
                <TextInput
                  placeholder="Full Name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={isEdit ? styles.text_input_edit : styles.text_input}
                  editable={isEdit}
                />
              </View>
              <View
                style={isEdit ? styles.content_row_edit : styles.content_row}
              >
                <Text style={styles.text_input_title}>Email</Text>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={isEdit ? styles.text_input_edit : styles.text_input}
                  editable={false}
                />
              </View>
              <View
                style={isEdit ? styles.content_row_edit : styles.content_row}
              >
                <Text style={styles.text_input_title}>Phone number</Text>
                <TextInput
                  placeholder=""
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  style={isEdit ? styles.text_input_edit : styles.text_input}
                  editable={isEdit}
                />
              </View>
              <View
                style={isEdit ? styles.content_row_edit : styles.content_row}
              >
                <Text style={styles.text_input_title}>Gender</Text>
                <TextInput
                  placeholder=""
                  value={gender}
                  onChangeText={(text) => setGender(text)}
                  style={isEdit ? styles.text_input_edit : styles.text_input}
                  editable={isEdit}
                />
              </View>
              <View
                style={isEdit ? styles.content_row_edit : styles.content_row}
              >
                <Text style={styles.text_input_title}>Address</Text>
                <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  style={isEdit ? styles.text_input_edit : styles.text_input}
                  editable={isEdit}
                />
              </View>
              <View
                style={isEdit ? styles.content_row_edit : styles.content_row}
              >
                <Text style={styles.text_input_title}>Date of birth</Text>
                <Text
                  style={isEdit ? styles.text_input_edit : styles.text_input}
                  editable={isEdit}
                  onPress={(e) => (isEdit ? setShowDate(true) : "")}
                >
                  {dob != "" ? dob : "Date of Birth"}
                </Text>
                {showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    textColor={Colors.primary}
                    onChange={changeDate}
                  />
                )}
              </View>
            </View>
            {!isEdit && (
              <View style={styles.content_another}>
                <View style={styles.content_another_card}>
                  <View style={styles.content_another_card_wh}>
                    <Text style={styles.content_another_card_wh_text}>
                      BMI:{" "}
                      {userInfo.height != 0 &&
                        userInfo.current_weight != 0 &&
                        (
                          (userInfo.current_weight * 1.0) /
                          ((userInfo.height * userInfo.height) / 10000)
                        ).toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={handleEditBMI}>
                      <FontAwesome
                        name="edit"
                        size={20}
                        style={{ padding: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.content_another_card_wh}>
                    <Text style={styles.content_another_card_wh_text}>
                      Height: {userInfo.height}cm
                    </Text>
                    <Text style={styles.content_another_card_wh_text}>
                      Weight: {userInfo.current_weight}kg
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        <Toast position="top" topOffset={30} style={{ zIndex: 10 }} />
        <ActivityIndicatorLoadingPage isBusy={isBusy} type={1} />
      </View>
    );
  } else {
    return "";
  }
};

export default ProfileScreen;
