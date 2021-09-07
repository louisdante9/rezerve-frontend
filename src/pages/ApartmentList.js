/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import ProductListToolbar from 'src/components/apartments/ProductListToolbar';
import ProductCard from 'src/components/apartments/ProductCard';
import {getApartments} from '../actions'

const ApartmemtList = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getApartments());
  }, []);
  const { apartments } = useSelector((state)=> state.getApartments)

  return (
  <>
    <Helmet>
      <title>Apartmemt | Rezerve</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {apartments.map((product) => (
              <Grid
                item
                key={product._id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard property={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
)};

export default ApartmemtList;
