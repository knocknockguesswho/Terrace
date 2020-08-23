import axios from 'axios';

export const Login = (data) =>{
  return{
    type: 'LOGIN',
    payload: axios(
      {
        method: 'POST',
        url: `http://192.168.100.11:3000/auth/login`,
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
      url: 'http://192.168.100.11:3000/auth/register',
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
  }
}