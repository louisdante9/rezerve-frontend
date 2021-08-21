import { combineReducers } from 'redux';
import getUser from './getuser';
import getUsers from './getUsers';
import getUserTransactions from './transactions';
import getAdminTransactions from './adminTrans';
import errorReducer from './errorReducer';
import setCurrentUser from './setCurrentUser';


const rootReducer = combineReducers({
  setCurrentUser,
  errors: errorReducer,
  getUser,
  getUsers,
  getUserTransactions,
  getAdminTransactions
});

export default rootReducer;