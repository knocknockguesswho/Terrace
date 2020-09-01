import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SetLocation} from '../../redux/actions/Interface'
import HeaderTab from '../../components/header/Header';
import SearchLogo from '../../../assets/images/search-placeholder.svg';
import ChatLogo from '../../../assets/images/comment-dots-blue.svg';
import MapMarker from '../../../assets/images/map-marker-alt.svg';


import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  Image
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

class Contacts extends Component{
  constructor(props){
    super(props);
    this.state = {
      sendComp: 'Contacts',
      latitude: this.props.Interface.friends.latitude,
      longitude: this.props.Interface.friends.longitude
    }
  }

  // handleGoToChatroom = () =>{
  //   this.props.navigation.push('Chatroom', { friendsID: message.receiver_id, avatar: message.avatar, friendsName: message.receiver_name })
  // }

  handleComp = () =>{
    this.setState({sendComp: !this.state.sendComp})
  }

  geoLocation = async (avatar, fullname, email, username) =>{
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
          id: this.props.Interface.friends.id
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

  componentDidMount(){
    this.geoLocation();
  }
  


  render(){

    const friends = this.props.Interface.friends

    return(
      <>
        <HeaderTab totalFriends={friends.length} comp={this.state.sendComp} navigation={this.props.navigation} />
        <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
        <View style={styles.searchBarContainer}>
            <SearchLogo width={15} height={15} />
            <TextInput returnKeyType='search' placeholderTextColor='#B1B1B1' placeholder='Search Friends' style={styles.searchBar}/>
          </View>
          <View style={styles.userList}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {friends.map((friend, index)=>{
                return(
                  <View key={index} style={styles.userContainer}>
                    <TouchableOpacity onPress={()=>this.props.navigation.push('UserDetail', {
                        avatar: friend.avatar, 
                        fullname: friend.fullname,
                        email: friend.email,
                        username: friend.username,
                        latitude: friend.latitude,
                        longitude: friend.longitude
                      })} style={styles.friendAvatar}>
                      <Image 
                        source={{uri: `http:192.168.100.11:3000/uploads/${friend.avatar}`}}
                        style={{flex: 1, width: null, height: null, resizeMode:'cover', borderRadius: 100}}
                      />
                    </TouchableOpacity>
                    <View style={styles.friendNameContainer}>
                      <Text style={styles.friendName}>
                        {friend.fullname}
                      </Text>
                      <View textBreakStrategy='highQuality' style={styles.locationDisplay}>
                        <MapMarker width={10} height={10} />
                        <Text style={styles.locationText}>
                        Rembrandtlaan 2-10, 1399 VJ Muiderberg, Netherlands
                        </Text>
                      </View>
                    </View>
                    <View style={styles.chatLogoContainer}>
                      <TouchableOpacity onPress={()=>this.props.navigation.push('Chatroom', { friendsID: friend.id, avatar: friend.avatar, friendsName: friend.fullname })} >
                        <ChatLogo width={20} height={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </>
    )
  }
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  searchBarContainer:{
    width: '85%',
    height: height/25,
    backgroundColor: '#F1F1F1',
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  searchBar:{
    fontSize: 10,
    width: '100%'
  },
  userList:{
    width: '90%',
    height: '95%',
    // backgroundColor: 'yellow',
    alignSelf: 'center'
  },
  userContainer:{
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 65,
    // backgroundColor: 'aqua',
    flexDirection: 'row'
  },
  friendAvatar:{
    height: 65,
    width: 65,
  },
  friendNameContainer:{
    width: '65%',
    // backgroundColor: 'white',
    paddingLeft: 10,
    justifyContent: 'center',
    marginTop: -5,
  },
  friendName:{
    fontFamily:'Poppins-Bold',
    fontSize: 12,
    color: '#424242'
  },
  chatLogoContainer:{
    width: '20%',
    paddingTop: 20,
  },
  locationDisplay:{
    width: '80%',
    height: '20%',
    flexDirection: 'row'
  },
  locationText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    color: '#424242',
  }
});

const mapStateToProps = state =>({
  Interface: state.Interface
})

const mapDispatchToProps = {SetLocation}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);