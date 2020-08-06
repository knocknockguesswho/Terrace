const initalState = {
    isLoading: false,
    isError: false,
    isLogin: false,
    errorMsg: '',
    data: {}
  }

  const Auth = (state = initalState, action)=>{
    switch(action.type){
      case 'LOGIN_PENDING':
        return{
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'LOGIN_REJECTED':
        return{
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: action.payload.response.data
        }
      case 'LOGIN_FULFILLED':
        return{
          ...state,
          isLoading: true,
          isError: false,
          isLogin: true,
          data: action.payload.data.data[0]
        }
      case 'LOGOUT_FULFILLED':
        return{
          ...state,
          isLoading: false,
          isError: false,
          isLogin: false,
          data: {}
        }
      case "REGISTER_PENDING":
        return {
          ...state,
          isLoading: true,
          isError: false,
          isRegistered: false
        }
      case "REGISTER_REJECTED":
        return {
          ...state,
          isLoading: false,
          isError: true,
          isRegistered: false,
          errorMsg: action.payload.response.data.data
        }
      case "REGISTER_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isError: false,
          isRegistered: true,
          isLogin: false,
        }
      default:
        return state;
    }
  }
  
  export default Auth;