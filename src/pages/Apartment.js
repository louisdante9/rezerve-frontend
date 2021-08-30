import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// import AccountProfile from 'src/components/account/AccountProfile';
import ApartmentForm from 'src/components/apartment/apartmentForm';
import { getApartment } from '../actions'

const Apartmemt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(()=> {
    if(id) {
      dispatch(getApartment(id))
    }
  }, [dispatch, id]);
  
  const { property: {apartment} } = useSelector((state)=> state.getApartments)

  return (
  <>
    <Helmet>
      <title>Apartmemt | Rezerve Homes</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          {/* <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid> */}
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <ApartmentForm property={apartment} id={id} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Apartmemt;
