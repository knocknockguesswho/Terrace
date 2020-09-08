import React, { Component } from 'react';
import MapView, {Marker} from 'react-native-maps';
import {API_URL} from '@env'
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Platform
} from 'react-native';

class UserDetail extends Component{
  constructor(props){
    super(props);
    this.map = null
  }

  render(){
    return(
      <>
        <View style={styles.view}>
          {/* <MapView 
            style={styles.view}
            initialRegion={this.props.route.params.mapData}
          ></MapView> */}
          <MapView
              ref={(map)=> {this.map = map;}}
              style={styles.view}
              initialRegion={this.props.route.params.data}
            >
              <Marker
                draggable
                coordinate={this.props.route.params.data}
                title={'Your Location'}
              >
                <Image 
                  source={{uri: `${API_URL}/uploads/${this.props.route.params.avatar}`}}
                  style={{flex: 1, height: 50, width: 50, resizeMode: 'cover', borderRadius: 100}}
                />
              </Marker>

            </MapView>
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