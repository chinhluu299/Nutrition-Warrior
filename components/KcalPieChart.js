import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Dimensions } from "react-native";
import PieChart from 'react-native-pie-chart'
import { Colors } from "../resources/Colors";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const widthAndHeight = 280;
const widthAndHeight2 = widthAndHeight - 37;

const KcalPieChart = ({breakfast,lunch,dinner,supper,snack}) => {

    const total = breakfast+lunch+dinner+supper+snack;
    const space =  total / 9 / 10;
    const series = [breakfast,space, lunch, space, dinner,space, supper, space,snack,space]
    const sliceColor = [Colors.pie_color5,'transparent', Colors.pie_color4,'transparent', Colors.pie_color3,'transparent', Colors.pie_color2,'transparent', Colors.pie_color1,'transparent']
        
    return (
        <View style={styles.container}>
            <View style={styles.chart}>
                <PieChart
                    style = {styles.circle_outside}
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.85}
                    coverFill={'#FFF'}
                />
                <PieChart
                    style = {styles.circle_inside}
                    widthAndHeight={widthAndHeight2}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.7}
                    coverFill={'#FFF'}
                />
                <View style={styles.circle_content}>
                    <Ionicons name="fast-food" style={styles.circle_content_line_1}/>
                    <Text style={styles.circle_content_line_2}>{total}</Text>
                    <Text style={styles.circle_content_line_3}>Kcal gained</Text>
                </View>
            </View>
            <View style={styles.figure}>
                <View style={styles.figure_item}>
                    <View style={[{backgroundColor: Colors.pie_color5},styles.figure_item_color]}></View>
                    <Text style={styles.figure_item_text}>Breakfast</Text>
                    <Text style={styles.figure_item_kcal}>{breakfast} Kcal</Text>
                    <Text style={styles.figure_item_percent}>{ Math.round(breakfast / total * 100)}%</Text>
                </View>
                <View style={styles.figure_item}>
                    <View style={[{backgroundColor: Colors.pie_color4},styles.figure_item_color]}></View>
                    <Text style={styles.figure_item_text}>Lunch</Text>
                    <Text style={styles.figure_item_kcal}>{lunch} Kcal</Text>
                    <Text style={styles.figure_item_percent}>{ Math.round(lunch / total * 100)}%</Text>
                </View>
                <View style={styles.figure_item}>
                    <View style={[{backgroundColor: Colors.pie_color3},styles.figure_item_color]}></View>
                    <Text style={styles.figure_item_text}>Dinner</Text>
                    <Text style={styles.figure_item_kcal}>{dinner} Kcal</Text>
                    <Text style={styles.figure_item_percent}>{ Math.round(dinner / total * 100)}%</Text>
                </View>
                <View style={styles.figure_item}>
                    <View style={[{backgroundColor: Colors.pie_color2},styles.figure_item_color]}></View>
                    <Text style={styles.figure_item_text}>Supper</Text>
                    <Text style={styles.figure_item_kcal}>{supper} Kcal</Text>
                    <Text style={styles.figure_item_percent}>{ Math.round(supper / total * 100)}%</Text>
                </View>
                <View style={styles.figure_item}>
                    <View style={[{backgroundColor: Colors.pie_color1},styles.figure_item_color]}></View>
                    <Text style={styles.figure_item_text}>Snack</Text>
                    <Text style={styles.figure_item_kcal}>1000 Kcal</Text>
                    <Text style={styles.figure_item_percent}>{ Math.round(breakfast / total * 100)}%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1,
        position: "relative",
    },
    circle_outside: {
        position: 'absolute',
        top: 15,
        left: screenWidth / 2 -140,
        opacity: 0.8,
    },
    circle_inside:{
        position: 'absolute',
        top: 15 + 18.5,
        left: screenWidth / 2 -140 + 18.5,
        opacity: 0.5,
    },
    circle_content: {
        position: 'absolute',
        backgroundColor: 'red',
        width: widthAndHeight,
        height: widthAndHeight,
        // borderRadius: 125,
        top: 15,
        alignItems: 'center',
        justifyContent: 'center',
        left: screenWidth / 2 -140,
        backgroundColor: 'transparent'
    },
    circle_content_line_1:{
        color: Colors.primary,
        opacity: 0.3,
        fontSize: 30,
    },
    circle_content_line_2:{
        color: Colors.darker,
        fontSize: 50,
    },
    circle_content_line_3:{
        color: Colors.darker,
        fontSize: 16,
        opacity: 0.5,
        fontWeight: "600"
    },
    breakfast_icon: {
        position: 'absolute',
        fontSize: 40,
        top: 0
    },
    figure: {
        flex:1,
        marginTop:50,
        marginStart: 30,
        marginEnd: 30,
    },
    figure_item:{
        height: 40,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    figure_item_color:{
        height: 10,
        width: 10,
        // backgroundColor: Colors.pie_color1,
        borderRadius: 30,
    },
    figure_item_text:{
        width: screenWidth /2.5,
        fontWeight: '600',
        color:Colors.text
    },
    figure_item_kcal:{
        width: screenWidth /5,
        textAlign: 'right',
        fontWeight: '700',
        color:Colors.text,
        opacity: 0.5
       
    },
    figure_item_percent:{
        width: screenWidth / 10,
        textAlign: 'right',
        fontWeight: '700',
        color:Colors.text,
        opacity: 0.4
    }

})

export default KcalPieChart;