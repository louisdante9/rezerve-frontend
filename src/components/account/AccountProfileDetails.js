import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../actions'

const states = [
  {
    value: 'lagos',
    label: 'Lagos'
  },
  {
    value: 'abuja',
    label: 'Abuja'
  },
  {
    value: 'port-harcourt',
    label: 'Port Harcourt'
  }
];

const status = [
  {
    value: 'true',
    label: 'True'
  },
  {
    value: 'false',
    label: 'False'
  },
]

const AccountProfileDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // const handleUpdate = (id, userObj, ) => {
  //   dispatch(updateUser(id, navigate))
  // }

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      username: props.user.username,
      email: props.user.email,
      phone: props.user.phone,
      dob: props.user.dob,
      state: props.user.state,
      country: props.user.country,
      age: props.user.age,
      role: props.user.role,
      referralCode: props.user.referralCode,
      activationCode: props.user.activationCode,
      activated: props.user.activated
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required('fristname is required'),
      lastname: Yup.string().required('lastname is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      username: Yup.string(),
      phone: Yup.string().max(10),
      dob: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
      age: Yup.string(),
      role: Yup.string(),
      referralCode: Yup.string(),
      activationCode: Yup.string(),
      activated: Yup.boolean(),
    }),
    onSubmit: (values, val) => {
      setLoading(!loading)
      dispatch(updateUser(props.user._id, values)).then((response) => {
        setLoading(!loading)
        navigate('/app/customers', { replace: true });
      }).catch((err) => {
        setLoading(!loading)
        setErrorMsg('An error occurred!')
      })
    },
  });


  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstname"
                onChange={handleChange('firstname')}
                onBlur={handleBlur}
                required
                value={values.firstname || ''}
                variant="outlined"
                error={Boolean(touched.firstname && errors.firstname)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastname"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.lastname || ''}
                variant="outlined"
                error={Boolean(touched.lastname && errors.lastname)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.username || ''}
                variant="outlined"
                error={Boolean(touched.username && errors.username)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.email || ''}
                variant="outlined"
                error={Boolean(touched.email && errors.email)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                helperText={errors.phone && "Phone number shouldn't be more that 11 numbers"}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                value={values.phone || ''}
                variant="outlined"
                error={Boolean(touched.phone && errors.phone)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Dob"
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.dob || ''}
                variant="outlined"
                error={Boolean(touched.dob && errors.dob)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Age"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.age || ''}
                variant="outlined"
                error={Boolean(touched.age && errors.age)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Role"
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.role || ''}
                variant="outlined"
                error={Boolean(touched.role && errors.role)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Referral Code"
                name="referralCode"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.referralCode || ''}
                variant="outlined"
                error={Boolean(touched.referralCode && errors.referralCode)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Activation Code"
                name="activationCode"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.activationCode || ''}
                variant="outlined"
                error={Boolean(touched.activationCode && errors.activationCode)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.country || ''}
                variant="outlined"
                error={Boolean(touched.country && errors.country)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                select
                SelectProps={{ native: true }}
                value={values.state || 'lagos'}
                variant="outlined"
                error={Boolean(touched.state && errors.state)}

              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Activation Status"
                name="activated"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                select
                SelectProps={{ native: true }}
                value={values.activated || false}
                variant="outlined"
                error={Boolean(touched.activated && errors.activated)}

              >
                {status.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Sav{loading ? 'ing' : 'e'} details
          </Button>
        </Box>
        {errorMsg && (<Typography
          color="textPrimary"
          variant="body1"
        >
          {errorMsg}
        </Typography>)}
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
