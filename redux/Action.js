import firebase from 'firebase'
import RNGooglePlaces from 'react-native-google-places'
import {
    useNavigation
} from "@react-navigation/native";

import {
    SIGNUPUSER,
    SIGNIN,
    LOGOUT,
    GET_ERROR,
    LOADING,
    GOOGLE_PLACES_AUTOCOMPLETE,
    FETCH_BUS,
    ADD_BUS_LOCATION,
    GET_BUS_LOCATION,
    LOGIN_SUCCESS,
    GET_BUS_ON_SELECTED_ROUTE,
    GET_PASSENGER,
    GET_WAITING_FOR

}
from './ActionType'


// new action 

import {
    SET_USER_ROLE,
    SET_ROUTE,
    UPDATE_BUS_LOCATION,
    SELECT_ROUTE,
    PASSENGER_LOCATION,
    PASSENER_LOGIN,
    SELECT_BUS,
} from "./ActionType";
import {
    Logs
} from 'expo';

const firebaseConfig = {
    apiKey: "AIzaSyBnlPKIPK47PZSCK8gzHRBsQbT33gDzxa8",
    authDomain: "asbt-86606.firebaseapp.com",
    databaseURL: "https://asbt-86606.firebaseio.com",
    projectId: "asbt-86606",
    storageBucket: "asbt-86606.appspot.com",
    messagingSenderId: "489605185854",
    appId: "1:489605185854:web:4b1ee9cdb86bd1dd0bac6f",
    measurementId: "G-4E0438406J"
};



firebase.initializeApp(firebaseConfig)


export const createUser = (email, password) => dispatch => {
    dispatch({
        type: LOADING,
        payload: true,
    })
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            dispatch({
                type: SIGNUPUSER,
                payload: res
            })
        })
        .catch(error => {
            dispatch({
                type: GET_ERROR,
                payload: error,
            })
        })

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: true
            })
        } {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: false
            })
        }
    })
}
export const loginUser = (email, password, {
    navigation
}) => dispatch => {
    dispatch({
        type: LOADING,
        payload: true,
    })

    // firebase.auth()
    // .signOut()
    // dispatch({
    //     type:LOGOUT,
    //     payload:null,
    // })
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            dispatch({
                type: SIGNIN,
                payload: res.user.uid
            })
            navigation.navigate('route-setting')
        })
        .catch(error => {
            dispatch({
                type: GET_ERROR,
                payload: error,
            })
        })
    // firebase.auth()
    // .onAuthStateChanged(user=>{
    //     if(user){
    //         dispatch({
    //             type:LOGIN_SUCCESS,
    //             payload:true
    //         })
    //         navigation.navigate('route-setting')
    //     }else{
    //         dispatch({
    //             type:LOGIN_SUCCESS,
    //             payload:false,
    //         })
    //     }

    // })
}


export const getGooglePlacesAutocomplete = (input) => dispatch => {
    RNGooglePlaces.openAutocompleteModal()
        .then(res => {
            dispatch({
                type: GOOGLE_PLACES_AUTOCOMPLETE,
                payload: res
            })
        })
        .catch(error => {
            dispatch({
                type: GET_ERROR,
                payload: error,
            })
        })
}



export const logoutUser = navigation => dispatch => {
    firebase.auth()
        .signOut()
        .then(res => {
            dispatch({
                type: LOGOUT,
                payload: res,
            })
        })
        .catch(error => {
            console.log(error)
        })

    firebase.auth()
        .onAuthStateChanged(user => {
            navigation.navigate('auth-stack')
        })
}



export const fetchBusForSelectedRoute = route => dispatch => {
    firebase.database()
        .ref(`route/${route}`)
        .on('value', snapshoot => {
            dispatch({
                type: FETCH_BUS,
                payload: snapshoot.val()
            })
            console.log(snapshoot.val())
        })
}

export const addBus = (uid, coordinate, route) => dispatch => {
    firebase.database()
        .ref(`bus/${uid}/`)
        .set({
            location: coordinate,
        })
        .then(res => {
            console.log(res)
        })
}


export const addBusLocation = (uid, location) => dispatch => {
    firebase.database()
        .ref(`bus/${uid}/location`)
        .set({
            latitude: location.latitude,
            longitude: location.longitude
        })
        .then(res => {
            dispatch({
                type: ADD_BUS_LOCATION,
                payload: res,
            })
        })
        .catch(error => {
            dispatch({
                type: GET_ERROR,
                payload: error
            })
        })
}


export const getBusLocation = () => dispatch => {
    // let ref = uid ? `bus/${ro}` : 'bus'
    console.log('get bus locations')
    firebase.database()
        .ref(`bus`)
        .on('value', snapshot => {
            dispatch({
                type: GET_BUS_LOCATION,
                payload: snapshot.val(),
            })
        })
}


export const getChatSync = ()=>dispatch=>{
    firebase.database()
    .ref('chat').on('value',value=>console.log('chat',value.val()))
}



export const changeBusLocation = (key, location) => dispatch => {
    firebase.database()
        .ref(`bus/${key}/location`)
        .set({
            latitude: location.latitude,
            longitude: location.longitude,
        })
}



export const getBusOnSelectedRoute = (route) => dispatch => {
    const rootRef = firebase.database().ref()

    rootRef.child('route').orderByChild('departure')
        .equalTo(route).once('value', snapshoot => {
            rootRef.child('bus').orderByChild('route').equalTo(snapshoot.key)
                .once('value')
                .then(res => {
                    console.log('route on selected route ------------------------------------')
                    console.log(res.val())
                })
        })

}



// version 0.0.2

export const setUserRole = (role) => dispatch => {

    dispatch({
        type: SET_USER_ROLE,
        payload: role
    })
}

export const getRoutes = () => dispatch => {
    firebase.database().ref()
        .child('route')
        .once('value', snap => {
            dispatch({
                type: SET_ROUTE,
                payload: snap.val()
            })
        })
}

export const setDriverRoute = (user, route) => dispatch => {

    firebase.database().ref(`bus/${user}/route`)
        .set({
            departure: route.departure,
            destination: route.destination
        })

}

export const updateBusLocation = (user, location) => dispatch => {
    firebase.database().ref(`bus/${user}/location`)
        .set({
            latitude: location.latitude,
            longitude: location.longitude
        })
        .then(() => {
            dispatch({
                type: UPDATE_BUS_LOCATION,
                payload: location,
            })
        })
}


export const deleteBus = (user) => dispatch => {
    firebase.database().ref('bus')
        .child(user).remove(() => {
            console.log('successfully deleted!')
        })
}



// user modules


export const updateUserLocation = (user,location)=>dispatch=>{

    firebase.database()
    .ref(`passenger/${user}/location`)
    .set(location)
    .then(()=>{
        dispatch({
            type:PASSENGER_LOCATION,
            payload:location
        })
    })
}


export const selectBus =(val)=>dispatch=>{
    dispatch({
        type:SELECT_BUS,
        payload:val
    })
}


export const passLogin = (phoneNumber)=>dispatch=>{
    dispatch({
        type:PASSENER_LOGIN,
        payload:phoneNumber
    })
}


export const getPassengers = ()=>dispatch=>{
    firebase.database()
    .ref('passenger')
    .on('value',res=>{
        dispatch({
            type:GET_PASSENGER,
            payload:res.val()
        })
    })
}

export const getPassengersWaitingFor = (uuid)=>dispatch=>{
    firebase.database()
    .ref(`wait_for/${uuid}`)
    .on('value',res=>{
        dispatch({
            type:GET_WAITING_FOR,
            payload:res.val()
        })
    })
}