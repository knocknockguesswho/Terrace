import React, { Component } from 'react';
import HeaderTab from '../components/header/Header';
import MapMarkerLogo from '../../assets/images/map-marker-alt.svg';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  Alert,
  PermissionsAndroid
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';


class UserDetail extends Component{
  constructor(){
    super();
    this.state = {
      search: '',
      sendComp: 'UserDetail',
      latitude: -6.1753924,
      longitude: 106.8249641,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      error: null,
    }
    this.map = null;
  }
  // watchID: ?number = null

  
  handleComp = () =>{
    this.setState({sendComp: !this.state.sendComp})
  }


  requestLocationPermission = async () =>{
    try{
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ACCESSING LOCATION',
        message: "Your location will be updated.",
        buttonNeutral: 'Ask me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      })
      if(granted===PermissionsAndroid.RESULTS.GRANTED){
        console.log('Your position has been updated')
      } else{
        console.log('Access Location Permission Denied')
      }
    } catch(err){
      console.log(err)
    }
  }

  watchID = null;


  geoLocation = async () =>{
    await Geolocation.getCurrentPosition( async position =>{
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({latitude: loc.latitude, longitude: loc.longitude});
      },
      error=> Alert.alert('Error', JSON.stringify(error))
    );
  }





  async componentDidMount(){
    await this.requestLocationPermission();
    await this.geoLocation();
    console.log(this.props)
  }

  componentDidUpdate(nextState){
    const duration = 500

    if(this.state !== nextState){
      if(Platform.OS === 'android'){
        if(this.map){
          this.map.animateCamera({center: {latitude: this.state.latitude, longitude: this.state.longitude}, pitch: 2, heading: 20, altitude: 200, zoom: 16}, duration)
        } else{
          this.state.timing({
            ...nextState,
            duration
          }).start()
        }
      }
    }
  }

  componentWillUnmount(){
    this.watchID != null && Geolocation.clearWatch(this.watchID)
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
                  source={{uri: `http://192.168.100.11:3000/uploads/${this.props.route.params.avatar}`}}
                  style={{flex: 1, height: 50, width: 50, resizeMode: 'cover', borderRadius: 100}}
                />
              </Marker>

            </MapView>
          </TouchableOpacity>
          <View style={styles.userDetail}>
              <View style={styles.avatarContainer}>
                <Image 
                  style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100}}
                  source={{uri: `http://192.168.100.11:3000/uploads/${data.avatar}`}}
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
            <Text style={styles.locTitle}>{data.fullName}'s Location</Text>
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