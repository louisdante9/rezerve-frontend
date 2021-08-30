import { combineReducers } from 'redux';

import setCurrentUser from './setCurrentUser';
import getUser from './getUser';
import getUsers from './getUsers';
import getApartments from './apartments';


const rootReducer = combineReducers({
  setCurrentUser,
  getUser,
  getUsers,
  getApartments
});

export default rootReducer;