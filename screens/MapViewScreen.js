import React,{Component} from 'react'
import {StyleSheet,View,SafeAreaView,Text} from 'react-native'
import {Button as PaperButton} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Constants}  from 'expo-constants'
import
MapView, 
{Callout,
Marker,
Polygon,
Polyline,
PROVIDER_GOOGLE,
}
from 'react-native-maps'

export default function MapViewScreen(props){
    const initialRegion = {
        latitude:37.78825,
        longitude:-122.4324,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    }

    return(
    <View style={styles.container}>
        <MapView initialRegion={initialRegion}
        zoomControlEnabled={false}
        pitchEnabled={false}
        zoomTapEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        />
        
        <PaperButton
            style={styles.menu}
            children={<Ionicons size={34} name="md-menu" color={'rgba(0,0,0,0.75)'} />}
            onPress={()=>props.navigation.openDrawer()}
        />

    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    },
    map:{
        flex:1,
    },
    menu:{
        position:'absolute',
        top:20,
        left:1,
        
    }
})