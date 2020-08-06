const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  successMsg: '',
  conversations: [],
  latest_conversations: [],
  friends: [],
  users: []
}

const Interface = (state = initialState, action)=>{
  switch(action.type){
    case 'SHOWFRIENDS_PENDING':
      return{
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SHOWFRIENDS_REJECTED':
      return{
        ...state,
        isLoading: false,
        isError: true
      }
    case 'SHOWFRIENDS_FULFILLED':
      return{
        ...state,
        isLoading: false,
        isError: false,
        friends: action.payload.data.data
      }
    case 'SHOWALLUSERS_PENDING':
      return{
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SHOWALLUSERS_REJECTED':
      return{
        ...state,
        isLoading: false,
        isError: true
      }
    case 'SHOWALLUSERS_FULFILLED':
      return{
        ...state,
        isLoading: false,
        isError: false,
        users: action.payload.data.data
      }
    case 'SHOWALLMESSAGES_PENDING':
      return{
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SHOWALLMESSAGES_REJECTED':
      return{
        ...state,
        isLoading: false,
        isError: true
      }
    case 'SHOWALLMESSAGES_FULFILLED':
      return{
        ...state,
        isLoading: false,
        isError: false,
        conversations: action.payload.data.data
      }
    case 'SHOWLASTMESSAGES_PENDING':
      return{
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SHOWLASTMESSAGES_REJECTED':
      return{
        ...state,
        isLoading: false,
        isError: true
      }
    case 'SHOWLASTMESSAGES_FULFILLED':
      return{
        ...state,
        isLoading: false,
        isError: false,
        latest_conversations: action.payload.data.data
      }
    case 'SENDMESSAGE_PENDING':
      return{
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SENDMESSAGE_REJECTED':
      return{
        ...state,
        isLoading: false,
        isError: true
      }
    case 'SENDMESSAGE_FULFILLED':
      return{
        ...state,
        isLoading: false,
        isError: false,
      }
    default:
      return state;
  }
}

export default Interface;