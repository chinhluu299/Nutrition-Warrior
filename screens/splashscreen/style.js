import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image_background:{
        flex: 1,
        width: width,
        top: height/10,
    },
    content:{
        flex:1,
        top: height/10,
        alignItems: 'center'
    },
    heading:{
        marginTop: 30,
        fontSize: 38,
        width: 300,
        lineHeight: 50,
        textAlign: 'center',
        fontFamily: 'Roboto'
    }
});