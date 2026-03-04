import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authentication/authSlice';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import firebaseAuth from './firebase/auth/reducers';

const rootReducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  ChangeLayoutMode,
  message: readMessageReducer,
  notification: readNotificationReducer,
  firebaseAuth,
 
});

export default rootReducers;