import React, { Component } from 'react';
import {Login} from '../redux/actions/Auth';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import TerraceLogo from '../../assets/images/terrace-logo.svg';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TextInput
} from 'react-native';
import io from 'socket.io-client';

class Signin extends Component{
  constructor(){
    super(); 
    this.state = {
      checked: false,
      username: '',
      password: '',
      actionMsg: '',
      isError: false
    }
  }

  handleLogin = (event) =>{
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.Login(data).then((res)=>{
      this.props.navigation.push('Home')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  handleChecked = () =>{
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    return(
      <>
        <View style={{backgroundColor: '#188FDE', flex: 1}}>
          <View style={styles.terraceLogo}>
            <TerraceLogo width={175} height={175} />
          </View>
          <View style={styles.formContainer}>

            <Text style={styles.formTitle}>Login</Text>
            <View style={styles.formGroup}>
              <View style={styles.formInput}>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Username</Text>
                  </View>
                  <TextInput
                   style={styles.inputBar} 
                   placeholderTextColor='#B1B1B1'
                   placeholder='Type Username'
                   value={this.state.username}
                   onChangeText={(value)=>this.setState({username: value})}
                   />
                </View>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Password</Text>
                  </View>
                  <TextInput
                    style={styles.inputBar} 
                    secureTextEntry={true}
                    placeholderTextColor='#B1B1B1'
                    placeholder='Type Password'
                    value={this.state.password}
                    onChangeText={(value)=>this.setState({password: value})}
                    />
                </View>
              </View>
              <View style={styles.rememberForgotContainer}>
                <View style={styles.checkBoxContainer}>
                  <CheckBox 
                    value={this.state.checked}
                    onValueChange={this.handleChecked}
                  />
                  <Text style={
                    {
                      fontSize: 12,
                      color: '#424242',
                      fontFamily: 'Poppins-Regular',
                      alignSelf: 'center'
                    }
                    }>Remember me</Text>
                </View>
                <TouchableOpacity>
                  <Text style={
                    {
                      fontSize: 12,
                      color: '#188FDE',
                      marginTop: 10,
                      marginBottom: 10,
                      fontFamily: 'Poppins-Regular'
                    }
                    }>Forgot Password?</Text>
                </TouchableOpacity>  
              </View>
              <TouchableOpacity style={styles.loginButton} activeOpacity={.6} onPress={this.handleLogin}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>Login</Text>
              </TouchableOpacity>
              <View style={styles.termsConditions}>
                <Text style={{fontSize: 8, fontFamily: 'Poppins-Regular'}}>By Signing up, you agree to Book's Library </Text>
                <TouchableOpacity>
                  <Text style={{fontSize: 8, color: '#188FDE', fontFamily: 'Poppins-Regular'}}>Terms and Conditions </Text>
                </TouchableOpacity>
                <Text style={{fontSize: 8, fontFamily: 'Poppins-Regular'}}>& </Text>
                <TouchableOpacity>
                  <Text style={{fontSize: 8, color: '#188FDE', fontFamily: 'Poppins-Regular'}}>Privacy Policy </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.signUpOffer}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.push('Signup')}>
                <Text style={styles.signUpButton}> Signup</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </>
    )
  }
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  terraceLogo: {
    width: width,
    height: height/7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer:{
    width: width,
    height: height,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 25,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  formTitle:{
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: '#424242',
  },
  formGroup:{
    width: '100%',
    height: height/3,
    marginTop: 25,
    // backgroundColor: 'yellow'
  },
  formInput:{
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputTitle:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#424242',
    marginLeft: '7%'
  },
  inputBar:{
    height: 35,
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#B1B1B1',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: '#424242',
    fontSize: 10,
    textAlign: 'center'
  },
  rememberForgotContainer:{
    width: '114%', 
    flexDirection:'row', 
    alignSelf:'center',
    justifyContent: 'space-around'
  },
  checkBoxContainer:{
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15
  },
  loginButton:{
    marginTop: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#188FDE',
    width: '90%',
    height: 35,
    alignSelf: 'center',
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0, .3)',
    shadowOffset: {height: 2, width: 3},
    elevation: 2
  },
  termsConditions:{
    flexDirection: 'row',
    width: '90%',
    alignSelf: "center",
    marginTop: 25,
    justifyContent: "center"
  },
  signUpOffer:{
    flexGrow: 1,
    alignSelf:'center',
    flexDirection: 'row',
    position: 'relative',
    bottom: -height/3.2
  },
  signUpText:{
    fontSize: 10,
    color: '#424242'
  },
  signUpButton:{
    fontSize: 10,
    color: '#188FDE'
  }
});

const mapStateToProps = state =>({
  Auth: state.Auth,
  Interface: state.Interface
});

const mapDispatchToProps = {Login};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);