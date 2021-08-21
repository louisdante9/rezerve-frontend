import Validator from 'validator';
import isEmpty   from 'lodash/isEmpty';

/**
 *
 * @desc this functtion handles validation for signin form
 *
 * @param {any} inputData
 * @returns {Object}
 */
export const signinValidate = ({email, password}) => {
  const errors = {};
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(email)) {
    errors.invalidEmail = 'Invalid email';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 *
 * @desc this functtion handles validation for signup form
 *
 * @param {Object} input
 * @returns {Object}
 */
export const signupValidation = (input) => {
  const errors = {};
  if (Validator.isEmpty(input.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(input.email)) {
    errors.invalidEmail = 'Invalid email';
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(input.username)) {
    errors.username = 'Username field is required';
  }
  if (Validator.isEmpty(input.phone)) {
    errors.phone = 'Phone number field is required';
  }
  if (Validator.isEmpty(input.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(input.state)) {
    errors.state = 'State field is required';
  }
  if (Validator.isEmpty(input.city)) {
    errors.city = 'City field is required';
  }
  if (Validator.isEmpty(input.street)) {
    errors.street = 'Street field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const checkIfEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key] === "")
      return true;
  }
  return false;
};