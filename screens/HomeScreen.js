import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import { Button as PaperButton,Colors } from "react-native-paper";
import { View,Text,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { setUserRole } from "../redux/Action";


 function HomeScreen(props){
     const navigation = useNavigation()


    const continueAsDriver =()=>{
        props.setUserRole('driver')
        navigation.navigate('driver')
    }

    const continueAsPassenger = ()=>{
        props.setUserRole('passenger')
        navigation.navigate('passenger-home')
    }

    return (
        <View style={styles.container}>
        <PaperButton children={<Text>Continue As Driver</Text>}
        mode="contained"
        style={styles.button}
        onPress={continueAsDriver} />
        <PaperButton children={<Text>Continue As Passenger</Text>}
        mode="outlined"
        color={Colors.blue800}
        
        style={styles.button}
        onPress={continueAsPassenger} />
        </View>
    )
}

const mapStateToProps=(state)=>({
    role:state.role
})

const mapDispatchToAction=action=>({
    setUserRole:action.setUserRole
})

export default connect(mapStateToProps,{setUserRole})(HomeScreen)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        marginBottom:12,
        padding:2,
        fontSize:32
    }
})