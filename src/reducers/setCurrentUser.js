import isEmpty from 'lodash/isEmpty';
import * as types from '../actions/constants';

export const initialState = {
  isAuthenticated: false,
  user: {}
};

const setCurrentUser = (state = initialState, action = {}) => {
  switch (action.type) {
      case types.USER_AUTHENTICATED: {
        let { user } = action;

      return { ...state, isAuthenticated: !isEmpty(action.user), user, role: user?.role };
    }
    case types.ADMIN_LOGIN_ERRORS:
      return action.payload;
    
    default: return state;

  }
};
export default setCurrentUser;