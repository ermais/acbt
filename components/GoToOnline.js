import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Button as PaperButton} from 'react-native-paper'

export default function GoToOnline(props){

    return (
        <View style={styles.online}>
            <PaperButton
            style={styles.go_online}
            children={<Text>Go Online</Text>}
            // icon='md-home'
            mode='contained'
            onPress={props.goOnline}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    online:{
        flex:1,
        elevation:3,
        zIndex:3,
        position:'absolute',
        top:0,
        left:0,
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent'
    },
    go_online:{

    }
})