import React, { useContext, useEffect, useState } from "react";
import { getBookingdetailsUrl } from "../../../../services/api";
import { AuthContext } from "../../../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Input,
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";

const BookingDetails = () => {
  const navigate =useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  const { requestHeaders } = useContext(AuthContext);
  const { bookingId } = useParams();
  // console.log(bookingId);
  // **** Cancel Button*******
  const goBack = () => {
    navigate(-1);
  };
  // ************ get Booking Details****************
  const getBookingDetails = async (bookingId) => {
    await axios
      .get(`${getBookingdetailsUrl}${bookingId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        // console.log(response);
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
      <Container sx={{ mx: "auto" }}>
        <Typography variant="h4" sx={{my:'3rem'}} >
          Booking Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6"  sx={{mb:'1.5rem'}}>
              Booking Details
            </Typography>
            <Stack>
              <TextField
                label="Booking ID"
                value={bookingDetails?._id}
                focused
              />
              <TextField
                sx={{ my: "1.5rem" }}
                label="Your name"
                value={bookingDetails?.user?.userName}
                focused
              />
              <TextField
                label="Room Number"
                value={bookingDetails?.room?.roomNumber}
                focused
              />
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6"  sx={{mb:'1.5rem'}}>
              Your reservation:
            </Typography>
            <Stack>
              <TextField
                label="Booking start date"
                value={bookingDetails?.startDate}
                focused
              />
              <TextField
                sx={{ my: "1.5rem" }}
                label="Booking end date"
                value={bookingDetails?.endDate}
                focused
              />

              <TextField
                value={bookingDetails?.totalPrice}
                label="total Price $"
                color="primary"
                focused
              />
              <TextField
                sx={{ my: "1.5rem" }}
                label="Booking status"
                value={bookingDetails?.status}
                focused
              />
              <TextField
                label="Booking created at"
                value={bookingDetails?.createdAt}
                focused
              />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{display:"flex", justifyContent:"space-around", mt:'2rem'}}>
        <Button onClick={goBack} variant="outlined">
                      Cancel
         </Button>
        <Link to={`/user/home/payment/${bookingDetails?._id}`}>
          <Button type="submit" variant="contained">
            Continue to pay
          </Button>
        </Link>
        
        </Box>
      </Container>
    </>
  );
};

export default BookingDetails;
