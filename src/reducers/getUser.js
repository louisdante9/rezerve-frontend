import * as types from '../actions/constants';

const getUser = (state = {}, action) => {
    switch (action.type) {
        case types.GET_USER_SUCCESS:
            return {
                ...state, ...action.payload 
            };
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state, ...action.payload 
            };

        default:
            return state;
    }
};

export default getUser;