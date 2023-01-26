import React,{Component} from 'react'
import {StyleSheet,View,KeyboardAvoidingView,SafeAreaView,Text} from 'react-native'
import {Button as PaperButton,TextInput,ThemeProvider,ActivityIndicator} from 'react-native-paper'
import {createUser} from '../redux/Action'
import {connect} from 'react-redux'




class SignupScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            display_name:"",
        }

        this._onChange = this._onChange
        this.handleLogin = this.handleLogin
        this.signupSuccess = this.signupSuccess
    }

    _onChange =key=>value=>{
        this.setState({[key]:value})
    }
    getEmail = this._onChange('email')
    getPassword = this._onChange('password')
    getDisplayname = this._onChange('display_name')


    UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps.loading)
        if(nextProps.error !== this.props.error){
            console.log(nextProps)
        }
    }


    signupSuccess(){
        if(this.props.loginSuccess){
            this.props.navigation.navigate('main-tab')
        }
    }


    handleSignup(){
        this.props.createUser(this.state.email,this.state.password)
        this.signupSuccess()
    }

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
                
                {this.props.loading ?
                                <ActivityIndicator
                                animating={true}
                                size='large'
                                />
                                :
                                <PaperButton
                                icon="login"
                                children={<Text>signup</Text>}
                                onPress={this.handleLogin}
                                mode="contained"
                                />
                                
                                

            }

                <PaperButton
                children={<Text>Already have account</Text>}
                onPress={()=>this.props.navigation.navigate('login')}
                />
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const mapStateProps = state=>({
    user:state.user,
    signupSuccess:state.loginSuccess,
    error:state.error,
    loading:state.loading,
})


export default connect(mapStateProps,{createUser})(SignupScreen)

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