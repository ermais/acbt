import React,{ useState,useEffect } from "react";
import { StyleSheet,View } from "react-native";
import { Colors,Button as PaperButton,Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function BusDetailComponent(props){




    return (
        <View style={{
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:0,
            left:0,           
            backgroundColor:Colors.blue500,
            height:'40%',
            width:'100%'
        }}>
            <Ionicons size={32} color={Colors.orange200} name="md-bus" />
            <Text style={styles.descText}>
                ታርጋ ቁጥር ፡ {props.bus[props.selectedBus].side_number}
            </Text >
            <Text style={styles.descText}>
                ke{props.bus[props.selectedBus].route.departure} wede {props.bus[props.selectedBus].route.destination}
            </Text>
            <PaperButton 
            mode="outlined"
            color={Colors.white}
            style={{
                backgroundColor:Colors.white,
                marginHorizontal:1,
                justifyContent:'flex-end',
            }}
                children={<Text>ይሄን ባስ ልጠብቀው</Text>}
                onPress={props.waitForBus}
            />

        </View>

    )
}



const styles = StyleSheet.create({
    descText: {
        justifyContent:'center',
        alignItems:'center',
        fontSize:18,
    }
})