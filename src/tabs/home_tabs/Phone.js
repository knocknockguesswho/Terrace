import React, { Component } from 'react';
import HeaderTab from '../../components/header/Header';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView
} from 'react-native';

class Phone extends Component{
  constructor(){
    super();
    this.state = {
      sendComp: 'Phone'
    }
  }


  render(){

    console.log(this.props)
    return(
      <>
        <HeaderTab comp={this.state.sendComp} navigation={this.props.navigation} />
        <View style={{backgroundColor: 'white', flex: 1}}>
          
        </View>
      </>
    )
  }
}

export default Phone;