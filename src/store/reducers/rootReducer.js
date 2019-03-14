import authReducer from './authReducer'
import tenderReducer from './tenderReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  tender: tenderReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer