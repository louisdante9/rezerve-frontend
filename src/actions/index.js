import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
  BUY_MINING_SUCCESS,
  BUY_MINING_ERROR,
  GET_USER_TRANS_SUCCESS,
  GET_USER_TRANS_ERROR,
  GET_ADMIN_TRANS_SUCCESS,
  GET_ADMIN_TRANS_ERROR,
  UPDATE_TRANS_SUCCESS,
  UPDATE_TRANS_ERROR,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_USER_ERROR
} from './constants';

// const API = 'https://creditdeliveries.herokuapp.com';
const API = 'http://localhost:9000/v1';

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
 * @desc this function signs in a user
 * @param {object} responseData
 * @returns {function}
 */
const LoginError = data => ({ type: USER_LOGIN_ERRORS, payload: data });

export function SigninRequest(userData, history) {
  return dispatch => axios.post(`${API}/users/login`, userData)
    .then(res => {
      const token = registerToken(res.data);
      dispatch(setCurrentUser(decode(token)));
      // return decode(token)
      history.push('/dashboard');
      dispatch(LoginError({}));
    }).catch(err => {
      dispatch(LoginError(err.response.data));
    })
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
 * @desc this method signs up a user
 * @param {object} userData
 * @param callback
 * @returns {function}
 */

export const registerUser = (user, history) => dispatch => {
  axios.post(`${API}/users/register`, user)
    .then(res => history.push('/verifyToken'))
    .catch(err => {
      dispatch({
        type: USER_SIGNUP_ERRORS,
        payload: err.response.data
      });
    });
}



/**
 * 
 * 
 * @desc verifyUser
 * @param {any} userData 
 * @returns {void}
 */
const verifyUserSuccess = token => ({ type: ACTIVATE_SUCCESS, token });
export function verifyUser(activationCode, history) {
  return dispatch => axios.patch(`${API}/users/activate`, activationCode).then(res => {
    const token = registerToken(res.data.token);
    dispatch(setCurrentUser(verifyUserSuccess(token)));
    history.push('/dashboard')
  }).catch(err => {
    dispatch({
      type: VERIFY_TOKEN_ERRORS,
      payload: err.response.data
    });
  })
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
  axios.get(`${API}/users/${id}`)
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
 * @desc this method handles buying minings for the user
 * @returns {void}
 */
const MiningsSuccess = transaction =>
  ({ type: BUY_MINING_SUCCESS, payload: transaction });

const MiningsError = data =>
  ({ type: BUY_MINING_ERROR, payload: data });


export function buyMinings(obj, history) {
  return dispatch =>
    axios.post(`${API}/users/transaction`, obj)
      .then((response) => {
        dispatch(MiningsSuccess(response.data.transaction));
        history.push('/transactions')
      })
      .catch((error) => {
        dispatch(MiningsError(error.response.data));
      });
}


/**
 *
 * @desc this function returns list of transactions
 * @param {any} token
 * @returns {void}
 */
const fetchTransSuccess = transactions =>
  ({ type: GET_USER_TRANS_SUCCESS, payload: transactions });

const fetchTransError = data =>
  ({ type: GET_USER_TRANS_ERROR, payload: data });

export const fetchTrans = id => dispatch => {
  axios.get(`${API}/users/${id}/transaction`)
    .then((response) => {
      dispatch(fetchTransSuccess(response.data.transactions));
    })
    .catch((error) => {
      dispatch(fetchTransError(error.response.data));
    });
}



/**
 *
 *
 * @desc this function signs in a admin
 * @param {object} responseData
 * @returns {function}
 */
const adminLoginError = data => ({ type: ADMIN_LOGIN_ERRORS, payload: data });

export const adminLogin = (user, history) => dispatch => {
  axios.post(`${API}/admin/login`, user)
    .then(res => {
      const token = registerToken(res.data);
      dispatch(setCurrentUser(decode(token)));
      history.push('/users')
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

export const registerAdmin = (admin, history) => dispatch => {
  axios.post(`${API}/admin/register`, admin)
    .then(() => history.push('/loginAdmin'))
    .catch(err => {
      dispatch({
        type: USER_SIGNUP_ERRORS,
        payload: err.response.data
      });
    });
}


/**
 *
 * @desc this function returns list of transactions
 * @param {any} tokenGET_ADMIN_TRANS_SUCCESS
 * @returns {void}
 */
const fetchAdminTransSuccess = transactions =>
  ({ type: GET_ADMIN_TRANS_SUCCESS, payload: transactions });

const fetchAdminTransError = data =>
  ({ type: GET_ADMIN_TRANS_ERROR, payload: data });

export const fetchAdminTrans = () => dispatch => {
  axios.get(`${API}/admin/transactions`)
    .then((response) => {
      dispatch(fetchAdminTransSuccess(response.data.transactions));
    })
    .catch((error) => {
      dispatch(fetchAdminTransError(error.response.data));
    });
}



/**
 *
 * @desc this function returns list of transactions
 * @param {any} token
 * @returns {void}
 */
const updateTransactionSuccess = transaction =>
  ({ type: UPDATE_TRANS_SUCCESS, payload: transaction });

const updateTransactionError = data =>
  ({ type: UPDATE_TRANS_ERROR, payload: data });

export const updateTransaction = (id, transObj) => dispatch => {
  axios.post(`${API}/admin/transactions/${id}/`, transObj)
    .then((response) => {
      dispatch(updateTransactionSuccess(response.data.updateTransaction));
    })
    .catch((error) => {
      dispatch(updateTransactionError(error.response.data));
    });
}



/**
 *
 * @desc this function returns a users details
 * @param {any} token
 * @returns {void}
 */
const fetchAUsersSuccess = user =>
  ({ type: GET_USERS_SUCCESS, payload: user });

const fetchAUsersError = data =>
  ({ type: GET_USERS_ERROR, payload: data });

export const fetchUsers = () => dispatch => {
  axios.get(`${API}/admin/users`)
    .then((response) => {
      dispatch(fetchAUsersSuccess(response.data.clients));
    })
    .catch((error) => {
      dispatch(fetchAUsersError(error.response.data));
    });
}


  
  /**
     * @function updateUser
     * @param { string } id
     * @param { string } accountBal
     * @param { object } history
     * @returns {object} dispatches an action
     * @description updates a user
     * 
     * @function updateAParcelFailed
     * @param { object } Id
     * @returns {object} dispatches an action
     * @description pure function redux action
     */
      
  const updateAParcelFailed = data =>
    ({ type: UPDATE_USER_ERROR, data });

  export function updateUser (id, obj, history) { 
    return dispatch =>
    axios.put(`${API}/admin/users/${id}`, obj)
      .then(() => history.push('/users'))
      .catch((error) => {
        dispatch(updateAParcelFailed(error.response.data));
      });
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