import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Logout} from '../../redux/actions/Auth';
import {ShowAllUsers} from '../../redux/actions/Interface';
import TerraceLogo from '../../../assets/images/terrace-logo.svg';
import DummyAvatar from '../../../assets/images/raven_profile.jpg';
import MapMarkerLogo from '../../../assets/images/map-marker-alt.svg';
import AddUserLogo from '../../../assets/images/user-plus-white.svg';
import OptionsLogo from '../../../assets/images/three-dots.svg';
import BackLogo from '../../../assets/images/angle-left.svg';
import LogoutLogo from '../../../assets/images/sign-out-alt.svg';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

const Header = (props) =>{

  const [comp_uses, setComp_uses] = useState({
    comp: props.comp
  });

  const handleGoToProfile = () =>{
    props.navigation.push('Profile', {
      avatar: props.Auth.data.avatar, 
      fullname: props.Auth.data.fullname,
      email: props.Auth.data.email,
      username: props.Auth.data.username
    });
  }

  const handleGoToSearchUsers = () =>{
    props.ShowAllUsers()
    .then((res)=>{
      props.navigation.push('SearchUsers', {dataUsers: res.action.payload.data.data});
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleGoBack = () =>{
    props.navigation.goBack();
  }

  const handleLogout = () =>{
    props.Logout()
    props.navigation.push('Signin');
  }

  // const handleSearchUser = () =>{
  //   props.ShowAllUsers()
  //   .then((res)=>{
  //     this.setState({users: res.action.payload.data.data})
  //     console.log(res.action.payload.data.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  //   this.setState({searchInput: ''})
  // }





  const ContactsCompLeft = ()=>{
    return(
      <>
        <View style={{paddingTop: 15}}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12, color: 'white'}}>Total Contacts</Text>
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 8, color: 'white'}}>{props.totalFriends} contacts</Text>
        </View>
      </>
    )
  }

  const ChatsCompLeft = ()=>{
    return(
      <>
        <TouchableOpacity onPress={handleGoToProfile} activeOpacity={.5} style={styles.chatComponent}>
          <View style={styles.avatar}>
            <Image 
              style={{flex: 1, width: null, height: null, resizeMode:'cover', borderRadius: 100}}
              source={{uri: `http://192.168.1.9:3000/uploads/${props.Auth.data.avatar}`}}
             />
          </View>
          <View style={styles.profileDetail}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 12, color: 'white'}}>{props.Auth.data.fullname}</Text>
            <View>
              <View style={{flexDirection: 'row'}}>
                <MapMarkerLogo width={15} height={15} />
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 6, color: 'white'}}>Rembrandtlaan 2-10, 1399 VJ Muiderberg, Netherlands</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  const PhoneCompLeft = ()=>{
    return(
      <>
        <Text>Phone</Text>
      </>
    )
  }

  const ProfileCompLeft = ()=>{
    return(
      <>
        <View style={{ width: '60%', height: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity activeOpacity={.5} onPress={handleGoBack}>
              <BackLogo width={12} height={12} />
            </TouchableOpacity>
          </View>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white'}}>Profile</Text>
          </View>
        </View>
      </>
    )
  }

  const UserDetailCompLeft = ()=>{
    return(
      <>
        <View style={{ width: '75%', height: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity activeOpacity={.5} onPress={handleGoBack}>
              <BackLogo width={12} height={12} />
            </TouchableOpacity>
          </View>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white'}}>User Detail</Text>
          </View>
        </View>
      </>
    )
  }

  const ProfileSettingsCompLeft = ()=>{
    return(
      <>
        <View style={{ width: '60%', height: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity activeOpacity={.5} onPress={handleGoBack}>
              <BackLogo width={12} height={12} />
            </TouchableOpacity>
          </View>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white'}}>Settings</Text>
          </View>
        </View>
      </>
    )
  }

  const ChatroomCompLeft = ()=>{
    return(
      <>
        <View style={{ width: '120%', height: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity activeOpacity={.5} onPress={()=>props.navigation.push('Home')}>
              <BackLogo width={12} height={12} />
            </TouchableOpacity>
          </View>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity onPress={handleGoToProfile} activeOpacity={.5} style={styles.chatComponent}>
              <View style={styles.avatar}>
                <Image 
                  style={{flex: 1, width: null, height: null, resizeMode:'cover', borderRadius: 100}}
                  source={{uri: `http://192.168.1.9:3000/uploads/${props.data.avatar}`}}
                />
              </View>
              <View style={styles.profileDetail}>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 12, color: 'white'}}>{props.data.friendsName}</Text>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <MapMarkerLogo width={15} height={15} />
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 6, color: 'white'}}>Rembrandtlaan 2-10, 1399 VJ Muiderberg, Netherlands</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  
  const SearchUsersCompLeft = ()=>{
    return(
      <>
        <View style={{ width: '100%', height: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <TouchableOpacity activeOpacity={.5} onPress={handleGoBack}>
              <BackLogo width={12} height={12} />
            </TouchableOpacity>
          </View>
          <View style={{height: '100%', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white'}}>Search Users</Text>
          </View>
        </View>
      </>
    )
  }




  const ContactsCompRight = ()=>{
    return(
      <>
        <TouchableHighlight style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <OptionsLogo width={15} height={15} />
        </TouchableHighlight>
      </>
    )
  }

  const ChatsCompRight = ()=>{
    return(
      <>
        <TouchableOpacity activeOpacity={.5} onPress={handleGoToSearchUsers} style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <AddUserLogo width={20} height={20} />
        </TouchableOpacity>
      </>
    )
  }

  const PhoneCompRight = ()=>{
    return(
      <>
        <Text>Phone</Text>
      </>
    )
  }
  
  const ProfileCompRight = ()=>{
    return(
      <>
        <TouchableOpacity onPress={handleLogout} style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <LogoutLogo width={15} height={15} />
        </TouchableOpacity>
      </>
    )
  }

  const UserDetailCompRight = ()=>{
    return(
      <>
        <TouchableHighlight style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <OptionsLogo width={15} height={15} />
        </TouchableHighlight>
      </>
    )
  }

  const ProfileSettingsCompRight = ()=>{
    return(
      <>
        <TouchableHighlight style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <OptionsLogo width={15} height={15} />
        </TouchableHighlight>
      </>
    )
  }

  const ChatroomCompRight = ()=>{
    return(
      <>
        <TouchableHighlight style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <OptionsLogo width={15} height={15} />
        </TouchableHighlight>
      </>
    )
  }

  const SearchUsersCompRight = ()=>{
    return(
      <>
        <TouchableHighlight style={{alignSelf:"flex-end", justifyContent: 'center', height: '100%'}}>
          <OptionsLogo width={15} height={15} />
        </TouchableHighlight>
      </>
    )
  }

  
//MAIN HEADER COMPONENT//
  return(
    <>
      <View style={styles.tabContainer}>
        <View style={styles.leftSection}>
          {comp_uses.comp === 'Phone' ? PhoneCompLeft() : comp_uses.comp === 'Chats' ? ChatsCompLeft() : comp_uses.comp === 'Contacts' ? ContactsCompLeft() : comp_uses.comp === 'Profile' ? ProfileCompLeft() : comp_uses.comp === 'UserDetail' ? UserDetailCompLeft() : comp_uses.comp === 'ProfileSettings' ? ProfileSettingsCompLeft() : comp_uses.comp === 'Chatroom' ? ChatroomCompLeft() : comp_uses.comp === 'SearchUsers' ? SearchUsersCompLeft() : <Text></Text>}
        </View>
        <View style={styles.rightSection}>
        {comp_uses.comp === 'Phone' ? PhoneCompRight() : comp_uses.comp === 'Chats' ? ChatsCompRight() : comp_uses.comp === 'Contacts' ? ContactsCompRight() : comp_uses.comp === 'Profile' ? ProfileCompRight() : comp_uses.comp === 'UserDetail' ? UserDetailCompRight() : comp_uses.comp === 'ProfileSettings' ? ProfileSettingsCompRight() : comp_uses.comp === 'Chatroom' ? ChatroomCompRight() : comp_uses.comp === 'SearchUsers' ? SearchUsersCompRight() : <Text></Text>}
        </View>
      </View>
    </>
  )
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  tabContainer:{
    width: width,
    height: height/14,
    backgroundColor: '#188FDE',
    paddingLeft: width/14,
    paddingRight: width/14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#424242',
    shadowOffset: {height: 20},
    shadowOpacity: .9,
    shadowRadius: 15,
  },
  terraceLogo:{
    alignSelf: "center",
    marginTop: -height/20
  },
  leftSection:{
    height: '100%',
    width: '40%'
  },
  rightSection:{
    // backgroundColor: 'yellow',
    height: '100%',
    width: '40%'
  },
  chatComponent:{
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  avatar:{
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 100
  },
  profileDetail:{
    width: '65%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5
  }
})

const mapStateToProps = state =>({
  Auth: state.Auth
});

const mapDispatchToProps = {Logout, ShowAllUsers};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);