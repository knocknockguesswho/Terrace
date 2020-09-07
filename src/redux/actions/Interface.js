import axios from 'axios';
import {API_URL} from '@env';

export const ShowFriends = (id) =>{
  return{
    type: 'SHOWFRIENDS',
    payload: axios(
      {
        method: 'GET',
        url: `${API_URL}/user/showfriends/${id}`
      }
    )
  }
}


export const ShowAllUsers = () =>{
  return{
    type: 'SHOWALLUSERS',
    payload: axios(
      {
        method: 'GET',
        url: `${API_URL}/user/showAllUsers`
      }
    )
  }
}

export const ShowAllMessages = (id) =>{
  return{
    type: 'SHOWALLMESSAGES',
    payload: axios(
      {
        method: 'GET',
        url: `${API_URL}/message/showAll/${id}` 
      }
    )
  }
}


export const ShowLastMessages = (id) =>{
  return{
    type: 'SHOWLASTMESSAGES',
    payload: axios(
      {
        method: 'GET',
        url: `${API_URL}/message/showLast/${id}`
      }
    )
  }
}

export const SendMessage = (data, token) =>{
  return{
    type: 'SENDMESSAGE',
    payload: axios(
      {
        method: 'POST',
        url: `${API_URL}/message/send`,
        data: {
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          message: data.message
        },
        headers:{
          'Authorization': token
        }
      }
    )
  }
}

export const SetLocation = (data) =>{
  return{
    type: 'SETLOCATION',
    payload: axios(
      {
        method: 'PUT',
        url: `${API_URL}/user/setLocation/${data.id}`,
        data: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        // headers:{
        //   'Authorization': token
        // }
      }
    )
  }
}