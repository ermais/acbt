import React, { useState, useEffect } from "react";
import { Text,StyleSheet } from "react-native";
import { Container, Header, Content, Form, Item, Picker,Icon } from 'native-base';
import { Button as PaperButton,TextInput as PaperTextInput,
  ActivityIndicator
} from "react-native-paper";
import { connect } from "react-redux";
import { getRoutes,setDriverRoute } from "../redux/Action";


function DriverRouteSettingScreen(props){
    const [paletteNumber,setPaletteNumber]=useState('')
    const [selectdRoute,setRoute]=useState('')

    const onValueChange=(value)=>{
        console.log(value)
        setRoute(value)
        
    }

    const mapRouteToPicker=(key,index)=>{
        return <Picker.Item key={index} label={key} value={key || ''} />
    }



    const onPaletteChange=(value)=>{
        setPaletteNumber(value)
    }

    const onSaveRouteSetting=()=>{
        // const route = {...props.routes[selectdRoute],name:selectdRoute}
        // console.log(route)
        // props.setDriverRoute(props.user,route)
        props.navigation.navigate('driver-home')
        console.log('---end of--')
    }

    useEffect(()=>{
        props.getRoutes()
    },[])
    return (
      <>
      {
        !props.routes ?
        <ActivityIndicator style={styles.spinner} animating={true} size="large" />
        :
        <Container>
          
          <Header />
          <Content contentContainerStyle={styles.content} >
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined,...styles.gridGap }}
                  placeholder="Select route"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={selectdRoute}
                  onValueChange={onValueChange}
                  
                >
                    {
                       Object.keys(props.routes).map((key,index)=>mapRouteToPicker(key,index))
                    }
                </Picker>
              </Item>
            </Form>
            <PaperTextInput 
            value={paletteNumber}
            mode="outlined"
            style={styles.gridGap}
            onChangeText={onPaletteChange}
            keyboardType='numeric'
            placeholder="palette number" />

            <PaperButton 
            dark
            style={{...styles.gridGap,...styles.button}}
                onPress={onSaveRouteSetting}
            children={<Text>continue</Text>}
            mode="outlined"
            />

          </Content>
        </Container>
        }
        </>
      );
}

const mapStateToProps=state=>({
    user:state.user,
    routes:state.routes
})

export default connect(mapStateToProps,{getRoutes,setDriverRoute})(DriverRouteSettingScreen)

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:24
        // alignItems:'center'
    },
    gridGap:{
      marginBottom:12
    },
    button:{
      alignSelf:'center',
      fontSize:24,
    },
    spinner:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
})