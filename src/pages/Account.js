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
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import { fetchAUserDetails } from '../actions'


const Account = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchAUserDetails(id))
  }, [dispatch, id]);
  
  const { getUser: user}  = useSelector((state)=> state)

  return (
  <>
    <Helmet>
      <title>Account | Rezerve</title>
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
            <AccountProfileDetails user={user}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Account;
