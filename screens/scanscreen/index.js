import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing, Text, View, Platform, Dimensions, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default ScanScreen = () => {
  const [animation] = useState(new Animated.Value(0));
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  useEffect(() => {
    getPermissionAsync();
    startAnimation();
  }, []);

  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermission(status === 'granted');
  };

  //animation
  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000, 
        easing: Easing.linear, 
        useNativeDriver: false, 
      })
    ).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width* 2/3, 0], 
  });
  //
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.back_control}>
              <Ionicons name='arrow-back' style={styles.back_control_icon}/>
             </TouchableOpacity> 
             <TouchableOpacity style={styles.info_control}>
              <SimpleLineIcons name='energy' style={styles.info_control_icon}/>
             </TouchableOpacity> 
          </View>
          <View style={styles.scanning_block}><Text style={styles.scanning_text}>Scanning..</Text></View>
          <View style={styles.scan}>
            <View style={styles.scan_top_left}></View>
            <View style={styles.scan_top_right}></View>
            <View style={styles.scan_bottom_left}></View>
            <View style={styles.scan_bottom_right}></View>
            <Animated.View style={[styles.scan_effect, { transform: [{ translateY }] }]} >
              <LinearGradient
                colors={['rgba(255,255,255,0.5)', 'transparent']}
                stops={[0, 1]}
                style={styles.scan_effect_background}
              />
            </Animated.View>
          </View>
          <View style={styles.info_container}>
            <Image source={require('../../assets/favicon.png')} style={styles.info_image} resizeMode='stretch'></Image>
            <View style={styles.info_info}>
              <Text style={styles.info_info_head}>Heading 1</Text>
              <Text style={styles.info_info_desc}>Content 1</Text>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}