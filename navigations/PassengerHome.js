import React,{ useState,useEffect } from "react";
import {createStackNavigator} from '@react-navigation/stack'


//screen
import HomeScreen from "../screens/HomeScreen";
import PassengerMapScreen from "../screens/PassengerMapScreen";
import WaitForScreen from "../screens/WaitForScreen";
// import PassengerLoginScreen from "../screens/PassengerLoginScreen";

const Stack = createStackNavigator()

export default function PassengerHome(props){

    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="passenger-login" component={PassengerLoginScreen} /> */}
            <Stack.Screen name="passenger-map" component={PassengerMapScreen} />
            <Stack.Screen name="wait-for" component={WaitForScreen} />
        </Stack.Navigator>
    )
}