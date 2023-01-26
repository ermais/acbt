import React,{useState} from 'react';
import { View,Text,StyleSheet } from "react-native";
import {Appbar,Switch ,Colors,Button} from 'react-native-paper';
import  Icon  from "react-native-vector-icons/FontAwesome";


export default function DriverHeader(props){

  const [isSwitch,setIsSwicth] = useState(true);

  function toggleSwitch(value) {
    console.log(value);
    setIsSwicth(value);
  }

  return (
      <View style={styles.header}>
        <Icon.Button
        name='menu'
        onPress={()=>console.log('pressed')}
         />
        <Switch value={isSwitch} onValueChange={toggleSwitch} />
      </View>
  );
}


const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    height:100,
    width:'100%',
    position:'absolute',
    top:0,
    left:0,
    backgroundColor:Colors.blue200,
  }
})