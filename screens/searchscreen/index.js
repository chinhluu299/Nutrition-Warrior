import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  TextInput,
} from "react-native";
import { styles } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [choose, setChoose] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [inputValue, setInputValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={keyword}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
