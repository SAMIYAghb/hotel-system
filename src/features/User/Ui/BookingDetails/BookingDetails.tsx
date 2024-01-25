import React, { useContext, useEffect, useState } from "react";
import { getBookingdetailsUrl } from "../../../../services/api";
import { AuthContext } from "../../../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, Typography, Button, TextField ,Grid} from "@mui/material";

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  const { requestHeaders } = useContext(AuthContext);
  const { bookingId } = useParams();
  // console.log(bookingId);
  // ************ get Booking Details****************
  const getBookingDetails = async (bookingId) => {
    await axios
      .get(`${getBookingdetailsUrl}${bookingId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log(response);
        setBookingDetails(response?.data?.data?.booking);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getBookingDetails(bookingId);
  }, []);

  return (
    <>
      {/* <Container>
        BookingDetails
        <Box>
          <Typography>Booking Details</Typography>
          <Typography>{bookingDetails?._id}</Typography>
          <Typography>Your name :{bookingDetails?.user?.userName}</Typography>
          <Typography>
            Room Number :{bookingDetails?.room?.roomNumber}
          </Typography>
          <Typography>Your reservation :</Typography>
          <Typography>
            Booking start date: {bookingDetails?.startDate}
          </Typography>
          <Typography>Booking end date: {bookingDetails?.endDate}</Typography>
          <Typography>totalPrice: {bookingDetails?.totalPrice}</Typography>
          <Typography>Booking status: {bookingDetails?.status}</Typography>
          <Typography>Booking created at: {bookingDetails?.createdAt}</Typography>
          <Link to={`/user/home/payment/${bookingDetails?._id}`}>
            <Button type="submit" variant="contained">
              Continue to pay
            </Button>
          </Link>
        </Box>
      </Container> */}
        
    {/* <Container>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            label="Booking ID"
            value={bookingDetails?._id}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Your name"
            value={bookingDetails?.user?.userName}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Room Number"
            value={bookingDetails?.room?.roomNumber}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Typography variant="h6" gutterBottom>
          Your reservation:
        </Typography>
        <Grid item>
          <TextField
            label="Booking start date"
            value={bookingDetails?.startDate}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Booking end date"
            value={bookingDetails?.endDate}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Total Price"
            value={bookingDetails?.totalPrice}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Booking status"
            value={bookingDetails?.status}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Booking created at"
            value={bookingDetails?.createdAt}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Link to={`/user/home/payment/${bookingDetails?._id}`}>
        <Button type="submit" variant="contained">
          Continue to pay
        </Button>
      </Link>
    </Container> */}
       <Container>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      <Grid container spacing={2}>
       
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <TextField
            label="Booking ID"
            value={bookingDetails?._id}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Your name"
            value={bookingDetails?.user?.userName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Room Number"
            value={bookingDetails?.room?.roomNumber}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
 
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Your reservation:
          </Typography>
          <TextField
            label="Booking start date"
            value={bookingDetails?.startDate}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Booking end date"
            value={bookingDetails?.endDate}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Total Price"
            value={bookingDetails?.totalPrice}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Booking status"
            value={bookingDetails?.status}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Booking created at"
            value={bookingDetails?.createdAt}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Link to={`/user/home/payment/${bookingDetails?._id}`}>
        <Button type="submit" variant="contained">
          Continue to pay
        </Button>
      </Link>
    </Container>
     
    </>
  );
};

export default BookingDetails;
