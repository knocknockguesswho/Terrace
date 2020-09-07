import axios from 'axios';
import {API_URL} from '@env';

export const Login = (data) =>{
  return{
    type: 'LOGIN',
    payload: axios(
      {
        method: 'POST',
        url: `${API_URL}/auth/login`,
       data:{
          username: data.username,
          password: data.password
        }
      }
    )
  }
}

export const Logout = () =>{
  return{
    type: 'LOGOUT_FULFILLED'
  }
}


export const Register = (formData) =>{
  return{
    type: 'REGISTER',
    payload: axios(
      {
      method: 'POST',
      url: `${API_URL}/auth/register`,
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
  }
}