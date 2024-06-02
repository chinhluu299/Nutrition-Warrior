import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { styles } from "./style";
import ExerciseCollections from "../../static/ExerciseCollections";
import ExerciseCollectionItem from "../../components/ExerciseCollectionItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import exerciseApi from "../../api/exerciseApi";
import Toast from "react-native-toast-message";
import HeaderComponent from "../../components/HeaderComponent.js";

const ExerciseListScreen = ({ route }) => {
  const { title } = route.params;
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  //const data = ExerciseCollections;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsBusy(true);
      try {
        var result = await exerciseApi.getExercisesByBodyPart(
          title.toLowerCase()
        );
        if (result.status == 200) {
          var content = result.data;
          if (content.success) {
            setData(content.data);
          }
        }
        setIsBusy(false);
      } catch (error) {
        setIsBusy(false);
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    };

    fetchData();
  }, []);

  const onPressHandle = (item) => {
    navigation.navigate("ExerciseDetail", { data: item }, { reset: true });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.back_control}
          onPress={(e) => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back"
            style={styles.back_control_icon}
          />
        </TouchableOpacity>
        <Text style={styles.background_title_text}>{title}</Text>
      </View>
      <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
      {!isBusy && (
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExerciseCollectionItem
              image={{ uri: item.gifUrl }}
              title={item.name}
              type={2}
              press={() => onPressHandle(item)}
            />
          )}
        />
      )}
      <Toast position="bottom" bottomOffset={30} />
    </View>
  );
};

export default ExerciseListScreen;
