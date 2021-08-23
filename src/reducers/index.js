import { combineReducers } from 'redux';

import setCurrentUser from './setCurrentUser';
import getUser from './getUser';
import getUsers from './getUsers';


const rootReducer = combineReducers({
  setCurrentUser,
  getUser,
  getUsers
});

export default rootReducer;