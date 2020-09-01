import axios from 'axios';

export const ShowFriends = (id) =>{
  return{
    type: 'SHOWFRIENDS',
    payload: axios(
      {
        method: 'GET',
        url: `http://192.168.100.11:3000/user/showfriends/${id}`
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
        url: `http://192.168.100.11:3000/user/showAllUsers`
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
        url: `http://192.168.100.11:3000/message/showAll/${id}` 
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
        url: `http://192.168.100.11:3000/message/showLast/${id}`
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
        url: `http://192.168.100.11:3000/message/send`,
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
        url: `http://192.168.100.11:3000/user/setLocation/${data.id}`,
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