import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import TerraceLogo from '../../assets/images/terrace-logo.svg';

class Splash extends Component{
  constructor(){
    super()
  }

  

  // componentDidMount(){
  //   if(!this.props.Auth.isLoading){
  //     if(this.props.Auth.isLogin){
  //       this.props.navigation.push('Home')
  //     } else {
  //       this.props.navigation.push('Signin')
  //     }
  //   }
  // }

  render(){
    return(
      <>
        <View style={styles.container}>
          <TerraceLogo width={width*.5} />
        </View>
      </>
    )
  }
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container:{
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#188FDE'
  },
  terraceLogo:{
    width: '100%',
    height: '100%'
  }
})

const mapStateToProps = state =>({
  Auth: state.Auth
})

export default connect(mapStateToProps)(Splash);
