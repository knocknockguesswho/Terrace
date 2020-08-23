import React, { Component } from 'react';
import {connect} from 'react-redux';
import HeaderTab from '../components/header/Header';
import MapView, {Marker} from 'react-native-maps';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Dimensions
} from 'react-native';

class ProfileSettings extends Component{
  constructor(props){
    super(props);
    this.state = {
      sendComp: 'ProfileSettings',
      fullname: this.props.Auth.data.fullname,
      username: this.props.Auth.data.username,
      email: this.props.Auth.data.email,
      password: 'password',
      editable:{
        fullname: false,
        username: false,
        email: false,
        password: false
      }
    }
  }
  componentDidMount(){
    console.log(this.props.Auth)
  }

  render(){
    const data = this.props.Auth.data
    return(
      <>
        <HeaderTab comp={this.state.sendComp} navigation={this.props.navigation} />
        <View style={{backgroundColor: 'white', flex: 1, paddingTop: 45}}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image 
                source={{uri: `http:192.168.100.11:3000/uploads/${data.avatar}`}}
                style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100}}
              />
            </View>
            <TouchableOpacity activeOpacity={.5} style={styles.changeAvatarButton}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 13, color: '#188FDE'}}>Change Avatar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
              <View style={styles.formInput}>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Fullname</Text>
                  </View>
                  <View style={styles.inputBarContainer}>
                    <TextInput
                    style={styles.inputBar} 
                    placeholderTextColor='#B1B1B1'
                    placeholder='Type Fullname'
                    value={this.state.fullname}
                    onChangeText={(value)=>this.setState({fullname: value})}
                    editable={this.state.editable.fullname}
                    />
                    <TouchableOpacity style={styles.changeInFormButton}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 7, color: '#188FDE'}}>{this.state.editable.fullname? 'Done Edit' : 'Change Fullname' }</Text>
                      </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Username</Text>
                  </View>
                  <View style={styles.inputBarContainer}>
                    <TextInput
                    style={styles.inputBar} 
                    placeholderTextColor='#B1B1B1'
                    placeholder='Type Username'
                    value={this.state.username}
                    onChangeText={(value)=>this.setState({username: value})}
                    editable={this.state.editable.username}
                    />
                    <TouchableOpacity style={styles.changeInFormButton}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 7, color: '#188FDE'}}>Change Username</Text>
                      </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Email</Text>
                  </View>
                  <View style={styles.inputBarContainer}>
                    <TextInput
                    style={styles.inputBar} 
                    placeholderTextColor='#B1B1B1'
                    placeholder='Type Email'
                    value={this.state.email}
                    onChangeText={(value)=>this.setState({email: value})}
                    editable={this.state.editable.email}
                    />
                    <TouchableOpacity style={styles.changeInFormButton}>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 7, color: '#188FDE'}}>Change Email</Text>
                      </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <View style={{alignSelf: 'center', width: '80%'}}>
                    <Text style={styles.inputTitle}>Password</Text>
                  </View>
                  <View style={styles.inputBarContainer}>
                    <TextInput
                      style={styles.inputBarPassword} 
                      secureTextEntry={true}
                      placeholderTextColor='#B1B1B1'
                      placeholder='Type Password'
                      value={this.state.password}
                      onChangeText={(value)=>this.setState({password: value})}
                      editable={this.state.editable.password}
                      />
                      <TouchableOpacity style={styles.changeInFormButton}>
                      <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 7, color: '#188FDE'}}>Change Password</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 15, color:'white'}}>Save</Text>
            </TouchableOpacity>
        </View>
      </>
    )
  }
}

const {width,height} = Dimensions.get('window')

const styles = StyleSheet.create({
  avatarContainer:{
    width: width,
    height: width/3,
    // backgroundColor: 'yellow',
    alignItems: 'center'
  },
  avatar:{
    width: width/4,
    height: width/4,
    borderRadius: 100,
    marginBottom: 15
  },
  changeAvatarButton:{
    width: width/3.5,
    height: width/15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#188FDE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formGroup:{
    width: '100%',
    height: height/3,
    marginTop: 30
    // backgroundColor: 'yellow'
  },
  formInput:{
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputTitle:{
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#424242',
  },
  inputBarContainer:{
    height: width/12,
    width: width*0.85,
    borderWidth: 1,
    borderColor: '#B1B1B1',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputBar:{
    fontFamily: 'Poppins-SemiBold',
    color: '#424242',
    fontSize: 13,
    textAlign: 'left',
    width: '70%',
  },
  inputBarPassword:{
    fontFamily: 'Poppins-SemiBold',
    color: '#424242',
    fontSize: 13,
    textAlign: 'left',
    width: '70%',
    marginBottom: -5
  },
  changeInFormButton:{
    width: '25%',
    height: '40%',
    borderWidth: .8,
    borderColor: '#188FDE',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 50,
    alignItems: 'center'
  },
  saveButton:{
    width: width*0.30,
    height: width/12,
    backgroundColor: '#188FDE',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 30
  }
})

const mapStateToProps = state =>({
  Auth: state.Auth
});

export default connect(mapStateToProps)(ProfileSettings);