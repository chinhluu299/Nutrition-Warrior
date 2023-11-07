import React from "react";
import { StyleSheet , Dimensions} from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    controls:{
        position: 'relative',
        display: 'block',
        left:0,
        top:30,
        width: width,
        height: 80,
        justifyContent:'center',
    },
    back_control: {
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: 'rgba(241,241,241,0.8)',
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 50,
        top: 20,
        left: width/10,
        borderWidth: 0
    },
    back_control_icon:{
        fontSize: 20,
        fontWeight: "800"
    },
    info_control: {
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: 'rgba(241,241,241,0.8)',
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 50,
        top: 20,
        right: width/10,
        borderWidth: 0
    },
    info_control_icon:{
        fontSize: 20,
        fontWeight: "800"
    },
    scanning_block:{
        alignItems: 'center',
        top: height / 6.5,
    },
    scanning_text:{
        color: "rgb(202,199,198)",
        fontWeight: "700"
    },
    scan: {
        position: 'relative',
        left: width / 10, // Đặt left là 25% chiều rộng màn hình
        top: height / 6, // Đặt top là 25% chiều cao màn hình
        width: width * 4/5, // Đặt width là 50% chiều rộng màn hình
        height: width * 4/5, // Đặt height là 50% chiều rộng màn hình
        //borderWidth: 2,
        //borderColor: 'white',
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
        overflow: "hidden",
    },
    scan_top_left:{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 80,
        height: 80,
        borderTopLeftRadius: 40,
        borderTopWidth: 2,
        borderLeftWidth:2,
        borderColor: 'white'
    },
    scan_top_right:{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 80,
        height: 80,
        borderTopRightRadius: 40,
        borderTopWidth: 2,
        borderRightWidth:2,
        borderColor: 'white'
    },
    scan_bottom_left:{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 80,
        height: 80,
        borderBottomLeftRadius: 40,
        borderBottomWidth: 2,
        borderLeftWidth:2,
        borderColor: 'white'
    },
    scan_bottom_right:{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 80,
        height: 80,
        borderBottomRightRadius: 40,
        borderBottomWidth: 2,
        borderRightWidth:2,
        borderColor: 'white'
    },
    scan_effect:{
        width: width * 4/5,
        height: 200,
        backgroundColor: 'transparent',
        
    },
    scan_effect_background: {
        width: width * 4/5,
        height: 80,
        borderTopWidth: 1.5,
        borderTopColor: 'white'
    },
    info_container: {
        height: 100,
        width: width * 4/5,
        left: width/10,
        marginTop: 20,
        backgroundColor: 'rgba(241,241,241,0.8)',
        borderRadius: 20,
        padding: 20,
        flexDirection:'row'
    },
    info_image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    info_info:{
        flex:1,
        padding: 10,
    },
    info_info_head: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.dark,
        marginBottom: 5,
    },
    info_info_desc: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text
    },

    info_analytics:{
        width: width * 4/5,
        left: width/10,
        marginTop: 30,
    },
    info_analytics_item:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row',
        marginTop: 15,
        marginBottom: 15,
    },
    info_analytics_item_type:{
        fontWeight: '700',
        color: Colors.darker,
        marginLeft: 10
    },
    info_analytics_item_figure:{
        fontWeight: '700',
        color: Colors.text,
        opacity:0.6
    },
    info_analytics_protein_per:{
        flex:2,
        height: 5,
        backgroundColor: "#9EB386",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    info_analytics_carbs_per:{
        flex:0.5,
        height: 5,
        backgroundColor: "#F4E3A9"
    },
    info_analytics_fat_per:{
        flex:1,
        height: 5,
        backgroundColor:  "#F0A2A3",
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    info_analytics_item_left:{
        display:'flex',
        flexDirection:  'row'
    },
    info_analytics_item_color_protein:{
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: "#9EB386",
        borderRadius: 4,
    },
    info_analytics_item_color_carbs:{
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: "#F4E3A9",
        borderRadius: 4,
    },
    info_analytics_item_color_fat:{
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: "#F0A2A3",
        borderRadius: 4,
    },
    info_search_container:{
        marginTop: 20,
        height: 100,
        width: width * 4/5,
        left: width/10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
        padding: 20,
        flexDirection:'row'
    },
    image_sorry:{
        width: width*4/5,
        height: width*4/5,
        left: width/10,
        top: 20,
    },
    text_sorry:{
        textAlign:'center',
        marginTop: 25,
        fontSize: 25,
        fontWeight:'700'
    }
});