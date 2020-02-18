import React,{Component} from 'react'
import {StyleSheet,View,KeyboardAvoidingView,SafeAreaView,Text} from 'react-native'
import {Button as PaperButton,TextInput,ThemeProvider} from 'react-native-paper'
import { DarkTheme } from '@react-navigation/native'

export default class SignupScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            display_name:"",
        }

        this._onChange = this._onChange
    }

    _onChange =key=>value=>{
        this.setState({[key]:value})
    }

    getEmail = this._onChange('email')
    getPassword = this._onChange('password')
    getDisplayname = this._onChange('display_name')

    render(){
        const {email,password,display_name} = this.state;
        return (
            <SafeAreaView style={styles.container} >
                <KeyboardAvoidingView behavior="padding" >
                    <TextInput 
                    placeholder="Your email"
                    label="Email"
                    onChangeText={this.getEmail}
                    value={email}
                    style={styles.input}
                    />
                    <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    label="Password"
                    value={password}
                    style={styles.input}
                    onChangeText={this.getPassword}

                    />
                    <TextInput 
                    placeholder="Display name"
                    label="Display name"
                    value={display_name}
                    style={styles.input}
                    onChangeText={this.getDisplayname}
                    />
                
                <PaperButton
                icon="login"
                children={<Text>signup</Text>}
                onPress={()=>this.props.navigation.navigate('login')}
                mode="contained"
                />
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:15,
    },
    input:{
        marginBottom:10,
        backgroundColor:'transparent',
    }
})