import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors } from "../resources/Colors";

const widthScreen = Dimensions.get('window').width;
const heightSreen = Dimensions.get('window').height;

export const ProgressKcalItem = ({title,target,current}) => {
    const left = target - current;
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{title}</Text>
            <Progress.Bar progress={current/target} width={widthScreen/6} backgroundColor={Colors.background} borderWidth={0} color={Colors.secondary} height={3} style={styles.progress_bar}/>
            <Text style={styles.detail}>{left}g left</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    heading:{
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text
    },
    progress_bar:{
        marginTop: 5,
        //color: Colors.primary
    },
    detail:{
        marginTop: 5,
        fontWeight: "600",
        opacity: 0.4
    }
});

export default ProgressKcalItem;