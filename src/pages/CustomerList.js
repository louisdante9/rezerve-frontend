/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { fetchUsers } from '../actions'
// import customers from 'src/__mocks__/customers';

const CustomerList = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchUsers())
  }, []);
  const { users } = useSelector((state)=> state.getUsers)
  const [userFilter, setUserFilter] = useState('user');
  console.log(users, 'users')
  return (
  <>
    <Helmet>
      <title>Clients | Rezerve Homes</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar setuserfilter={setUserFilter}/>
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={users} userFilter={userFilter}/>
        </Box>
      </Container>
    </Box>
  </>
)};

export default CustomerList;
