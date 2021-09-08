import * as types from '../actions/constants';
const initialState = {
    users: [],
    limit: 0,
    page: 0,
    total: 0,
};
const getUsers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS_SUCCESS:
            return {
                ...state, 
                users: [...action.payload.docs], 
                limit: action.payload.limit, 
                offset: action.payload.offset,
                total: action.payload.total,
            };

        default:
            return state;
    }
};

export default getUsers;