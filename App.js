import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import {firebase } from 'firebase'
import {NavigationContainer} from '@react-navigation/native'
import Home from './navigations/HomeNavigation'
import {Provider} from 'react-redux'
import Store from './redux/Store'

//screen
import HomeScreen from "./screens/HomeScreen";


export default function App() {

  useEffect(()=>{
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyBnlPKIPK47PZSCK8gzHRBsQbT33gDzxa8",
  //     authDomain: "asbt-86606.firebaseapp.com",
  //     databaseURL: "https://asbt-86606.firebaseio.com",
  //     projectId: "asbt-86606",
  //     storageBucket: "asbt-86606.appspot.com",
  //     messagingSenderId: "489605185854",
  //     appId: "1:489605185854:web:4b1ee9cdb86bd1dd0bac6f",
  //     measurementId: "G-4E0438406J"
  //   };
  
  
  
  // firebase.initializeApp(firebaseConfig)
  })

  return (
    <Provider store={Store} >
    <NavigationContainer >
      <Home />
    </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:400,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
