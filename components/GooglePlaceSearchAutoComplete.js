import React from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import {View,TouchableNativeFeedback,Text} from 'react-native'
import {Colors} from 'react-native-paper'

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default function GooglePlaceAutoComplete(props){

    return (
<GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
    //   keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed={true}    // true/false/undefined
      fetchDetails={true}
      renderDescription={row =><Text>{row.description}</Text>
        
    } // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            props.notifyChange(data)
    }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBo6f4pIiTffX6l8x9g2YKeefTP6he0xVk',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%',
          backgroundColor:'transparent',
          border:2,
          borderRadius:5,
          borderColor:Colors.orange200,
        },
        description: {
          fontWeight: 'bold',
          backgroundColor:'transparent'
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
          backgroundColor:'transparent'
        },
        listView:{
            backgroundColor:'transparent',
        },
        container:{
            backgroundColor:'green',
            paddingTop:30,
            
        },
        powered:{
            display:'none'
        },

      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
    //   currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    //   predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
    //   renderRightButton={() => <Text>Custom text after the input</Text>}
    />
    )
}



//AIzaSyBo6f4pIiTffX6l8x9g2YKeefTP6he0xVk