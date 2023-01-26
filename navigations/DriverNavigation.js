import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

//screen
import LoginScreen from '../screens/LoginScreen'
import DriverMapScreen from "../screens/DriverMapScreen";
import DriverRouteSettingScreen from "../screens/DriverRouteSettingScreen";

const Stack = createStackNavigator()

function DriverHome(props){
    return (
        <Stack.Navigator>
            <Stack.Screen component={DriverMapScreen} name='driver-map' 
            options={{
                headerShown:false
            }}
            />
        </Stack.Navigator>
    )
}


export default function DriverNavigation(props){

    return (
        <Stack.Navigator>
            <Stack.Screen component={LoginScreen} name='login' options={{
                headerShown:false
            }} />
            <Stack.Screen component={DriverRouteSettingScreen} name="route-setting"
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen component={DriverHome} name='driver-home' 
            options={{
                headerShown:false
            }}  />
        </Stack.Navigator>
    )
}