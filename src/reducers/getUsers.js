import * as types from '../actions/constants';
const initialState = {
  users: []
};
const getUsers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS_SUCCESS:
            return {
                ...state, users: [...action.payload]
            };

        default:
            return state;
    }
};

export default getUsers;