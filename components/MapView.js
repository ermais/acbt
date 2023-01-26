import { React,useEffect,useState } from "react";
import { Container } from "native-base";



export default function MapViewContainer(props){

    return (
        <>
            <PassengerHeader  selectedValue={props.selectedValue} {...props} onValueChange={props.onValueChange} />
        <MapView region={props.location}

        initialRegion={props.initialRegion}
        style={styles.map}

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
        >
            { 

                props.mapLocationToMarker(props.location)
            }

        </MapView>
        </>
    )
}