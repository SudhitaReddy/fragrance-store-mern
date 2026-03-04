import { createStore, applyMiddleware, compose } from 'redux';
import { thunk, withExtraArgument } from 'redux-thunk';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/storage';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import rootReducer from './rootReducers';
import fbConfig from '../config/database/firebase';

// Enhanced Redux store with Firebase integration
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(withExtraArgument({ getFirebase, getFirestore, storage: firebase.storage })),
    reduxFirestore(fbConfig),
  ),
);

export const rrfProps = {
  firebase,
  config: {
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady: true,
    enableLogging: false, // Disable Firebase logging to reduce console noise
    enableRedirectHandling: false, // Disable redirect handling to avoid defaultProps issues
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
