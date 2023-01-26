import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createStackNavigator()


export default function AuthStack(){
    return (
        <Stack.Navigator initialRouteName='login' >
                <Stack.Screen component={LoginScreen} name='login'
                options={{
                    headerShown:false,
                }}
                />
                <Stack.Screen component={SignupScreen} name='signup'
                options={{
                    headerShown:false,
                }}
                />
        </Stack.Navigator>
    )
}