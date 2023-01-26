import React,{useState,useEffect} from 'react'
import {View} from 'react-native'
import {Appbar,Searchbar,DefaultTheme} from 'react-native-paper'
import {connect} from 'react-redux'
import { getGooglePlacesAutocomplete } from "../redux/Action";

export default function RouteHeader(props){
    
    return (
        <View>
            <Searchbar placeholder="start location"
            value={props.start_loc}
             onChangeText={props._onChangeText} />
            <Searchbar placeholder="destination location"
             onChangeText={()=>console.log('start location')} />
        </View>
    )
}

