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
import exerciseApi from "../../api/exerciseApi";

const ExerciseScreen = () => {
  const [data, setData] = useState(ExerciseColletionsBodyPart);
  const navigation = useNavigation();
  const [type, setType] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    try {
      console.log("====================================");
      console.log(searchText);
      console.log("====================================");
      const response = await exerciseApi.getExercisesByName(searchText);
      if (response.data.success) {
        // console.log(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
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

  const onPressHandleSearchItem = (item) => {
    navigation.navigate("ExerciseDetail", { data: item }, { reset: true });
  };
  const onPressHandle = (title) => {
    navigation.navigate("ExerciseList", { title: title }, { reset: true });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.background_title_text}>Search</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExerciseCollectionItem
              image={{ uri: item.gifUrl }}
              title={item.name}
              press={() => onPressHandleSearchItem(item)}
            />
          )}
        />
      ) : null}
      <Text style={styles.background_title_text}>EXERCISES</Text>
      <View style={styles.circle_1}></View>
      <View style={styles.circle_2}></View>
      <View style={styles.circle_3}></View>
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
