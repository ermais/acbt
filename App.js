import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import MapViewScreen from './screens/MapViewScreen'
import {Button as PaperButton } from 'react-native-paper'

function SampleView(props){
  return (
    <View>
      <Text>...</Text>
    </View>
  )
}

function drawerComponent(props){
  return(
    <View style={{flex:1,justifyContent:'center'}}>
      <PaperButton
      icon="login"
      children={<Text>close</Text>}
      onPress={()=>props.navigation.navigate('login')}
      mode="contained"
      />
    </View>
  )
}
export default function App() {

  const Stack = createStackNavigator()
  const Draw = createDrawerNavigator()

  const Drawer = ()=>
  <Draw.Navigator drawerContent={drawerComponent}>
    <Draw.Screen name='map-home' component={MapViewScreen}  />
    {/* <Draw.Screen name='draw' component={SampleView} /> */}
  </Draw.Navigator>
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="signup" headerMode="none" >
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="map" component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
