import React, { Component } from 'react';
import {API_URL} from '@env';
import HeaderTab from '../components/header/Header';
import MapMarkerLogo from '../../assets/images/map-marker-alt.svg';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';


class UserDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      search: '',
      sendComp: 'UserDetail',
      latitude: this.props.route.params.latitude,
      longitude: this.props.route.params.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      error: null,
    }
    this.map = null;
  }

  
  handleComp = () =>{
    this.setState({sendComp: !this.state.sendComp})
  }

  





  render(){

    const data = this.props.route.params
    return(
      <>
        <HeaderTab comp={this.state.sendComp} navigation={this.props.navigation} />
        <View style={{backgroundColor: 'white', flex: 1}}>
          <TouchableOpacity activeOpacity={.5} style={styles.mapContainer}>
            <MapView
              ref={(map)=> {this.map = map;}}
              style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
              }}
            >
              <Marker
                draggable
                coordinate={this.state}
                title={'Your Location'}
              >
                <Image 
                  source={{uri: `${API_URL}/uploads/${this.props.route.params.avatar}`}}
                  style={{flex: 1, height: 50, width: 50, resizeMode: 'cover', borderRadius: 100}}
                />
              </Marker>

            </MapView>
          </TouchableOpacity>
          <View style={styles.userDetail}>
              <View style={styles.avatarContainer}>
                <Image 
                  style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100}}
                  source={{uri: `${API_URL}/uploads/${data.avatar}`}}
                />
              </View>
              <Text style={styles.fullName}>{data.fullname}</Text>
              <View style={styles.biograph}>
                <View style={styles.bioEmail}>
                  <Text style={styles.bioSection}>Email: </Text>
                  <Text style={styles.bioContent}>{data.email}</Text>
                </View>
                <View style={styles.bioUname}>
                  <Text style={styles.bioSection}>Username: </Text>
                  <Text style={styles.bioContent}>{data.username}</Text>
                </View>
              </View>
          </View>
          <View style={styles.liveLoc}>
            <Text style={styles.locTitle}>{data.fullname}'s Location</Text>
            <MapMarkerLogo 
              width={35}
              height={35}
            />
            <Text style={styles.location}>
              Rembrandtlaan 2-10, 1399 VJ Muiderberg, Netherlands
            </Text>
          </View>
        </View>
      </>
    )
  }
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  mapContainer:{
    width: width,
    height: height/3.5,
  },
  userDetail:{
    width: width,
    height: '100%',
    // backgroundColor: 'yellow',
    paddingTop: 30,
    alignItems: 'center',
  },
  avatarContainer:{
    width: width/4,
    height: width/4,
    backgroundColor:'white',
    borderRadius: 100
  },
  fullName:{
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: '#424242'
  },
  biograph:{
    width: '70%',
    // backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 15
  },
  bioEmail:{
    flexDirection: 'row'
  },
  bioUname:{
    flexDirection: 'row'
  },
  bioSection:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#424242'
  },
  bioContent:{
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#424242'
  },
  liveLoc:{
    width: width,
    height: height/4,
    backgroundColor: '#188FDE',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50
  },
  locTitle:{
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: 'white',
    marginBottom: 15
  },
  location:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: 'white',
    marginTop: 10,
    paddingLeft: 15
  }
});

export default UserDetail;