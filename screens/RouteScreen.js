import React,{useState,useEffect} from 'react'
import {Content,Header,Body,Title,Left,Segment, Container,Text} from 'native-base'
import {StyleSheet,View} from 'react-native'
import {FAB,Colors} from 'react-native-paper'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import  RouteHeader from "../components/RouteHeader";
import {connect} from 'react-redux'
import {getGooglePlacesAutocomplete}  from '../redux/Action'


import MapView, {
    Marker,
    Callout,
    Polygon,
    Polyline,
    PROVIDER_GOOGLE
}
from 'react-native-maps'
import GooglePlaceAutoComplete from '../components/GooglePlaceSearchAutoComplete'


function RouteScreen(props){
    const [coords,setCoords] = useState(
        {
            latitude:37.78825,
            longitude:-122.4324,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        }
    )
    const [start_loc,setStart_loc] = useState("")

    const _onChangeText = value=>{
        setStart_loc(value)
        props.getGooglePlacesAutocomplete(value)
    }

    useEffect(()=>{
        getUserCurrentLocation()
    })

    useEffect(()=>{
        
    })

    const getUserCurrentLocation = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        if(status==='granted'){
            const {coords} = await Location.getCurrentPositionAsync({})
            setCoords(coords)
        }
    }




    return (
    <Container style={styles.container}>
        <GooglePlaceAutoComplete 
            notifyChange={data=>console.log(data)}
        />
        {/* <RouteHeader _onChangeText={_onChangeText} start_loc={start_loc}  /> */}
       <MapView region={{
            latitude:coords.latitude,
            longitude:coords.longitude,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        }}

        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsCompass={true}
        toolbarEnabled={true}
        />
            <FAB icon='plus' small={false} style={styles.fabStyle} 
            onPress={()=>props.navigation.navigate('map')} />
        </Container>
    )
}

const mapStateProps = state =>({
    prediction:state.prediction
})

export default connect(mapStateProps,{getGooglePlacesAutocomplete})(RouteScreen)

const styles = StyleSheet.create({
    container:{
        position:'relative',
        flex:1,
    },
    fabStyle:{
        position:'absolute',
        margin:16,
        bottom:0,
        right:0,
        backgroundColor:'white'
    },
    map:{
        flex:1,
    }
})
