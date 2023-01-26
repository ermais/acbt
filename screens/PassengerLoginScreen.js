import React,{useState,useEffect} from 'react'
import {StyleSheet,View,SafeAreaView,KeyboardAvoidingView,Text} from 'react-native'
import {Button as PaperButton,TextInput,ActivityIndicator} from 'react-native-paper'
import { connect } from 'react-redux'
import {passLogin} from '../redux/Action'




function PassengerLoginScreen(props){
    const [phoneNumber,setPhoneNumber] = useState("")


    const handleLogin = async ()=>{
         props.passLogin(phoneNumber)
         props.navigation.navigate('passenger-map')

    }

    const getPhoneNumber = (val)=>{
        setPhoneNumber(val)
    }



    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" >
            <TextInput 
            placeholder="Phone number"
            label="Phone number"
            onChangeText={getPhoneNumber}
            keyboardType="number-pad"
            value={phoneNumber}
            style={styles.input}
            />
        <PaperButton
        icon="login"
        children={<Text>login</Text>}
        onPress={handleLogin}
        mode="contained"
        />
        </KeyboardAvoidingView>
    </SafeAreaView>

    )
}



const mapStateProps = state =>({
})

export default connect(mapStateProps,{passLogin})(PassengerLoginScreen)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:15,
    },
    input:{
        marginBottom:10,
        backgroundColor:'transparent'
    }
})