import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './screens/scanscreen';
import SplashScreen from './screens/splashscreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ScanScreen /> */}
      <SplashScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
