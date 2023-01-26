import React,{ useState,useEffect } from "react";
import { View,StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Colors } from "react-native-paper";


export default function(props) {
    const [pinColor,setPinColor] = useState(Colors.orange50)

    const onMarkerPressed = ()=>{
        return function(index){
            props.setShowBusDesc(true)
            props.setSelectedBus(index)
            console.log(props.selectedBus,'props.selectedBus',index,'index',props.index,'props.index','outside marker pressed --------------------------------------')
            if(props.selectedBus === index){
                console.log('set colors,',Colors.blue500,'-----------------------------')
                setPinColor(Colors.blue500)
            }
        }
    }

    return (
<Marker draggable key={props.index} coordinate = {props.coordinate}
           title = {`driver at index ${props.index}`}
           onDragEnd = {(event)=>console.log(event,'event ...')}
           onPress={()=>onMarkerPressed()(props.index)}
           pinColor={pinColor}
           /> 
    )
}