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

const ProfileScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState(null);
  const [dob, setDob] = useState("Date of Birth");
  const [address, setAddress] = useState("");

  const id = "123";

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
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("phone_number", phone);
      form.append("address", address);
      form.append("picture", picture);
      form.append("gender", gender);
      form.append("date_of_birth", dob);

      const res = await authApi.updateProfile(id, form);
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
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };
  if (fontLoaded) {
    return (
      <View style={styles.background}>
        <Toast position="bottom" bottomOffset={30} />
        <TouchableOpacity onPress={(e) => setIsEdit(!isEdit)}>
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
            {picture == null ? (
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
                {dob}
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
