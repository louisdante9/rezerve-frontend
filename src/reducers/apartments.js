import * as types from '../actions/constants';
const initialState = {
  apartments: [],
  property: {}
};
const getApartments = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_APARTMENT_SUCCESS:
            return {
                ...state, property: {...action.payload}
            };
        case types.GET_APARTMENTS_SUCCESS:
            return {
                ...state, apartments: [...action.payload]
            };
        case types.UPDATE_PROPERTY_SUCCESS:
            return {
                ...state, property: {...action.payload}
            };
        case types.DELETE_PROPERTY_SUCCESS:
            return {
                ...state, property: {...action.payload}
            };

        default:
            return state;
    }
};

export default getApartments;