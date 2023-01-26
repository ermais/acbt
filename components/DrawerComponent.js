import React from 'react'
import {View,Text} from 'react-native'
import {Button as PaperButton,Colors} from 'react-native-paper'
import {logoutUser} from '../redux/Action'
import {connect} from 'react-redux'

const DrawerComponent = props=>{
    return(
      <View style={{flex:1,justifyContent:'center'}}>
        <PaperButton
        icon="logout"
        children={<Text>close</Text>}
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

  export const DrawDrawer = connect(mapStateProps,{logoutUser,})(DrawerComponent)