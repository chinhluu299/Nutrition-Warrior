import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { styles } from "./style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { Colors } from "../../resources/Colors";
import Toast from "react-native-toast-message";
import foodApi from "../../api/foodApi";
import FoodNutrient from "../../components/FoodNutrient";

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [autoComplete, setAutoComplete] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await foodApi.searchFood(keyword);
      if (res.status === 200) {
        const data = res.data;
        if (!data.parsed) {
          setResult(false);
        } else {
          setResult(data.parsed);
        }
        setAutoComplete(data.auto_complete);
      } else {
        setResult(false);
      }
    } catch (err) {
      setResult(null);
      Toast.show({
        type: "error",
        text1: err.message,
      });
    }
  };

  const reSearch = async (text) => {
    setKeyword(text);
    await searchAction();
  };

  const searchAction = async () => {
    setIsBusy(true);
    await handleSearch();
    setIsBusy(false);
  };

  const goBack = () => {
    try {
      navigation.goBack();
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <Toast position="bottom" bottomOffset={20} />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.back_control} onPress={goBack}>
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>FOOD SEARCH</Text>
        </View>
      </View>
      <View style={styles.search}>
        <MaterialCommunityIcons
          size={30}
          name="magnify"
          color={Colors.secondary}
          onPress={searchAction}
        ></MaterialCommunityIcons>
        <TextInput
          placeholder="Search here..."
          style={styles.search_input}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
      </View>

      {isBusy && (
        <View style={styles.result}>
          <ActivityIndicator
            size="larger"
            animating={isBusy}
            color={Colors.secondary}
          />
        </View>
      )}
      {!isBusy &&
        (result == null ? (
          <></>
        ) : !result ? (
          <View style={styles.result}>
            <Text>Sorry! Not Found</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.result_data}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.result_overview}>
              <Text style={styles.number_result}>{result.length} result</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {autoComplete.map((element, index) => (
                  <Text
                    style={styles.hint_keyword}
                    onPress={(e) => reSearch(element)}
                    key={index}
                  >
                    {element}
                  </Text>
                ))}
              </ScrollView>
            </View>
            {result.map((element, index) => {
              console.log(element.food.image);
              return (
                <View key={index} style={styles.food_container}>
                  <Image
                    style={styles.food_image}
                    source={{
                      uri: element.food.image,
                    }}
                    resizeMode="cover"
                  />
                  <Text style={styles.food_label}>{element.food.label}</Text>
                  <View style={styles.food_nutrient}>
                    <FoodNutrient
                      protein={element.food.nutrients.PROCNT}
                      carb={element.food.nutrients.CHOCDF}
                      fiber={element.food.nutrients.FIBTG}
                      fat={element.food.nutrients.FAT}
                      kcal={element.food.nutrients.ENERC_KCAL}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ))}
    </View>
  );
};

export default SearchScreen;
