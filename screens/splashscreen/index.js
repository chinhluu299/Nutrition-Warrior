import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./style";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image_background} source={require("../../assets/splash2.jpg")} resizeMode="cover" />
            <View style={styles.content}>
                <Text style={styles.heading}>Welcome to Nutrition Warrior</Text>
                <Text style={styles.d}>Welcome to Nutrition Warrior</Text>
            </View>
        </View>
    );

}

export default SplashScreen;