import React, { useEffect } from 'react'
import {Header,Form,Picker,Button,Icon,Content,Left, Col,} from 'native-base'
import {DrawerActions} from '@react-navigation/native'
import { Appbar,Text,Colors } from 'react-native-paper'
import {View} from 'react-native'
import { getRoutes } from "../redux/Action";
import { connect } from "react-redux";


 function PassengerHeader(props){

  useEffect(()=>{
    getRoutes()
  },[])

  const mapRoutes = (key,index)=>{
    return <Picker.Item label={key} value={key} key={index} />
  } 
    return (
        <Appbar.Header style={{backgroundColor:Colors.green500,
        elevation:2,zIndex:2,position:'absolute',top:0,left:0}} >
            <Appbar.Action icon='menu' 
            onPress={()=>props.navigation.openDrawer()} />
            <Appbar.Content title={<Form style={{width:200,height:100}}>
            <Picker
              mode="dropdown" 
              placeholder="Where are u want to go?"
              style={{ flex:1,paddingVertical:10}}
              selectedValue={props.selectedRoute}
              onValueChange={props.onPickerValueChange}
            >
            {Object.keys(props.routes).maps((key,index)=>mapRoutes(key,index))}
            </Picker>
            </Form>} />
        </Appbar.Header>
    )
}
const mapStateToProps = state=>{
  routes:state.routes
}

export default connect(mapStateToProps,{getRoutes})(PassengerHeader)


