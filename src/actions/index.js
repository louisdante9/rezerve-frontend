import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { property } from 'lodash';
import Apartmemt from 'src/pages/Apartment';
import swal from 'sweetalert';
import setAuthToken from '../utils/SetAuthToken';
import {
  USER_AUTHENTICATED,
  USER_LOGIN_ERRORS,
  USER_SIGNUP_ERRORS,
  VERIFY_TOKEN_ERRORS,
  ADMIN_LOGIN_ERRORS,
  ACTIVATE_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_APARTMENT_SUCCESS,
  GET_APARTMENT_ERROR,
  GET_APARTMENTS_SUCCESS,
  GET_APARTMENTS_ERROR,
  CREATE_APARTMENT_SUCCESS,
  UPDATE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_SUCCESS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_USER_SUCCESS,
} from './constants';

const API = 'https://rezerve.herokuapp.com';
// const API = 'http://localhost:9000';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: USER_AUTHENTICATED,
    user
  };
}


/**
 *
 *
 * @desc this function register the returned jwt token to
 * localstorage and pass it to axios header
 * @param {object} data
 * @returns {string}
 */
function registerToken({ token }) {
  window.localStorage.setItem('token', token);
  setAuthToken(token);
  return token;
}





/**
 * 
 * 
 * @desc this method logs out a user
 * @returns {void}
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 *
 * @desc this function returns a users details
 * @param {any} token
 * @returns {void}
 */
const fetchAUserSuccess = user =>
  ({ type: GET_USER_SUCCESS, payload: user });

const fetchAUserError = data =>
  ({ type: GET_USER_ERROR, payload: data });

export const fetchAUserDetails = id => dispatch => {
  axios.get(`${API}/user/get-user/${id}`)
    .then((response) => {
      dispatch(fetchAUserSuccess(response.data.user));
    })
    .catch((error) => {
      dispatch(fetchAUserError(error.response.data));
    });
}

/**
 * 
 * 
 * @desc getApartment
 * @returns {void}
 */
const getApartmentSuccess = apartment =>
  ({ type: GET_APARTMENT_SUCCESS, payload: apartment });

const getApartmentError = data =>
  ({ type: GET_APARTMENT_ERROR, payload: data });


export function getApartment(id) {
  return dispatch =>
    axios.get(`${API}/apartment/${id}`)
      .then((response) => {
        dispatch(getApartmentSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getApartmentError(error.response.data));
      });
}


/**
 *
 * @desc this function returns list of transactions
 * @param {any} token
 * @returns {void}
 */
const getApartmentsSuccess = transactions =>
  ({ type: GET_APARTMENTS_SUCCESS, payload: transactions });

const getApartmentsError = data =>
  ({ type: GET_APARTMENTS_ERROR, payload: data });

export const getApartments = () => dispatch => {
  axios.get(`${API}/apartment`)
    .then((response) => {
      dispatch(getApartmentsSuccess(response.data.apartments.listings));
    })
    .catch((error) => {
      console.log(error)
      dispatch(getApartmentsError(error.response.data));
    });
}



/**
 *
 *
 * @desc this function signs in a admin
 * @param {object} responseData
 * @returns {function}
 */
const adminLoginError = data => ({ type: "AUTH_ERRORS", payload: data });

export const adminLogin = (userData, navigate) => dispatch => {
  axios.post(`${API}/user/admin/login`, userData)
    .then(res => {
      const token = registerToken(res.data);
      dispatch(setCurrentUser(decode(token)));
      navigate('/', { replace: true });
    })
    .catch(err => {
      dispatch(adminLoginError(err.response.data));
    });
}

/**
 *
 *
 * @desc this method signs up a admin
 * @param {object} userData
 * @param callback
 * @returns {function}
 */

export const registerAdmin = (obj, navigate) => dispatch => {
  console.log(obj, 'obj')
  axios.post(`${API}/user/admin/register`, obj)
    .then((res) => {
      console.log(res, 'res')
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: "AUTH_ERRORS",
        payload: err.response.data
      });
    });
}


/**
 *
 * @desc createProperty
 * @param {any} tokenGET_ADMIN_TRANS_SUCCESS
 * @returns {void}
 */


export const createProperty = (propertyData) => dispatch => {
  return axios.post(`${API}/apartment`, propertyData)
    .then(({data}) => {
      dispatch({ type: CREATE_APARTMENT_SUCCESS, payload: data.apartmemt });
      return data;
    })
   
}



/**
 *
 * @desc updateProperty
 * @param {any} token
 * @returns {void}
 */
const updatePropertySuccess = property =>
  ({ type: UPDATE_PROPERTY_SUCCESS, payload: property });

export const updateProperty = (id, propertyObj) => dispatch => {
  return axios.put(`${API}/apartment/${id}/`, propertyObj)
    .then((response) => {
      dispatch(updatePropertySuccess(response.data.updatedApartment));
      return response.data.updatedApartment
    })
}
/**
 *
 * @desc this function returns list of transactions
 * @param {any} token
 * @returns {void}
 */


export const deleteProperty = (id) => dispatch => {
  return axios.delete(`${API}/apartment/${id}/`)

    .then((response) => {
      dispatch(updatePropertySuccess({ type: DELETE_PROPERTY_SUCCESS, payload: response.data.delApartment }));
      return response.data.delApartment
    })
}



/**
 * @desc this function returns a users details
 * @param {any} token
 * @returns {void}
 */
const fetchUsersSuccess = user =>
  ({ type: GET_USERS_SUCCESS, payload: user });

const fetchUsersError = data =>
  ({ type: GET_USERS_ERROR, payload: data });

export const fetchUsers = () => dispatch => {
  axios.get(`${API}/user/admin/get-users`)
    .then((response) => {
      console.log(response, 'response')
      dispatch(fetchUsersSuccess(response.data.clients));
    })
    .catch((error) => {
      dispatch(fetchUsersError(error.response));
    });
}


  
  /**
     * @function updateUser
     * @param { string } id
     * @param { string } userObj
     * @param { object } history
     * @returns {object} dispatches an action
     */
      

  const updateUserSuccess = data =>
    ({ type: UPDATE_USER_SUCCESS, payload: data });

  export function updateUser (id, obj) { 
    return dispatch => {
      return axios.put(`${API}/user/${id}`, obj)
        .then((res) => {
          dispatch(updateUserSuccess(res.data.updatedUser));
          return res
        })
      }
    }

/**
 *
 * @desc this function returns a jwt token
 * @param {any} token
 * @returns {void}
 */
function decode(token) {
  return jwtDecode(token);
}