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
import { ExerciseColletionsBodyPart } from "../../static/ExerciseCollections";
import ExerciseCollectionItem from "../../components/ExerciseCollectionItem";
import { useNavigation } from "@react-navigation/native";

const ExerciseScreen = () => {
  const [data, setData] = useState(ExerciseColletionsBodyPart);
  const navigation = useNavigation();
  const [type, setType] = useState(1);

  useEffect(() => {
    //co the phan thanh nhieu loai
    switch (type) {
      case 1:
        setData(ExerciseColletionsBodyPart);
        break;
      case 2:
        setData(ExerciseColletionsBodyPart);
        break;
      case 3:
        setData(ExerciseColletionsBodyPart);
        break;
      default:
        break;
    }
  }, [type]);

  const onPressHandle = (title) => {
    navigation.navigate("ExerciseList", { title: title }, { reset: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.background_title_text}>EXERCISES</Text>

      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ExerciseCollectionItem
            image={item.image}
            title={item.title}
            press={() => onPressHandle(item.title)}
          />
        )}
      />
    </View>
  );
};

export default ExerciseScreen;
