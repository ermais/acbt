import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AuthStack from './AuthNavigation'
import MainNav from './MainNavigation'
import PassengerHeader from '../components/PassengerHeader'

import HomeScreen from "../screens/HomeScreen";
import PassengerHome from "./PassengerHome";
import  DriverNavigation  from "./DriverNavigation";


const NativeStack = createStackNavigator()

export default function(props){
    return (
    <NativeStack.Navigator>
        <NativeStack.Screen component={HomeScreen} name='home' 
                options={{
                    headerShown:false,
                }}
        />
        <NativeStack.Screen component={PassengerHome} name='passenger-home'
        options={{
            headerShown:false,
        }}

        
        />
        <NativeStack.Screen component={DriverNavigation} name='driver'
        
        options={{
            headerShown:false
        }}
        />
        {/* <NativeStack.Screen component={MainNav} name='main-tab'
        options={
            {
                headerShown:false,
            }
        }
        /> */}
    </NativeStack.Navigator>
    )
}