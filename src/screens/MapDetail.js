import React, { Component } from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

class UserDetail extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <>
        <View style={styles.view}>
          <MapView 
            style={styles.view}
            initialRegion={{
              latitude: -6.1753924,
              longitude: 106.8249641,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  view:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default UserDetail;