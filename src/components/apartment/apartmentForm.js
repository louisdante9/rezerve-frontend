/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Geocode from "react-geocode";
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import { updateProperty, deleteProperty, createProperty } from '../../actions'
import { thumbsContainer, thumb, thumbInner, img, baseStyle, activeStyle, acceptStyle, rejectStyle } from './styles'
import { stateList, propertyTypeList, amenities } from '../../utils';

const useStyles = makeStyles((theme) => ({
  formControl: {},
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ApartmentForm = ({ property, id, ...rest }) => {
  Geocode.setLanguage("en");
  Geocode.setApiKey("AIzaSyD093gX7zynJ6NTLc5u0tassLDvgkgrUZo");
  Geocode.setRegion("ng");
  Geocode.setLocationType("ROOFTOP");

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addr, setAddr] = useState('')
  const [lng, setLng] = useState('')
  const [lat, setLat] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setErrorMsg('');
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [baseStyle, isDragActive, activeStyle, isDragAccept, acceptStyle, isDragReject, rejectStyle]);

  const thumbs = files.map((file, i) => (
    <div style={thumb} key={file.name} onClick={() => remove(i)}>
      <div style={thumbInner}>
        <img src={file.preview} alt={file.name} style={img} />
      </div>
    </div>
  ));
  const remove = file => {
    const newFiles = [...files];     // make a var for the new array
    newFiles.splice(file, 1);        // remove the file from the array
    setFiles(newFiles);
    console.log(newFiles, 'file')

  };
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    if (addr) {
      Geocode.fromAddress(addr).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat)
          setLng(lng)
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [addr])

  const handelDelete = () => {
    setDeleting(!deleting)
    swal("Are you sure you want to delete this?", {
      buttons: ["No!", "Yes!"],
    }).then((del) => {
      if (del) {
        dispatch(deleteProperty(property._id)).then((response) => {
          setLoading(!loading)
          navigate('/app/apartments', { replace: true });
        }).catch((err) => {
          setLoading(!loading)
          setErrorMsg('An error occurred!')
        })
      } else {
        swal("No deletion was made!");
      }
    });
  }

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
      propertyName: property?.propertyName,
      propertyType: property?.propertyType,
      description: property?.description,
      address: property?.address,
      state: property?.state,
      city: property?.city,
      zipCode: property?.zipCode,
      noOfRooms: property?.noOfRooms,
      noOfBaths: property?.noOfBaths,
      noOfguest: property?.noOfguest,
      amenities: property?.amenities,
      agentDiscount: property?.agentDiscount,
      pricePerNight: property?.pricePerNight,
      latitude: property?.latitude,
      longitude: property?.longitude
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      propertyName: Yup.string().required('property name is required'),
      propertyType: Yup.string().required('property type is required'),
      description: Yup.string().required('description is required'),
      address: Yup.string().required('address is required'),
      state: Yup.string().required('state is required'),
      city: Yup.string().required('city is required'),
      zipCode: Yup.string().required('Zipcode is required'),
      noOfRooms: Yup.number().required('No of rooms is required'),
      noOfBaths: Yup.number().required('No of baths is required'),
      noOfguest: Yup.number().required('No of guest per room is required'),
      amenities: Yup.string().required('Amenities is required'),
      agentDiscount: Yup.number().required('agent discount is required'),
      pricePerNight: Yup.string().required('Price per night is required'),
    }),

    onSubmit: (values) => {
      console.log(values, lng, lat)
        setLoading(!loading)
        console.log(values, 'values')
        if (id) {
          swal("Are you sure you want to update this?", {
            buttons: ["No!", "Yes!"],
          }).then((update) => {
            if (update) {
              dispatch(updateProperty(property._id, values)).then((response) => {
                setLoading(!loading)
                navigate('/app/apartments');
              }).catch((err) => {
                setLoading(!loading)
                setErrorMsg('An error occurred!')
              })
            } else {
              swal("No updates were made!");
            }
          });
        } else {
          if (files.length <= 0) {
            return setErrorMsg('image is required')
          }

          const uploadURL = 'https://api.cloudinary.com/v1_1/drhvgijzb/image/upload';
          const uploadPreset = 'st4gan5t';
          const uploads = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);
            formData.append("timestamp", (Date.now() / 1000) | 0);
            delete axios.defaults.headers.common['x-access-token'];
            return axios.post(uploadURL, formData, {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }).then(response => {
              const data = response.data;
              // const fileURL = data.secure_url 
              return data.url
            }).catch((err) => setErrorMsg(err))
          })

          axios.all(uploads).then((res) => {
            const propertyData = { ...values, img: res, latitude: lat, longitude: lng }
            dispatch(createProperty(propertyData)).then((res) => navigate('/app/apartments')).catch(err => setErrorMsg(err))
          }).catch((err) => setErrorMsg(err))
        }
    },
  });
  return (
    <form
      autoComplete="off"
      noValidate
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={`${id === undefined}` ? "" : "The information can be edited"}
          title="Listing Submission"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Box className="container">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {errorMsg && <p style={{ color: 'red', paddingTop: '5px' }}>{errorMsg}</p>}
                <aside
                  style={thumbsContainer} >
                  {thumbs}
                </aside>
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Property Name"
                label="Property Name"
                name="propertyName"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.propertyName || ''}
                variant="outlined"
                error={Boolean(touched.propertyName && errors.propertyName)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl variant="outlined" fullWidth >
                <InputLabel id="propertyType">Property Type</InputLabel>
                <Select
                  labelId="propertyType"
                  id="propertyType"
                  value={values.propertyType || ''}
                  name="propertyType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!propertyTypeList.length}
                  label="propertyType"
                >
                  {propertyTypeList.map((item) => <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>)}

                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                name="description"
                placeholder="Placeholder"
                helperText="Please enter a description"
                multiline
                rows={9}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.description || ''}
                variant="outlined"
                error={Boolean(touched.description && errors.description)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                helperText="Please specify an address"
                onChange={(e) => {
                  handleChange(e)
                  setAddr(e.target.value)
                }}
                onBlur={handleBlur}
                required
                value={values.address || ''}
                variant="outlined"
                error={Boolean(touched.address && errors.address)}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                helperText="Please specify City"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.city || ''}
                variant="outlined"
                error={Boolean(touched.city && errors.city)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                helperText="Please specify Zipcode"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.zipCode || ''}
                variant="outlined"
                error={Boolean(touched.zipCode && errors.zipCode)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl variant="outlined" fullWidth >
                <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                <Select
                  labelId="state"
                  id="state"
                  value={values.state || ''}
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!stateList.length}
                  label="State"
                >
                  {stateList.map((item) => <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>)}

                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="No Of Rooms"
                name="noOfRooms"
                helperText="Please specify the number of rooms"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                value={values.noOfRooms || ''}
                variant="outlined"
                error={Boolean(touched.noOfRooms && errors.noOfRooms)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="No Of Baths"
                helperText="Please specify the number of baths"
                name="noOfBaths"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                value={values.noOfBaths || ''}
                variant="outlined"
                error={Boolean(touched.noOfBaths && errors.noOfBaths)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="No Of Guest"
                name="noOfguest"
                helperText="Please specify the Property Name"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                value={values.noOfguest || ''}
                variant="outlined"
                error={Boolean(touched.noOfguest && errors.noOfguest)}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Amenities"
                name="amenities"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.amenities || ''}
                variant="outlined"
                placeholder="eg Tv, Kitchen, Air-Conditioning"
                error={Boolean(touched.amenities && errors.amenities)}
              />            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Agent Discount"
                name="agentDiscount"
                helperText="Please specify the Agent's discount amount"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                value={values.agentDiscount || ''}
                variant="outlined"
                error={Boolean(touched.agentDiscount && errors.agentDiscount)}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Price Per Night"
                name="pricePerNight"
                helperText="Please specify the price per night"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.pricePerNight || ''}
                variant="outlined"
                error={Boolean(touched.pricePerNight && errors.pricePerNight)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Latitude"
                name="latitude"
                helperText="Please specify the Latitude"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.latitude || ''}
                variant="outlined"
                error={Boolean(touched.latitude && errors.latitude)}

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                helperText="Please specify the Longitude"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={values.longitude || ''}
                variant="outlined"
                error={Boolean(touched.longitude && errors.longitude)}

              />
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
            color="secondary"
            variant="contained"
            onClick={handelDelete}
            sx={{
              marginRight: '10px',
            }}
          >
            Delet{deleting ? 'ing' : 'e'} property
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            {id ? `${'Updat'}` : `${'Creat'}`}{loading ? 'ing' : 'e'} property
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

export default ApartmentForm;
