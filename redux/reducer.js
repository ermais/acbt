import {
    SIGNUPUSER,
    SIGNIN,
    LOGOUT,
    LOGIN_SUCCESS,
    GET_ERROR,
    LOADING,
    GOOGLE_PLACES_AUTOCOMPLETE,
    FETCH_BUS,
    ADD_BUS_LOCATION,
    GET_BUS_LOCATION,
    GET_BUS_ON_SELECTED_ROUTE,
    SET_USER_ROLE,
    SET_ROUTE,
    UPDATE_BUS_LOCATION,
    PASSENER_LOGIN,
    SELECT_BUS,
    GET_PASSENGER,
    GET_WAITING_FOR


}
from './ActionType'

const initialState = { 
    role:'',
    busLocation:null,
    routes:null,
    loading:false,
    loginSuccess:false,
    user:{},
    error:{},
    prediction:{},
    bus:{},
    location:{},
    selectedRoute:null,
    passUID:'',
    selectedBus:null,
    passengers:[],
    waitingList:[]
}


export const reducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_PASSENGER:
            return {
                ...state,
                passengers:action.payload
            }
        case GET_WAITING_FOR:
            return {
                ...state,
                waitingList:action.payload
            }
        case SELECT_BUS:
            return {
                ...state,
                selectedBus:action.payload
            }
        case PASSENER_LOGIN:
            return {
                ...state,
                passUID:action.payload
            }
        case SET_USER_ROLE:
            return {
                ...state,
                role:action.payload
            }
        case SET_ROUTE:
            return {
                ...state,
                routes:action.payload
            }
        case UPDATE_BUS_LOCATION:
            return {
                ...state,
                busLocation:action.payload
            }
        case SIGNUPUSER:
            return {
                ...state,
                user:action.payload,
                loading:false,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess:action.payload,
                loading:false,
            }
        case SIGNIN:
            return {
                ...state,
                user:action.payload,
                loading:false,
            }
        case LOGOUT:
            return {
                ...state,
                user:{},
                loginSuccess:false,
            }
        case GET_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false,
            }
        case LOADING:
            return {
                ...state,
                loading:action.payload
            }
        case GOOGLE_PLACES_AUTOCOMPLETE:
            return {
                ...state,
                prediction:action.payload
            }
        case FETCH_BUS:
            return {
                ...state,
                bus:action.payload
            }
        case ADD_BUS_LOCATION:
            return {
                ...state,
                current_location:action.payload
            }
        case GET_BUS_LOCATION:
            return {
                ...state,
                bus:action.payload
            }
        case GET_BUS_ON_SELECTED_ROUTE:
            return {
                ...state,
                selectedRoute:action.payload
            }
        default:
            return state
    }
}