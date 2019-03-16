const initState = {
    authError: null,
    isLogging: false,
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        console.log('login error');
        return {
          ...state,
          authError: 'Login failed',
          isLogging: false
        }
  
      case 'LOGIN_SUCCESS':
        console.log('login success');
        return {
          ...state,
          authError: null,
          isLogging: false
        }
  
      case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return state;

      case 'LOGIN_REQUEST':
        console.log('login request');
        return {
          ...state,
          authError: null,
          isLogging: true

        }
  

      default:
        return state;
    }
  };
  
  export default authReducer;