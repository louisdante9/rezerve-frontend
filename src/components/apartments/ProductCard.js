import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const ProductCard = ({ property, ...rest }) => {

  return (
    <Link to={`/app/apartment/${property._id}`}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer'
        }}
        {...rest}
      >
        <CardContent>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {property.propertyName}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
          >
            {property.address}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <AccessTimeIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {property.booked ? 'Booked' : 'Available'}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {property.bookings.length}
                {' '}
                bookings
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Link>
  )
};

ProductCard.propTypes = {
  property: PropTypes.object.isRequired
};

export default ProductCard;
