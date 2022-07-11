import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback,Text, View } from 'react-native'
import GeoCalculatorScreen from './Components/GeoCalculatorScreen';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <SafeAreaView style={styles.container} >
        <GeoCalculatorScreen />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 100,
  },
});