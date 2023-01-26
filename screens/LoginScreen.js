import React,{Component,useState,useEffect} from 'react'
import {StyleSheet,View,SafeAreaView,KeyboardAvoidingView,Text} from 'react-native'
import {Button as PaperButton,TextInput,ActivityIndicator} from 'react-native-paper'
import { connect } from 'react-redux'
import {loginUser} from '../redux/Action'




function LoginScreen(props){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    
    const getEmail =value=>{
        setEmail(value)
    }
    const getPassword = value=>{
        setPassword(value)
    }
    const handleLogin = async ()=>{
         props.loginUser(email,password,props)

    }



    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" >
            <TextInput 
            placeholder="email"
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

            
        {
            !props.loading ?

        <PaperButton
        icon="login"
        children={<Text>login</Text>}
        onPress={handleLogin}
        mode="contained"
        />

        :
        <ActivityIndicator animating={true} size='large' />
}
        </KeyboardAvoidingView>
    </SafeAreaView>

    )
}



const mapStateProps = state =>({
    user:state.user,
    loginSuccess:state.loginSuccess,
    error:state.error,
    loading:state.loading,
})

export default connect(mapStateProps,{loginUser})(LoginScreen)
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