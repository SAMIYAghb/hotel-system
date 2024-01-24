import React, { useContext, useEffect, useState } from "react";
import { getBookingdetailsUrl } from "../../../../services/api";
import { AuthContext } from "../../../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, Typography, Button } from "@mui/material";

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
      <Container>
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
          {/* <Link to='/user/home/payment'> */}
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
