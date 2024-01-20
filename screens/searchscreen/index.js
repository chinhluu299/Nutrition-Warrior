import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { styles } from "./style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { Colors } from "../../resources/Colors";
import Toast from "react-native-toast-message";
import foodApi from "../../api/foodApi";
import FoodNutrient from "../../components/FoodNutrient";
import Modal from "react-native-modal";
import DropdownComponent from "../../components/Dropdown";
import dialyLogApi from "../../api/logApi";
import { useDispatch, useSelector } from "react-redux";

const SearchScreen = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  //const [hints, setHints] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [timeEat, setTimeEat] = useState("breakfast");
  const [numberServing, setNumberServing] = useState(1);
  const userInfo = useSelector((state) => state.rootReducer.user);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const checkHints = (parsed, hints) => {
    const combinedArray = parsed.map((parsedItem) => {
      const matchingHint = hints.find(
        (hintItem) => hintItem.food.label === parsedItem.food.label
      );

      if (matchingHint) {
        const serving = matchingHint.measures.find(
          (measure) => measure.label === "Serving"
        );
        return {
          ...parsedItem,
          serving: serving ? serving.weight : null,
        };
      } else {
        return parsedItem;
      }
    });
    setResult(combinedArray);
  };
  const handleAddFood = async (input = "") => {
    setSelectedFood(input);
    setModalVisible(true);
  };
  useEffect(() => {
    const detectedObjects = route.params?.detectedObjects;

    if (detectedObjects && detectedObjects.length > 0) {
      const searchTerm = detectedObjects[0][1];
      setKeyword(searchTerm);
      searchAction(searchTerm);
    }
  }, [route.params]);

  useEffect(() => {
    const detectedObjects = route.params?.detectedObjects;

    if (detectedObjects && detectedObjects.length > 0) {
      const searchTerm = detectedObjects[0][1];
      setKeyword(searchTerm);
      searchAction(searchTerm);
    }
  }, [route.params]);

  const handleSearch = async (input = "") => {
    try {
      // console.log("====================================");
      // console.log("data: ", input);
      // console.log("====================================");
      const res = input
        ? await foodApi.searchFood(input)
        : await foodApi.searchFood(keyword);
      if (res.status === 200) {
        const data = res.data;
        if (!data.parsed) {
          setResult(false);
        } else {
          // setResult(data.parsed);
          // setHints(data.hints);
          checkHints(data.parsed, data.hints);
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
    await searchAction(text);
  };

  const searchAction = async (text = "") => {
    setIsBusy(true);
    await handleSearch(text);
    setIsBusy(false);
  };

  const goBack = () => {
    try {
      navigation.goBack();
    } catch (err) {}
  };
  const eats = [
    {
      label: "Breakfast",
      value: "breakfast",
    },
    {
      label: "Lunch",
      value: "lunch",
    },
    {
      label: "Dinner",
      value: "dinner",
    },
  ];
  const handleChange = (text) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setNumberServing(parseInt(numericValue));
  };
  const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const submitAddFood = async () => {
    setIsBusy(true);
    try {
      const dataReq = {
        meal: timeEat,
        food_item: {
          foodId: selectedFood.food.foodId,
          label: selectedFood.food.label,
          knownAs: selectedFood.food.knownAs,
          nutrients: {
            ENERC_KCAL: (
              selectedFood.food.nutrients.ENERC_KCAL * numberServing
            ).toFixed(1),
            PROCNT: (
              selectedFood.food.nutrients.PROCNT * numberServing
            ).toFixed(1),
            FAT: (selectedFood.food.nutrients.FAT * numberServing).toFixed(1),
            CHOCDF: (
              selectedFood.food.nutrients.CHOCDF * numberServing
            ).toFixed(1),
            FIBTG: (selectedFood.food.nutrients.FIBTG * numberServing).toFixed(
              1
            ),
          },
          category: selectedFood.food.category,
          categoryLabel: selectedFood.food.categoryLabel,
          image: selectedFood.food.image,
        },
      };
      const res = await dialyLogApi.addFood(
        userInfo.id,
        new Date().toISOString(),
        dataReq
      );
      if (res.status == 201) {
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.data,
        });
        setIsBusy(false);
        toggleModal();
        Toast.show({
          type: "success",
          text1: "Add food successfully",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Can not add this food",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modal_caption}>Select meal</Text>
          <DropdownComponent
            data={eats}
            value={timeEat}
            setValue={setTimeEat}
          />
          <Text style={styles.modal_caption}>Select your serving</Text>
          <TextInput
            style={styles.number_serving}
            value={numberServing}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholder={"Enter a number serving"}
          />
          <View>
            <Text>You will add:</Text>
            <Text>
              {numberServing && selectedFood
                ? (selectedFood.food.nutrients.PROCNT * numberServing).toFixed(
                    1
                  )
                : 0}
              g Protein
            </Text>
            <Text>
              {numberServing && selectedFood
                ? (selectedFood.food.nutrients.FIBTG * numberServing).toFixed(1)
                : 0}
              g Fiber
            </Text>
            <Text>
              {numberServing && selectedFood
                ? (selectedFood.food.nutrients.CHOCDF * numberServing).toFixed(
                    1
                  )
                : 0}
              g Carbs
            </Text>
            <Text>
              {numberServing && selectedFood
                ? (selectedFood.food.nutrients.FAT * numberServing).toFixed(1)
                : 0}
              g Fat
            </Text>
            <Text>
              {numberServing && selectedFood
                ? (
                    selectedFood.food.nutrients.ENERC_KCAL * numberServing
                  ).toFixed(1)
                : 0}
              g kcal
            </Text>
          </View>
          <TouchableOpacity style={styles.submit_add} onPress={submitAddFood}>
            <Text>ADD</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
          onPress={(e) => searchAction()}
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
              return (
                <View key={index} style={styles.food_container}>
                  <View style={styles.image_border}>
                    <Image
                      style={styles.food_image}
                      source={{
                        uri: element.food.image,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.add_food}
                    onPress={(e) => handleAddFood(element)}
                  >
                    <Ionicons
                      name="add-circle"
                      size={50}
                      color={Colors.secondary}
                    />
                  </TouchableOpacity>
                  <Text style={styles.food_label}>{element.food.label}</Text>
                  <Text>Serving size: {element.serving}g</Text>
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
