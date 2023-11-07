import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './screens/scanscreen';
import SplashScreen from './screens/splashscreen';
import * as Font from 'expo-font';
import MyAnalyticsScreen from './screens/myanalyticscreen';
import HomeScreen from './screens/homescreen';
import SurveyScreen from './screens/surveyscreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ScanScreen /> */}
      {/* <SplashScreen/> */}
      {/* <MyAnalyticsScreen/> */}
      {/* <HomeScreen/> */}
      <SurveyScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
