import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "./style";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import exerciseApi from "../../api/exerciseApi";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ExerciseInputModal from "../../components/ExerciseInputModal";
import * as Speech from "expo-speech";

const ExerciseDetailScreen = ({ route }) => {
  const { data } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [content, setContent] = useState({});
  const [instructions, setInstruction] = useState("");
  const navigation = useNavigation();
  const [busy, setBusy] = useState(false);
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    setContent(data);
    console.log(data);
  }, []);

  const speak = async () => {
     const controller = new AbortController();
     setAbortController(controller);
     const { signal } = controller;

    if(!busy){
      setBusy(true);
      var thingToSay = "";
      let index = -1;
      for (var value of content.instructions) {
         if (signal.aborted) {
          console.log('Loop aborted');
          break;
        }
        
        index++;
        thingToSay = `Step ${index + 1}`;
        thingToSay += value;
        setInstruction(`Step ${index + 1}: ` + value);
        await new Promise((resolve) => {
          Speech.speak(thingToSay, {
            onDone: () => {
              //setInstruction("");
              setTimeout(() => {
                if (!signal.aborted) {
                  resolve();
                } else {
                  console.log('Speech aborted');
                  resolve();
                }
              }, 1000); // Dừng 1 giây sau khi đọc xong trước khi tiếp tục
            },
          });
        });
      }
      setInstruction("");
      setBusy(false);
    }
  };

  const stopSpeaking = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={infoModalVisible} animationType="fade">
        <Pressable
          style={styles.modalContainer}
          onPress={() => setInfoModalVisible(false)}
        >
          <View style={styles.modalContent}>
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
          </View>
        </Pressable>
      </Modal>
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.back_control}
          onPress={(e) => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.background_title_text}>{content.name}</Text>
        <TouchableOpacity
          style={styles.info_control}
          onPress={(e) => {
            setInfoModalVisible(true);
          }}
        >
          <Ionicons name="information" style={styles.info_control_icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{ uri: content.gifUrl }}
          resizeMode="contain"
        />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.construction_container}>
          <View style={styles.instructions_step}>
            <Text style={styles.instructions_step_value}>{instructions}</Text>
          </View>
          {/* <Text style={styles.content_info_title}>Instructions: </Text> */}
          {/* {content.instructions &&
            content.instructions.map((value, index) => {
              return (
                <View style={styles.instructions_step}>
                  <Text style={styles.instructions_step_num}>
                    Step {index + 1}{" "}
                  </Text>
                  <Text style={styles.instructions_step_value}>{value}</Text>
                </View>
              );
            })} */}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" style={styles.floatingButtonIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.instructButton}
        onPress={!busy ? speak : stopSpeaking}
      >
        {!busy ? (
          <FontAwesome name="play" style={styles.floatingButtonIcon} />
        ) : (
          <FontAwesome name="pause" style={styles.floatingButtonIcon} />
        )}
        <Text style={styles.instructButtonText}>Instructions</Text>
      </TouchableOpacity>

      {/* Exercise Input Modal */}
      <ExerciseInputModal
        visible={isModalVisible}
        setVisible={setModalVisible}
        onClose={() => setModalVisible(false)}
        data={content}
      />

      <Toast position="bottom" bottomOffset={30} />
    </View>
  );
};

export default ExerciseDetailScreen;
