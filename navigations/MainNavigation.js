import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import  Ionicons from 'react-native-vector-icons/Ionicons'
import RouteScreen from '../screens/RouteScreen'
import MapViewScreen from '../screens/DriverMapScreen'
import WaitForScreen from '../screens/WaitForScreen'
import {View,Text} from 'react-native'
import {Button as PaperButton,Colors} from 'react-native-paper'
import PassengerHeader from '../components/PassengerHeader'
import RouteHeader from '../components/RouteHeader'
import {logoutUser} from '../redux/Action'
import {connect} from 'react-redux'
import {DrawDrawer} from '../components/DrawerComponent'


function SampleView(props){
    return (
      <View>
        <Text>...</Text>
      </View>
    )
  }
  
  
  const Stack = createStackNavigator()
  const Draw = createDrawerNavigator()
  const BottomTab = createBottomTabNavigator()





// function MainStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen component={MapViewScreen} name='map'
//             options={{
//               headerShown:false,
//             }}
//             />
//             <Stack.Screen component={WaitForScreen} name='wait' 
//             options={{
//               headerShown:false,
//             }}
//             />
//         </Stack.Navigator>
//     )
// }

function MainStack() {
      return (
          <Stack.Navigator>
              <Stack.Screen component={MapViewScreen} name='map'
              options={{
                headerShown:false,
              }}
              />
              <Stack.Screen component={WaitForScreen} name='wait' 
              options={{
                headerShown:true,
                headerStyle:{
                  backgroundColor:Colors.green500,
                },
                headerLeft:null,
              }}
              />
              <Stack.Screen component={RouteScreen} name='route'
              options={{
                headerShown:false,
              }}
              />
          </Stack.Navigator>
      )
  }

//  function MainTab() {
//     return (
//         <BottomTab.Navigator tabBarOptions={{
//           showLabel:false,
//           // activeTintColor:'orangered'
//         }} >
//             <BottomTab.Screen component={MainStack} name='main-stack'
//             options={{
//               tabBarIcon:({focused=true,color='black',size=34})=>(
//                 <Ionicons name="md-map" focused={focused} color={color} size={size} />
//               ),
//               headerShown:false,
//             }}
//             />
//             <BottomTab.Screen component={RouteScreen} name='route'
//             options={{
//               tabBarIcon:({focused=true,color='black',size=34})=>(
//                 <Ionicons name="md-camera" focused={focused} color={color} 
//                 size={size}
//                 />
//               ),
//               headerShown:false,
//             }}
//             />
//         </BottomTab.Navigator>
//     )
// }

// default function MainNavigation(){
//     return (
//         <NavigationContainer>
//             <MainTab />
//         </NavigationContainer>
//     )
// }


const DrawerComponent = props=>{
  return(
    <View style={{flex:1,justifyContent:'center'}}>
      <PaperButton
      icon="logout"
      children={<Text>logout</Text>}
      onPress={()=>props.logoutUser(props.navigation)}
      mode="contained"
      />
    </View>
  )
}

const mapStateProps = state =>({
  user:state.user
})

// export default connect(mapStateProps,{logoutUser,})(DrawerComponent)

// const DrawDrawer = connect(mapStateProps,{logoutUser,})(DrawerComponent)


export default function MainNav(){
    return (
        <Draw.Navigator 
        drawerContent={props=><DrawDrawer {...props} />}
        >
            <Draw.Screen name='main-drawer' component={MainStack}
            />
        </Draw.Navigator>
    )
}