import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import noImage from "../../../assets/images/noData.png";
import noData from "../../../assets/images/no-data.png";
import bookDetails from "../../../assets/images/bookDetails.png";
import { AuthContext } from "../../../context/AuthContext";
import {
  bookingDetailsUrl,
  bookingUrl,
  deleteBookingUrl,
} from "../../../services/api.tsx";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomModal from "../../UI/CustomModal/CustomModal.tsx";

const Bookings: React.FC = () => {
  const { requestHeaders }: any = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  // **********modal*************
  const [modalState, setModalState] = React.useState("close");
  const handleClose = () => setModalState("close");

  // **********get all bookingss*****************
  const getBookingsList = () => {
    axios
      .get(`${bookingUrl}?page=1&size=10`, {
        headers: requestHeaders,
      })
      .then((response) => {
        // console.log("succ book list", response?.data?.data?.booking);
        setBookings(response?.data?.data?.booking);
      })
      .catch((error) => {
        // console.log("error", error);
      });
  };
  // ************booking Details****************
  const getBookingDetails = (bookingId) => {
    axios
      .get(`${bookingDetailsUrl}/${bookingId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        // console.log("book details", response?.data?.data.booking);
        setBookingDetails(response?.data?.data?.booking);
      })
      .catch((error) => {
        // console.log("book det", error);
      });
  };
  //********** Deleted booking****************
  const deleteBooking = (bookingId) => {
    axios
      .delete(`${deleteBookingUrl}/${bookingId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        handleClose();
        getBookingsList();
   
      })
      .catch((error) => {
        // console.log("book delet err", error);
       
      });
  };
  // ***********view-Modal*************
  const showViewModal = (bookingId) => {
    setBookingId(bookingId);
    setModalState("view-modal");
    getBookingDetails(bookingId);
  };
  //************ */ Delete-Modal**************
  const showDeleteModal = (bookingId) => {
    setBookingId(bookingId);
    setModalState("delete-modal");
  };

  useEffect(() => {
    getBookingsList();
  }, []);

  return (
    <>
      <Container>
        <Grid item>
          <Typography component="h2" variant="h4">
            Booking Table Details
          </Typography>
          <Typography component="h2" variant="h6">
            You can check all details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f8f9fb" }}>
                <TableRow>
                  <TableCell>Booking Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings?.length > 0 ? (
                  bookings.map(
                    ({ _id, status, totalPrice, startDate, endDate }) => (
                      <TableRow key={_id}>
                        <TableCell>{status}</TableCell>
                        <TableCell>{totalPrice}</TableCell>
                        <TableCell>
                          {new Date(startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() => showViewModal(_id)}
                          >
                            <RemoveRedEyeIcon />
                          </Button>
                          <Button
                            color="error"
                            onClick={() => showDeleteModal(_id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow key="no-data">
                    <TableCell colSpan={5} style={{ height: "100%" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        <img
                          src={noData}
                          alt="No Data"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* view dialog */}

          {/* View Modal */}
          <CustomModal
            open={modalState === "view-modal"}
            onClose={handleClose}
            title="Your Booking Details"
          >
            <div>
              <div style={{ textAlign: "center",marginTop:".5rem" }}>
                <div   style={{ width: "200px", height: "150px" }}>
              <img
                src={bookDetails}
                alt="view"
                style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
              />
              </div>
                <p>
                  <span className="text-warning"> Start date :&nbsp;</span>
                  {new Date(bookingDetails?.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-warning"> End date :&nbsp;</span>
                  {new Date(bookingDetails?.endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-warning">Booking status :&nbsp;</span>
                  {bookingDetails?.status}
                </p>
                <p>
                  <span className="text-warning">Price :&nbsp;</span>
                  {bookingDetails?.totalPrice}
                </p>
              </div>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleClose}
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    right: "20px",
                  }}
                >
                  Ok
                </Button>
              </Grid>
            </div>
          </CustomModal>

          {/* Delete Modal */}
          <CustomModal
            open={modalState === "delete-modal"}
            onClose={handleClose}
            title="Delete this Booking?"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src={noImage}
                alt="Delete"
                style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
              />
            </div>
            <p>Are you sure you want to delete this booking ? </p>
            <div>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  onClick={() => deleteBooking(bookingId)}
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    right: "20px",
                  }}
                >
                  Delete Booking
                </Button>
              </Grid>
            </div>
          </CustomModal>
        </Grid>
      </Container>
    </>
  );
};

export default Bookings;
