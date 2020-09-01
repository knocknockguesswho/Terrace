import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ShowLastMessages, ShowFriends} from '../../redux/actions/Interface';
import HeaderTab from '../../components/header/Header';
import ChatLogo from '../../../assets/images/comment-dots-circle.svg';
import SearchLogo from '../../../assets/images/search-placeholder.svg';
import DefaultAvatar from '../../../assets/images/user-circle.svg';

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

import io from 'socket.io-client';

class Chats extends Component{
  constructor(){
    super();
    this.state = {
      sendComp: 'Chats',
      chat: '',
      avatar: '',
      username: '',
      latest_conversations: []
    }
  }

  handleComp = () =>{
    this.setState({sendComp: !this.state.sendComp})
  }

  handleShowMessage = () =>{
    this.props.ShowLastMessages(this.props.Auth.data.id)
    .then((res)=>{
      this.setState({
        latest_conversations: res.payload.data.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  handleShowFriends = () =>{
    this.props.ShowFriends(this.props.Auth.data.id)
  }

  async componentDidMount(){
    this.socket = io('http://192.168.100.11:3000');
    await this.socket.on('last-message', msg=>{
      const test = this.state.latest_conversations;
      const objInd=test.findIndex(data=>data.id===msg.id)
      this.setState({
        latest_conversations: msg
      })
      console.log(msg, 'msg')
    })
    this.handleShowMessage();
    this.handleShowFriends();
  }
  
  componentWillUnmount(){
    this.socket.removeAllListeners();
    this.socket.disconnect()
  }

  

  render(){

    const user_id = this.props.Auth.data.id;
    const friends = this.props.Interface.friends;
    
    
    let conversations = this.state.latest_conversations

    let removeDuplicate = conversations.reduce((acc, current)=>{
      const dupl = acc.find(data => data.id_ur === current.id_us);
      if(!dupl){
        return acc.concat([current]);
      } else{
        return acc
      }
    }, []);

    return(
      <>
        <HeaderTab comp={this.state.sendComp} navigation={this.props.navigation} />
        {this.props.Auth.data.isLogin? 
          this.props.navigation.push('Signin') :
          <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
            <View style={styles.searchBarContainer}>
              <SearchLogo width={15} height={15} />
              <TextInput returnKeyType='search' placeholderTextColor='#B1B1B1' placeholder='Search Conversations' style={styles.searchBar}/>
            </View>
            <View style={styles.chatList}>
              <ScrollView showsVerticalScrollIndicator={false}>

                {removeDuplicate.map((message, index)=>{
                    const timeUnix = Date.parse(message.created_at);
                    const time = new Date(timeUnix).toLocaleTimeString('id-ID');
                    return(
                      <TouchableOpacity key={index} activeOpacity={.5} onPress={()=>this.props.navigation.push('Chatroom', { 
                        friendsID: message.id_ur!==user_id? message.id_ur : message.id_us, 
                        avatar: message.id_ur!==user_id? message.receiver_avatar : message.sender_avatar, 
                        friendsName: message.id_ur!==user_id? message.receiver_fullname : message.sender_fullname
                      })} style={styles.chatContainer}>
                        <View style={styles.friendsAvatar}>
                          <Image
                            source={{uri: `http://192.168.100.11:3000/uploads/${message.id_ur!==user_id? message.receiver_avatar : message.sender_avatar}`}}
                            style={{flex: 1, width: null, height: null, resizeMode:'cover', borderRadius: 100}}
                          />
                        </View>
                        <View style={styles.messageText}>
                          <Text style={styles.friendsName}>
                            {message.id_ur!==user_id? message.receiver_fullname : message.sender_fullname}
                          </Text>
                          <Text textBreakStrategy='highQuality' style={styles.messageDisplay}>
                            {message.message}
                          </Text>
                        </View>
                        <View style={styles.messageTimeStamp}>
                          <Text style={styles.timeStampText}>{time.substr(0,1)=='0'? time.substr(1, 4) : time.substr(0, 5)} {time.substr(-2)=='AM'? 'AM':'PM'}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                })}

              </ScrollView>
            </View>
          </View>
        }
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
  chatList:{
    width: '90%',
    height: '95%',
    alignSelf: 'center'
  },
  chatContainer:{
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 65,
    flexDirection: 'row'
  },
  friendsAvatar:{
    height: 65,
    width: 65,
  },
  messageText:{
    width: '65%',
    paddingLeft: 10,
    justifyContent: 'center',
    marginTop: -5,
  },
  messageTimeStamp:{
    width: '20%',
    paddingTop: 15
  },
  timeStampText:{
    color: '#B1B1B1',
    fontFamily: 'Poppins-Regular',
    fontSize: 8
  },
  friendsName:{
    fontFamily:'Poppins-Bold',
    fontSize: 12,
    color: '#424242'
  },
  messageDisplay:{
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    color: '#424242',
    width: '80%',
    height: '20%'
  }
});

const mapStateToProps = state=>({
  Auth: state.Auth,
  Interface: state.Interface
})

const mapDispatchToProps = {ShowLastMessages, ShowFriends}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);