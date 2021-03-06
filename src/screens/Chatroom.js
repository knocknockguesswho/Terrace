import React, { Component } from 'react';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import {SendMessage, ShowAllMessages, ShowLastMessages} from '../redux/actions/Interface'
import HeaderTab from '../components/header/Header';
import MapView, {Marker} from 'react-native-maps';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

import axios from 'axios';
import io from 'socket.io-client';

class Chatroom extends Component{
  constructor(props){
    super(props);
    this.state = {
      sendComp: 'Chatroom',
      message: '',
      chats: [],
      conversations: []
    }
  }

  submitChat(){
    const data = {
      sender_id: this.props.Auth.data.id,
      receiver_id: this.props.route.params.friendsID,
      message: this.state.message
    }
    const token = this.props.Auth.data.token
    this.props.SendMessage(data)
    .then((res)=>{
      console.log(res, 'action')
      this.socket.emit('last-message', res.action.payload.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    this.setState({message: ''})
  }

  handleFetchData = () =>{
    this.props.ShowAllMessages(this.props.Auth.data.id)
    .then((res)=>{
      this.setState({
        chats: this.props.Interface.conversations
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  handleFriendPress = () =>{
    const id = this.props.route.params.friendsID
    const data = this.props.Interface.friends.filter((friend, index)=>{
      return friend.id==id
    })
    this.props.navigation.push('UserDetail', {
      avatar: data[0].avatar, 
      fullname: data[0].fullname,
      email: data[0].email,
      username: data[0].username,
      latitude: data[0].latitude,
      longitude: data[0].longitude
    })
  }

  
  
  componentDidMount(){
    this.socket = io(`${API_URL}`);
    this.socket.on('chat-message', msg=>{
      this.setState({
        chats: [...this.state.chats, msg]
      })
      // console.log(msg, 'msg')
    })
    this.handleFetchData();
    // this.handleFriendPress();
  }

  componentWillUnmount(){
    this.socket.removeAllListeners();
    this.socket.disconnect()
  }

  render(){
    let friends_id = this.props.route.params.friendsID
    console.log(this.props.route.params)
    // let user_id = this.props.Auth.data.id
    const chats = this.state.chats.filter((chat, index)=>{
      return chat.receiver_id==friends_id || chat.sender_id == friends_id
    })
    // const chats = this.state.chats


    return(
      <>
        <HeaderTab 
          comp={this.state.sendComp} 
          navigation={this.props.navigation} 
          data={this.props.route.params}
          friendDetails={this.handleFriendPress}
        />
        <View style={{backgroundColor: 'white', flex: 1, paddingTop: 15}}>
          <View on style={{flex: 1}}>
            <ScrollView
            showsVerticalScrollIndicator={false} style={{marginBottom: 60, paddingTop: -45}}
            ref={ref=> {this.scrollView = ref}}
            onContentSizeChange={()=> this.scrollView.scrollToEnd({animated: false})}
            >
                {chats.map((chat, index)=>{
                  const timeUnix = Date.parse(chat.created_at);
                  const time = new Date().toLocaleTimeString('id-ID');
                  return(
                    <View key={index} style={chat.receiver_id!==friends_id? styles.receiverChatContainer : styles.senderChatContainer}>
                      <View style={chat.receiver_id!==friends_id? styles.bubbleReceiverContainer : styles.bubbleSenderContainer}>
                        <Text style={chat.receiver_id!==friends_id? styles.receiverMessage : styles.senderMessage}>{chat.message}</Text>
                        <Text style={chat.receiver_id!==friends_id? styles.receiverTimer : styles.senderTimer}>{time.substr(0,1)=='0'? time.substr(1, 4) : time.substr(0, 5)} {time.substr(-2)=='AM'? 'AM':'PM'}</Text>
                      </View>
                    </View>
                  )
                })}
            </ScrollView>
          </View>
          <View style={styles.chatBarContainer}>
            <TextInput key returnKeyType='send' placeholderTextColor='#B1B1B1' placeholder='Type Your Message' style={styles.chatBar} value={this.state.message} onChangeText={(value)=>this.setState({message: value})} onSubmitEditing={()=>this.submitChat()} />
          </View>
        </View>
      </>
    )
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  chatBarContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -15,
    width: width,
    height: height/15,
    marginBottom: 15,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center'
  },
  chatBar:{
    width: '90%',
    height: height/25,
    alignSelf: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 10,
    backgroundColor: 'white'
  },
  receiverChatContainer:{
    marginLeft: 15,
    marginRight: 90
  },
  senderChatContainer:{
    alignSelf: 'flex-end',
    marginLeft: 90,
    marginRight: 15
  },
  bubbleReceiverContainer:{
    borderWidth: 1,
    borderColor: '#B1B1B190',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  bubbleSenderContainer:{
    backgroundColor: '#188FDE',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  receiverMessage:{
    fontFamily: 'Poppins-Regular', 
    fontSize: 10, 
    color: '#424242'
  },
  receiverTimer:{
    fontFamily: 'Poppins-Regular', 
    fontSize: 7, 
    color: '#BBBBBB', 
    marginLeft: 10
  },
  senderMessage:{
    fontFamily: 'Poppins-Regular', 
    fontSize: 10, 
    color: 'white'
  },
  senderTimer:{
    fontFamily: 'Poppins-Regular', 
    fontSize: 7, 
    color: 'white', 
    marginLeft: 10
  }
})

const mapStateToProps = state=>({
  Interface: state.Interface,
  Auth: state.Auth
});

const mapDispatchToProps = {SendMessage, ShowAllMessages, ShowLastMessages}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Chatroom);