import {Container,Content,Header,Left,Button,Title,Text} from 'native-base'
import React,{useEffect,useState} from 'react'
import {Button as PaperButton } from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections  from 'react-native-google-maps-directions'

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDxKclIthhfZzruu1SYFjaOkgX5Wyb7H7M';


export default function WaitForScreen(props){


    return (
        <Container style={{position:'relative'}}>
            <MapView
            style={{flex:1,}}
            provider={PROVIDER_GOOGLE}
                initialRegion={
                    {
                        latitude:37.78825,
                        longitude:-122.4324,
                        latitudeDelta:0.0922,
                        longitudeDelta:0.0421
                    }
                }
            followsUserLocation={true}
            showsUserLocation={true}
            showsCompass={true}
            mapType="hybrid"
            zoomControlEnabled={true}
            zoomEnabled
            zoomTapEnabled
            maxZoomLevel={13}
            
            >
                {/* <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                /> */}
            </MapView>
            <PaperButton children={<Text>End Wait for Bus</Text>} 
            style={{borderRadius:0}}
            mode='outlined'
            onPress={()=>props.navigation.navigate('map')} />
        </Container>
    )
}