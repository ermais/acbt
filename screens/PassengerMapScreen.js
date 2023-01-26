import React,{ useState,useEffect } from "react";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StyleSheet,View } from "react-native";
import Map,{ PROVIDER_GOOGLE,Marker,Polyline } from "react-native-maps";
import {updateUserLocation,getBusLocation,selectBus } from "../redux/Action";
import BusDetailComponent from "../components/BusDetailComponent";
import Ionicons from "react-native-vector-icons/Ionicons";

import PassengerHeader from "../components/PassengerHeader";

import { Colors,Button as PaperButton } from "react-native-paper";
import { Text } from "native-base";



const origin = {latitude: 11.0900749, longitude: 39.7174237};
const destination = {latitude: 11.1900749, longitude: 39.7274237};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDWNZWC4kSdgHHSaEcK0-Ee4WCE0vAqk_w';



function PassengerMapScreen(props){
    const [location, setLocation] = useState({latitude:11.33457,longitude:34.4545,
        longitudeDelta:0.05603771656751633,
        latitudeDelta:0.08836110942648823
    });

    const [showBusDesc,setShowBusDesc] = useState(false)
    const [selectedBus,setSelectedBus] = useState(null)
    const [waiting,setWaiting] = useState(false)
    const [selectedRoute,setSelectedRoute] = (0)

    const onPickerValueChange = (value)=>{
        setSelectedRoute(value)
    }





const onMarkerPressed = ()=>{
    return function(index){
        console.log('marker pressed----------------->',index,'index')
        setShowBusDesc(true)
        setSelectedBus(index)
        console.log(selectedBus,'selected bus ----------------->',index)
    }
}

const getPinColor = (index)=>{
    return selectedBus === index ? Colors.blue300 : Colors.orange500
}

const mapLocationToMarker = (bus) => {
        return Object.values(bus).map((value,index) =>{
           if (value.location){
            //    return <CustomMarker index={index} coordinate={value.location} 
            //     selectedBus={selectedBus}
            //     key={index}
            //    setSelectedBus={setSelectedBus} setShowBusDesc={setShowBusDesc}
            //    />

               return <Marker draggable key={index} coordinate = {value.location}
           title = {`driver at index ${index}`}
           onDragEnd = {(event)=>console.log(event,'event ...')}
           onPress={()=>onMarkerPressed()(index)}
           pinColor={selectedBus === index ? Colors.blue500 : Colors.orange50}
           /> 
           }
          
       }
       
       )

   }

   const onRegionChange = (value)=>{
       setLocation(value)
   }

   const _getUserCurrentLocation = async () => {
    const {status}  = await Permissions.getAsync(Permissions.LOCATION);
    console.log(status,'-------------------------')
    if (status === 'granted'){
    const {coords} = await Location
    .getCurrentPositionAsync({accuracy:Location.Accuracy.High,timeout:10000,});
    console.log(coords);
    setLocation({latitude:coords.latitude,longitude:coords.longitude,latitudeDelta: 0.09219,
        longitudeDelta: 0.06914,});
    props.updateUserLocation(props.passUID,{latitude:coords.latitude,longitude:coords.longitude})

    }

    

   }

   const waitForBus = ()=>{
       setShowBusDesc(false)
       setWaiting(true)
    //    getDirections(Object.values(props.bus)[selectedBus].location,location)
    //    props.navigation.navigate('wait-for')
   }

   const onEndWaitingPressed = ()=>{
       setWaiting(false)
   }



    useEffect(()=>{
        _getUserCurrentLocation()
        props.getBusLocation()
        
        
        // return ()=>{
        // setSelectedBus(0)
        // setShowBusDesc(false)
    // }
    },[selectedBus,waiting]);

    return (
        <View style={{
            position:'relative',
            flex:1,
        }}>
        <PassengerHeader selectedRoute={selectedRoute} onPickerValueChange={onPickerValueChange} />
        <Map

        onPress={(e)=>setShowBusDesc(false)}

        onRegionChange={onRegionChange}

        region={location}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        toolbarEnabled
        minZoomLevel={13}
        mapType="standard"
        >
            { !waiting ?
                mapLocationToMarker(props.bus)
                : null
            }

            {
            waiting ? 
            <Marker 
            coordinate={Object.values(props.bus)[selectedBus].location}
            title="bus waiting for"
            icon={<Ionicons name="md-bus" color={Colors.blueGrey100} size={32} />}
            pinColor={Colors.blue300}
            />


            :
            null 
        }
        </Map>

        { showBusDesc?
        <BusDetailComponent bus={Object.values(props.bus)} selectedBus={selectedBus}
        waitForBus={waitForBus} />
        :
        null
        }
        {
            waiting ?
            <PaperButton 
            style={{
                position:"absolute",
                bottom:0,
                left:0,
                justifyContent:'center'
            }}
            mode="contained"
            children={<Text>end waiting for bus</Text>}
            onPress={onEndWaitingPressed}
            />
            :
            null
        }
        

        </View>
    )
}

const mapStateToProps = (state)=>({
    bus:state.bus,
    passUID:state.passUID,
    selectedBus:state.selectedBus
})

export default connect(mapStateToProps,{getBusLocation,updateUserLocation,selectBus})(PassengerMapScreen);

const styles = StyleSheet.create({
    map:{
        flex:1,
    },
})