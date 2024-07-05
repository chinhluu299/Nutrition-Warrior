import React, { useState } from "react";
import { styles } from "./style";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Back from "../../components/Back";
import { useNavigation } from "@react-navigation/native";
import YouTubePlayer from "../../components/YoutubePlayer";

const extractVideoId = (url) => {
  const regExp =
    /^.*(?:youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|watch\?.*&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
};

const RecipeScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <Back backEvent={() => navigation.goBack()} />
        <Text style={styles.background_title_text}>Recipe</Text>
      </View>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{ uri: data.strMealThumb }}
          resizeMode="cover"
        />
        <View style={styles.title}>
          <Text style={styles.title_text}>{data.strMeal}</Text>
        </View>
        <View style={styles.options}>
          <Pressable
            onPress={() => {
              setSelected(0);
            }}
          >
            <Text
              style={
                selected == 0
                  ? styles.options_item_selected
                  : styles.options_item
              }
            >
              Recipe
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected(1);
            }}
          >
            <Text
              style={
                selected == 1
                  ? styles.options_item_selected
                  : styles.options_item
              }
            >
              Instruction
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected(2);
            }}
          >
            <Text
              style={
                selected == 2
                  ? styles.options_item_selected
                  : styles.options_item
              }
            >
              Video
            </Text>
          </Pressable>
        </View>
        {selected == 0 && (
          <View style={styles.options_description}>
            <Text style={styles.options_description_text}>Ingradients</Text>
            <ScrollView>
              {Object.entries(data).map(([key, value], index, arr) => {
                if (key.startsWith("strMeasure")) {
                  return (
                    <View>
                      <Text>
                        {value} {data["strIngredient" + key.substring(10)]}
                      </Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        )}
        {selected == 1 && (
          <View style={styles.options_description}>
            <Text style={styles.options_description_text}>Recipe For Text</Text>
            <ScrollView style={styles.recipeForText}>
              <Text>{data.strInstructions}</Text>
            </ScrollView>
          </View>
        )}
        {selected == 2 && (
          <View style={styles.options_description}>
            <Text style={styles.options_description_text}>
              Recipe For Video
            </Text>
            <YouTubePlayer videoId={extractVideoId(data.strYoutube)} />
          </View>
        )}
      </View>
    </View>
  );
};

export default RecipeScreen;
