import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import exerciseApi from "../../api/exerciseApi";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ExerciseInputModal from "../../components/ExerciseInputModal";

const ExerciseDetailScreen = ({ route }) => {
  const { data } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    setContent(data);
  }, []);
  return (
    <View style={styles.container}>
      <Toast position="bottom" bottomOffset={30} />
      <View>
        <TouchableOpacity
          style={styles.back_control}
          onPress={(e) => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.background_title_text}>{content.name}</Text>
      </View>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{ uri: content.gifUrl }}
          resizeMode="contain"
        />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.content_info}>
          <Text style={styles.content_info_title}>Target: </Text>
          <Text style={styles.content_info_value}>{content.target}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.content_info_title}>Target body part: </Text>
          <Text style={styles.content_info_value}>{content.bodyPart}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.content_info_title}>Equipment: </Text>
          <Text style={styles.content_info_value}>{content.equipment}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.content_info_title}>Secondary Muscles: </Text>
          <Text style={styles.content_info_value}>
            {content.secondaryMuscles &&
              content.secondaryMuscles.map((v, i) =>
                i < content.secondaryMuscles.length - 1 ? v + ", " : v
              )}
          </Text>
        </View>
        <View style={styles.construction_container}>
          <Text style={styles.content_info_title}>Instructions: </Text>
          {content.instructions &&
            content.instructions.map((value, index) => {
              return (
                <View style={styles.instructions_step}>
                  <Text style={styles.instructions_step_num}>
                    Step {index + 1}{" "}
                  </Text>
                  <Text style={styles.instructions_step_value}>{value}</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" style={styles.floatingButtonIcon} />
      </TouchableOpacity>

      {/* Exercise Input Modal */}
      <ExerciseInputModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        data={content}
      />
    </View>
  );
};

export default ExerciseDetailScreen;
