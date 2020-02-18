import React,{Component,useState,useEffect} from 'react'
import {StyleSheet,View,SafeAreaView,KeyboardAvoidingView,Text} from 'react-native'
import {Button as PaperButton,TextInput} from 'react-native-paper'

export default function LoginScreen(props){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const getEmail =value=>{
        setEmail(value)
    }
    const getPassword = value=>{
        setPassword(value)
    }

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" >
            <TextInput 
            placeholder="Your email"
            label="Email"
            onChangeText={getEmail}
            value={email}
            style={styles.input}
            />
            <TextInput 
            placeholder="Password"
            secureTextEntry={true}
            label="Password"
            value={password}
            onChangeText={getPassword}
            style={styles.input}
            />
        
        <PaperButton
        icon="login"
        children={<Text>login</Text>}
        onPress={()=>props.navigation.navigate('map')}
        mode="contained"
        />
        </KeyboardAvoidingView>
    </SafeAreaView>

    )
}

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