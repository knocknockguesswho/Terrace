import React, { Component } from 'react';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import HeaderTab from '../components/header/Header';
import SearchLogo from '../../assets/images/search-placeholder.svg';
import AddUserLogo from '../../assets/images/user-plus-blue.svg';
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

class SearchUsers extends Component{
  constructor(props){
    super(props);
    this.state = {
      sendComp: 'SearchUsers',
      searchInput: '',
      isSearching: false,
      users: this.props.route.params.dataUsers
    }
  }

  // handleSearchUser = () =>{
  //   this.props.ShowAllUsers()
  //   .then((res)=>{
  //     this.setState({users: res.action.payload.data.data})
  //     console.log(res.action.payload.data.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  //   this.setState({searchInput: ''})
  // }


  render(){
    let users = this.props.route.params.dataUsers
    let filtered = users.filter(data=>{
      return data.avatar !== ''
    })
    console.log(users)
    return(
      <>
        <HeaderTab comp={this.state.sendComp} navigation={this.props.navigation} />
        <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
        <View style={styles.searchBarContainer}>
            <SearchLogo width={15} height={15} />
            <TextInput returnKeyType='search' placeholderTextColor='#B1B1B1' placeholder='Search Users' value={this.state.searchInput} onChangeText={(value)=>this.setState({searchInput: value})} onSubmitEditing={this.handleSearchUser} style={styles.searchBar}/>
          </View>
          <View style={styles.userList}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              {filtered.map((user, index)=>{
                <View key={index} style={styles.userContainer}>
                  <TouchableOpacity style={styles.friendAvatar}>
                    <Image 
                      source={{uri: `${API_URL}/uploads/${user.avatar}`}}
                      style={{flex: 1, width: null, height: null, resizeMode:'cover', borderRadius: 100}}
                    />
                  </TouchableOpacity>
                  <View style={styles.user_nameContainer}>
                    <Text style={styles.user_name}>
                      {user.fullname}
                    </Text>
                  </View>
                  <View style={styles.addUserLogoContainer}>
                    <TouchableOpacity>
                      <AddUserLogo width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                </View>
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
  user_nameContainer:{
    width: '65%',
    // backgroundColor: 'white',
    paddingLeft: 10,
    justifyContent: 'center',
    marginTop: -5,
  },
  user_name:{
    fontFamily:'Poppins-Bold',
    fontSize: 12,
    color: '#424242'
  },
  addUserLogoContainer:{
    width: '20%',
    paddingTop: 15,
  }
})

const mapStateToProps = state=>({
  users: state.users
});

// const mapDispatchToProps = {ShowAllUsers}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(SearchUsers);