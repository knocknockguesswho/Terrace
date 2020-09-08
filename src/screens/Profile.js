import React, { Component } from 'react';
import {API_URL} from '@env';
import {connect} from 'react-redux'
import {SetLocation} from '../redux/actions/Interface'
import HeaderTab from '../components/header/Header';
import SettingButton from '../../assets/images/cog-circle.svg';
import MapMarkerLogo from '../../assets/images/map-marker-alt.svg';
import MapView, {Marker,AnimatedRegion} from 'react-native-maps';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      sendComp: 'Profile',
      latitude: this.props.Auth.data.latitude,
      longitude: this.props.Auth.data.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      error: null
    }
    this.map = null;
  }

  geoLocation = async (user_id) =>{
    await Geolocation.getCurrentPosition( 
      async position =>{
      const loc = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      if(this.state.latitude!=loc.latitude&&this.state.longitude!=loc.longitude){
        const data = {
          latitude: loc.latitude,
          longitude: loc.longitude,
          id: user_id
        }
        this.props.SetLocation(data).then(()=>{
          this.setState({
            latitude: data.latitude,
            longitude: data.longitude
          })
          .catch((err)=>{
            console.log(err)
          })
        })
      }
    },
      error=> Alert.alert('Error', JSON.stringify(error))
    )
  }

  handleGoToProfileSettings = () =>{
    this.props.navigation.push('ProfileSettings')
  }

  componentDidMount(){
    this.geoLocation(this.props.route.params.id)
  }

  async componentDidUpdate(nextState){
    const duration = 500

    if(this.state !== nextState){
      if(Platform.OS === 'android'){
        if(this.map){
          await this.map.animateCamera({center: {latitude: this.state.latitude, longitude: this.state.longitude}, pitch: 2, heading: 20, altitude: 200, zoom: 25}, duration)
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
          <TouchableOpacity onPress={()=>this.props.navigation.push('MapDetail')} activeOpacity={.5} style={styles.mapContainer}>
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
            <View style={{flexDirection:'row'}}>
              <View style={styles.avatarContainer}>
                <Image 
                  style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100}}
                  source={{uri: `${API_URL}/uploads/${data.avatar}`}}
                />
              </View>
              <TouchableOpacity onPress={this.handleGoToProfileSettings} activeOpacity={.8} style={styles.settingButton}>
                <SettingButton 
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
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
            <Text style={styles.locTitle}>Live Location</Text>
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
    borderRadius: 100,
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
  },
  settingButton:{
    marginLeft: -25,
    marginRight: 5,
    marginTop: 10
  }
});

const mapStateToProps = state =>({
  Auth: state.Auth,
  Interface: state.Interface
});

const mapDispatchToProps = {SetLocation}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);