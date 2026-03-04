import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authentication/authSlice';
import Calender from './calendar/reducers';
import cartData from './cart/reducers';
import { chatReducer, groupChatReducer, SingleChatGroupReducer, SingleChatReducer } from './chat/reducers';
import Contact from './contact/reducers';
import { axiosCrudReducer, axiosSingleCrudReducer } from './crud/axios/reducers';
import dataTable from './data-filter/reducers';
import { emailReducer, SingleEmailReducer } from './email/reducers';
import FileManager from './fileManager/reducers';
import firebaseAuth from './firebase/auth/reducers';
import { fsCrudReducer, fsSingleCrudReducer } from './firebase/firestore/reducers';
import galleryReducer from './gallary/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import jobs from './jobs/reducers';
import kanbanBoardReducer from './kanban/reducers';
import { readMessageReducer } from './message/reducers';
import Note from './note/reducers';
import { readNotificationReducer } from './notification/reducers';
import orderReducer from './orders/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import Profile from './profile/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import { sellersReducer } from './sellers/reducers';
import tickets from './supportTickets/reducers';
import Task from './task/reducers';
import { teamReducer } from './team/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';
import Todo from './todo/reducers';
import { userReducer, userGroupReducer } from './users/reducers';

const rootReducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  ChangeLayoutMode,
  themeUsers: themeUsersReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  team: teamReducer,
  users: userReducer,
  userGroup: userGroupReducer,
  sellers: sellersReducer,
  headerSearch: headerSearchReducer,
  order: orderReducer,
  gallery: galleryReducer,
  email: emailReducer,
  singleEmail: SingleEmailReducer,
  product: productReducer,
  singleProduct: SingleProductReducer,
  chat: chatReducer,
  singleChat: SingleChatReducer,
  groupChat: groupChatReducer,
  singleChatGroup: SingleChatGroupReducer,
  project: projectReducer,
  singleProject: SingleProjectReducer,
  axiosCrud: axiosCrudReducer,
  axiosSingleCrud: axiosSingleCrudReducer,
  cart: cartData,
  Todo,
  Note,
  Task,
  KanbanBoard: kanbanBoardReducer,
  Contact,
  Profile,
  Calender,
  FileManager,
  tickets,
  jobs,
  dataTable,
  firebaseAuth,
  fsCrud: fsCrudReducer,
  fsSingleCrud: fsSingleCrudReducer,
});

export default rootReducers;