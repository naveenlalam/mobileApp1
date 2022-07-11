import react, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, Input } from "react-native-elements";

const GeoCalculatorScreen = (props) => {

    const [latVal1, setLat1] = useState('');
    const [latVal2, setLat2] = useState('');
    const [longVal1, setLong1] = useState('');
    const [longVal2, setLong2] = useState('');
    const [distance, setDistance] = useState('');
    const [bearing, setBearing] = useState('');
    const [latVal1Err, setLat1Err] = useState('');
    const [latVal2Err, setLat2Err] = useState('');
    const [longVal1Err, setLong1Err] = useState('');
    const [longVal2Err, setLong2Err] = useState('');

    // Computes distance between two geo coordinates in kilometers.
    function computeDistance(lat1, lon1, lat2, lon2) {
      console.log(`p1={${lat1},${lon1}} p2={${lat2},${lon2}}`);
      var R = 6371; // km (change this constant to get miles)
      var dLat = ((lat2 - lat1) * Math.PI) / 180;
      var dLon = ((lon2 - lon1) * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      //return d+' km';
      return `${round(d, 3)} km`;
    }

     // Computes bearing between two geo coordinates in degrees.
    function computeBearing(startLat, startLng, destLat, destLng) {
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);
  
      var y = Math.sin(destLng - startLng) * Math.cos(destLat);
      var x = Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
      var brng = Math.atan2(y, x);
      brng = toDegrees(brng);
      return `${round((brng + 360) % 360, 3)} degrees`;
    }
      
 
    function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

     // Converts from degrees to radians.
    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
  
    // Converts from radians to degrees.
    function toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }
  
    const onPressCalculate=()=>{
       if(latVal1Err == '' && latVal2Err == '' && longVal1Err =='' && longVal2Err == '' && latVal1 != '' &&  latVal2 != '' &&  longVal1 != '' &&  longVal2 != '') {
            console.log('Calculate Button Pressed!')
            setDistance(computeDistance(latVal1,longVal1,latVal2,longVal2))
            setBearing(computeBearing(latVal1,longVal1,latVal2,longVal2))
       }
    }

    const onPressClear=()=>{
        console.log('Clear Button Pressed!')
        setLat1('')
        setLat2('')
        setLong1('')
        setLong2('')
        setDistance('')
        setBearing('')
        setLat1Err('')
        setLat2Err('')
        setLong1Err('')
        setLong2Err('')
    }

    const validateLat1=()=>{
        if(latVal1.trim()){
            if(isNaN(latVal1.trim())) {
                setLat1Err('Please enter a valid numeric value')
                setLat1('')
            }else{
                setLat1Err('')
            }
        } else {
            setLat1Err('latitude for point 1 cannot be empty')
        }
    }

    const validateLat2=()=>{
       if(latVal2.trim()){
            if(isNaN(latVal2.trim())) {
                setLat2Err('Please enter a valid numeric value')
                 setLat2('')
            }else{
                setLat2Err('')
            }
        } else {
            setLat2Err('latitude for point 2 cannot be empty')    
        }
    }

    const validateLong1=()=>{
        if(longVal1.trim()){
           if(isNaN(longVal1.trim())) {
               setLong1Err('Please enter a valid numeric value')
               setLong1('')
            } else {
               setLong1Err('')
            }
        } else {
            setLong1Err('longitude for point 1 cannot be empty')
        }
    }

    const validateLong2=()=>{

        if(longVal2.trim()){
           if(isNaN(longVal2.trim())) {
              setLong2Err('Please enter a valid numeric value')
              setLong2('')
           } else {
              setLong2Err('')
           }
        } else {
            setLong2Err('longitude for point 2 cannot be empty')
        }
  }

    return(
        <View>
            <Input errorStyle={{ color: 'red' }} errorMessage={latVal1Err} style={styles.Input} onBlur={validateLat1} placeholder="Enter latitude for point 1" value={latVal1} onChangeText={setLat1}/>
            <Input errorStyle={{ color: 'red' }} errorMessage={longVal1Err} style={styles.Input} onBlur={validateLong1} placeholder="Enter longitude for point 1" value={longVal1} onChangeText={setLong1}/>
            <Input errorStyle={{ color: 'red' }} errorMessage={latVal2Err} style={styles.Input} onBlur={validateLat2} placeholder="Enter latitude for point 2" value={latVal2} onChangeText={setLat2} />
            <Input errorStyle={{ color: 'red' }} errorMessage={longVal2Err} style={styles.Input} onBlur={validateLong2} placeholder="Enter longitude for point 2" value={longVal2} onChangeText={setLong2}/>
            <Button style={styles.Button} containerStyle={styles.ButtonContainer} title='Calculate'  onPress={onPressCalculate} />
            <Button style={styles.Button} title='Clear' onPress={onPressClear} />
            <Text style={styles.Text}>{distance}</Text>
            <Text style={styles.Text}>{bearing}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin:5,
    },

    ButtonContainer: {
        marginVertical:10,
    },

    Button: {
        padding: 2,
        width:300,
    },

    Input: {
        flex: 0,
        padding: 5,
        width:300,
    },

    Text: {
        marginTop: 20,
    }

});

export default GeoCalculatorScreen;