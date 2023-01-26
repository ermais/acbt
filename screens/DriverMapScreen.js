import React, {
    Component,
    useState,
    useEffect
} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Touchable,
    Button
} from 'react-native'
import {
    Button as PaperButton,
    FAB,
    Colors,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import DriveHeader from '../components/DriverHeader';


import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import
MapView, {
    Callout,
    Marker,
    Polygon,
    Polyline,
    PROVIDER_GOOGLE,
}
from 'react-native-maps';
import {
    connect
} from 'react-redux';

import {
    addBus,
    addBusLocation,
    getBusLocation,
    changeBusLocation,
    updateBusLocation,
    deleteBus,
    getPassengers,
    getPassengersWaitingFor
} from '../redux/Action'


function DriverMapScreen(props) {
    const [drawerVisible, setDriverVisible] = useState(false);
    const [location, setLocation] = useState({
        latitude: 11.0947213,
        longitude: 39.7170459,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421});
    const [isSwitch, setIsSwitch] = useState(true);

    const onToggleMenu = () => {
        console.log('toggle drawer');
        const changedValue = !drawerVisible;
        if (changedValue) {
            console.log(drawerVisible);
            setDriverVisible(changedValue);
        } else {
            console.log(drawerVisible);
            setDriverVisible(changedValue);
        }
    }

    const onToggleSwitch = () => {
        let value = !isSwitch;
        if (value) {
            _getUserCurrentLocation()
            props.updateBusLocation(props.user, location)
            setIsSwitch(value)
        } else {
            props.deleteBus(props.user)
            setIsSwitch(value)
        }
    };

    const mapLocationToMarker = (passengers) => {
         return Object.values(passengers).map((value,index) =>{
            if (value.location){
                console.log(value,`value at index ${index}`)
                return <Marker draggable key={index} coordinate = {value.location}
            title = "Driver Location"
            onDrag = {
                () => console.log('dragging')
            }
            onDragEnd={({nativeEvent})=>props.updateBusLocation(props.user,nativeEvent.coordinate)}
            /> 
            }    
        }
        )
    }

    const _getUserCurrentLocation = async function () {
        console.log('get current location ')
        const uid = props.user;
        const {
            status
        } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('access denied');
        }

        const {
            coords
        } = await Location
            .getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                timeout: 10000,
            });
        console.log('current location----------------',coords)

        setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
        props.updateBusLocation(uid,coords)

        
    }

    const onRegionChange = (value) => {
        console.log(value)
        setLocation(value)
        props.updateBusLocation(props.user,{latitude:value.latitude,longitude:value.longitude})
    }


    const initialRegion = {
        latitude: 33.985805,
        longitude: -118.2541117,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    useEffect(() => {
        console.log('use effect')
        _getUserCurrentLocation()
        props.getPassengers()
    },[props.passengers])

    return ( 
        <View style={styles.container} >
            <View style={{
                    height: 50,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: Colors.blue900,
                    zIndex: 2,
                    elevation: 2,
                }} >
            <PaperButton children={
                <Icon name = "md-menu"
                size={32}
                color = {Colors.white}
                />}
                onPress = {onToggleMenu}
                /> 
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} >
                <Text> {isSwitch ? 'online' : 'offline'} </Text>  
                <Switch value={isSwitch}
                onValueChange={onToggleSwitch}
                />   
                </View>  
                </View> 
                <View style={{
                    flex:1,
                    
                }}> 
                <MapView region={location}

                onPress={(e)=>console.log(e,'map events')}

                onRegionChange={onRegionChange}

                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                scrollEnabled={true}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                toolbarEnabled
                minZoomLevel={13}
                >
                {

                    mapLocationToMarker(props.passengers)
                }
                </MapView>
                </View>
                <PaperButton children={<Text> Waitfor Bus </Text>} 
                    style={{
                            borderRadius: 0,
                            backgroundColor: Colors.green500,
                            zIndex:2,
                        }}
                    mode = 'contained'
                    onPress={() => props.navigation.navigate('wait')}
                />

                <FAB icon = 'plus'
                    small = {
                        false
                    }
                    style = {
                        styles.current
                    }
                    label = 'GO'
                    onPress = {
                        _getUserCurrentLocation
                    }
                />  
        </View>
                )
            }


const mapStateProps = state => ({
                passengers: state.passengers,
                location: state.location,
                user: state.user,
            })


export default connect(mapStateProps, {
                updateBusLocation,
                deleteBus,
                changeBusLocation,
                addBusLocation,
                getPassengers,
                getPassengersWaitingFor
            })(DriverMapScreen)

const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    position: 'relative',
                    overflow: 'visible'
                },
                header: {
                    flexDirection: 'row',
                    zIndex: 3,
                    backgroundColor: Colors.blue300,
                    elevation: 2,
                },
                map: {
                    flex: 1,
                    elevation: 1,
                    zIndex: 1,
                },
                menu: {
                    position: 'absolute',
                    top: 20,
                    left: 1,
                    flexDirection: 'row',
                    height: 45,
                    width: '100%',
                    elevation: 2,

                },
                fabStyle: {
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'white',
                    borderColor: Colors.amber500,
                    elevation: 2,
                    zIndex: 2,
                },
                current: {
                    position: 'absolute',
                    flex: 1,
                    margin: 16,
                    right: 0,
                    bottom: 50,
                    backgroundColor: 'white',
                    elevation: 2,
                    zIndex: 2,
                },})