import React, { Component } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import {Register} from '../redux/actions/Auth';
import TerraceLogo from '../../assets/images/terrace-logo.svg';
import ImagePicker from 'react-native-image-picker';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TextInput,
  Image
} from 'react-native';

class Signup extends Component{
  constructor(){
    super(); 
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      avatar: null,
      actionMsg: '',
      isError: false
    }
  }


  handleSignUp = (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('fullname', this.state.fullname);
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('avatar', {
      uri: this.state.avatar.uri,
      type: this.state.avatar.type,
      name: this.state.avatar.fileName
    });
    this.props.Register(formData)
    .then(async(res)=>{
      this.setState({
        actionMsg: `Thankyou ${this.state.username} for registering on our services.`
      });
      this.props.navigation.push('Signin')
    })
    .catch((err)=>{
      this.setState({
        actionMsg: `Something Bad Happened`,
        isError: true
      })
    })
  }

  handleChecked = () =>{
    this.setState({
      checked: !this.state.checked
    })
  }

  handleChooseImage = () =>{
    const options = {
      noData: true,
    }
    ImagePicker.showImagePicker(options, response =>{
      if(response.uri){
        this.setState({avatar: response})
      }
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

            <Text style={styles.formTitle}>Sign Up</Text>
            <View style={styles.formGroup}>
              <View style={styles.formInput}>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Full Name</Text>
                  </View>
                  <TextInput
                   style={styles.inputBar} 
                   placeholderTextColor='#B1B1B1'
                   placeholder='Type Full Name'
                   value={this.state.fullname}
                   onChangeText={(value)=>this.setState({fullname: value})}
                   />
                </View>
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
                    <Text style={styles.inputTitle}>Email</Text>
                  </View>
                  <TextInput
                   style={styles.inputBar} 
                   placeholderTextColor='#B1B1B1'
                   placeholder='Type Email'
                   value={this.state.email}
                   onChangeText={(value)=>this.setState({email: value})}
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
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Avatar</Text>
                  </View>
                  <View style={styles.chooseImage}>
                    <TouchableOpacity onPress={this.handleChooseImage} style={styles.chooseButton}>
                      <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10, textAlign: 'center', color: '#424242'}}>Choose Image</Text>
                    </TouchableOpacity>
                    <View>
                      <View style={{marginLeft:15, width: 50, height: 50}}>
                        <Image  
                          style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
                          source={this.state.avatar}
                        />
                      </View>
                      <Text textBreakStrategy='highQuality' style={{fontFamily: 'Poppins-Regular', fontSize: 10, color: '#424242', marginBottom: 5}}>{this.state.avatar === null ? `` : `${this.state.avatar.fileName}`}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.signUpButton} activeOpacity={.6} onPress={this.handleSignUp}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>Sign Up</Text>
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
            <View style={styles.loginOffer}>
              <Text style={styles.signUpText}>Already have an account?</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.push('Signin')}>
                <Text style={styles.loginButton}> Login</Text>
              </TouchableOpacity>
              <Text style={styles.signUpText}> instead</Text>
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
  signUpButton:{
    marginTop: 20,
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
  chooseImage:{
    height: 35,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    color: '#424242',
    fontSize: 10,
    textAlign: 'center',
    flexDirection: 'row'
  },
  chooseButton:{
    height: 35,
    width: '40%',
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#B1B1B1',
    borderRadius: 10,
    justifyContent: 'center'
  },
  loginOffer:{
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
  loginButton:{
    fontSize: 10,
    color: '#188FDE'
  }
});

const mapStateToProps = state =>({
  Auth: state.Auth
});

const mapDispatchToProps = {Register}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);