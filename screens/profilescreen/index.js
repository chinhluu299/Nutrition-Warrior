import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { styles } from "./style";
import ProgressKcal from "../../components/ProgressKcal";
import ProgressKcalItem from "../../components/ProgressKcalItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../resources/Colors";
import DailyPickCard from "../../components/DailyPickCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import authApi from "../../api/authApi";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";

const ProfileScreen = () => {
  const userInfo = useSelector((state) => state.rootReducer.user);

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
    userInfo.profile_picture == null ? "" : userInfo.profile_picture
  );
  const [dob, setDob] = useState(
    userInfo.date_of_birth == null ? "" : userInfo.date_of_birth
  );
  const [address, setAddress] = useState(
    userInfo.address == null ? "" : userInfo.address
  );
  const [isBusy, setIsBusy] = useState(false);

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

  const saveUpdate = async () => {
    setIsBusy(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("phone_number", phone);
      form.append("address", address);
      form.append("picture", picture);
      form.append("gender", gender);
      form.append("date_of_birth", dob);
      form.append("_method", "put");
      //console.log(form);

      const res = await authApi.updateProfile(userInfo.id, form);
      console.log(res);
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
      setIsBusy(false);
    }
  };
  if (fontLoaded) {
    return (
      <View style={styles.background}>
        <Toast position="top" topOffset={30} style={{ zIndex: 10 }} />
        <ActivityIndicatorLoadingPage isBusy={isBusy} type={1} />
        <TouchableOpacity
          onPress={(e) => setIsEdit(!isEdit)}
          style={{ zIndex: 2 }}
        >
          <Ionicons name="pencil-sharp" size={20} style={styles.edit} />
        </TouchableOpacity>
        {isEdit && (
          <TouchableOpacity onPress={(e) => saveUpdate()}>
            <Text style={styles.save}>Save</Text>
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
                source={require("../../assets/adaptive-icon.png")}
                style={styles.avatar}
              />
            ) : (
              <Image source={{ uri: picture.uri }} style={styles.avatar} />
            )}
          </View>
          <View style={styles.content}>
            <View style={isEdit ? styles.content_row_edit : styles.content_row}>
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={isEdit ? styles.text_input_edit : styles.text_input}
                editable={isEdit}
              />
            </View>
            <View style={isEdit ? styles.content_row_edit : styles.content_row}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={isEdit ? styles.text_input_edit : styles.text_input}
                editable={false}
              />
            </View>
            <View style={isEdit ? styles.content_row_edit : styles.content_row}>
              <TextInput
                placeholder="Phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={isEdit ? styles.text_input_edit : styles.text_input}
                editable={isEdit}
              />
            </View>
            <View style={isEdit ? styles.content_row_edit : styles.content_row}>
              <TextInput
                placeholder="Gender"
                value={gender}
                onChangeText={(text) => setGender(text)}
                style={isEdit ? styles.text_input_edit : styles.text_input}
                editable={isEdit}
              />
            </View>
            <View style={isEdit ? styles.content_row_edit : styles.content_row}>
              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
                style={isEdit ? styles.text_input_edit : styles.text_input}
                editable={isEdit}
              />
            </View>
            <View style={isEdit ? styles.content_row_edit : styles.content_row}>
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
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default ProfileScreen;
