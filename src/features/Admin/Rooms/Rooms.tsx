import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  deleteRoomsUrl,
  faciRoomsUrl,
  roomsDetailsUrl,
  roomsUrl,
  updateRoomsUrl,
} from "../../../services/api";
// import { get } from 'react-hook-form';
import CustomButton from "../../UI/CustomButton/CustomButton";
// import CustomTable from '../../UI/CustomTable/CustomTable';
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
// import { styled } from '@mui/system';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import styleroom from "./Rooms.module.scss";
import { IAddRoom } from "../../../interface/RoomInterface";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
// import { MenuItem } from "react-pro-sidebar";
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import noData from '../../../assets/images/noData.png'

// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { CloseIcon } from '@mui/icons-material/Close';

const Rooms = () => {
  const { requestHeaders, saveUserData } = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [roomDetails, setRoomDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [modalState, setModalState] = React.useState("close");

  const handleClose = () => setModalState("close");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IAddRoom>();

  const showViewModal = (id) => {
    setRoomId(id);
    setModalState("view-modal");
    getRoomDetails(id);
  };

  const appendToFormData = (data: IAddRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data["roomNumber"]);
    formData.append("price", data["price"]);
    formData.append("capacity", data["capacity"]);
    formData.append("discount", data["discount"]);
    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    } else if (data.facilities) {
      formData.append("facilities[]", data.facilities);
    }

    // formData.append("facilities", data["facilities"][0]);
    // formData.append("imgs", data["imgs"][0]);
    return formData;
  };


  const showUpdateModal = (room) => {
    setRoomId(room._id);
    setValue("roomNumber", room.roomNumber);
    setValue("price", room.price);
    setValue("capacity", room.capacity);
    setValue("discount", room.discount);
    setValue("facilities", room?.facilities?.name);


    setModalState("update-modal");
  };

  const showDeleteModal = (roomId) => {
    setRoomId(roomId);
    setModalState("delete-modal");
  };
  // Get All Rooms
  const getAllRooms = () => {
    axios
      .get(`${roomsUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log(response?.data.data.rooms);
        setRoomsList(response.data.data.rooms);
      })
      .catch((error) => {
        console.log("Error fetching rooms:", error);
      });
  };
  const updateRoom = (data) => {
    const upfdateFormData = appendToFormData(data);
    console.log(data);
    axios
      .put(`${updateRoomsUrl}${roomId}`, upfdateFormData, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getAllRooms();

      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ************to deleted from Rooms*********
  const deleteRoom = () => {
    axios
      .delete(`${deleteRoomsUrl}${roomId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setRoomsList(response.data.data);
        setRoomId(roomId);
        handleClose();
        getAllRooms();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ************get Room details to view****************
  const getRoomDetails = (roomId) => {
    axios
      .get(`${roomsDetailsUrl}/${roomId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setRoomDetails(response?.data?.data?.room);
        console.log(response?.data.data.room);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**********get facility*******/
  const getAllFacility = () => {
    axios
      .get(`${faciRoomsUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setFacilitiesList(response?.data?.data?.facilities);
        console.log(response?.data?.data?.facilities);


      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllRooms();
    getAllFacility();
  }, []);

  return (
    <>
      <AppBar position="static">
        <div className={styleroom.header}>
          <Typography variant="h6">
            Rooms Table Details
            <p variant="h6">You can check all details</p>
          </Typography>

          <Link to="/home/rooms/add-room">
            <CustomButton
              className="your-custom-class"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new Room
            </CustomButton>
          </Link>
        </div>
      </AppBar>

      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Actios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomsList?.length > 0 &&
                roomsList.map((room) => (
                  <TableRow key={room?._id}>
                    <TableCell>{room?.roomNumber}</TableCell>
                    <TableCell>
                      <img
                        src={room?.images[0]}
                        alt={`Room ${room?.roomNumber}`}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{room?.price}</TableCell>
                    <TableCell>{room?.discount}</TableCell>
                    <TableCell>{room?.capacity}</TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={`${styleroom.customBtn}`}
                        onClick={() => showViewModal(room?._id)}
                      >
                        <RemoveRedEyeIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        className={`${styleroom.customBtn}`}

                        onClick={() => showUpdateModal(room)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        // color="danger"
                        onClick={() => showDeleteModal(room._id)}
                        className={`${styleroom.customBtn}`}
                      >
                        <DeleteIcon sx={{ color: red[500] }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* -------------------------------------------------- */}
      {/* View Modal */}
      <Modal
        open={modalState === "view-modal"}
        onClose={handleClose}
        className={styleroom.modal}
      >
        <div className={styleroom.paper}>
          <Typography variant="h5">Rooms Details</Typography>
          <div>
            <p>
              <span className="text-warning">Room Number :&nbsp;</span>
              {roomDetails?.roomNumber}
            </p>
            <p>
              <span className="text-warning">Price :&nbsp;</span>
              {roomDetails?.price}
            </p>
          </div>
        </div>
      </Modal>

      {/* Update Modal */}
      {/* <Modal open={modalState === "update-modal"} onClose={handleClose}  className={styleroom.modal}>
        <div className={styleroom.paper}>
          <Typography variant="h5">Update Room</Typography>
          <form onSubmit={handleSubmit(updateTask)} className="form-wrapper m-auto pt-5 pb-3 px-5">

          </form>
        </div>
      </Modal> */}
      <Modal open={modalState === "update-modal"} onClose={handleClose} className={styleroom.modal}>
        <div className={styleroom.paper}>
          <Typography variant="h5">Update Room</Typography>

          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} mb={8} mt={4} sx={{ padding: "2rem" }}>
              <Box sx={{ my: 4, mx: "auto", display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%" }}>
                <Box component="form" noValidate onSubmit={handleSubmit(updateRoom)} sx={{ width: "100%", maxWidth: "none", mx: 0, paddingLeft: 0, paddingRight: 0 }}>
                  <TextField
                    {...register("roomNumber", { required: true })}
                    required
                    id="filled-required"
                    label="Room Number"
                    fullWidth
                    sx={{ width: "100%", marginBottom: "1rem" }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        {...register("price", { required: true, valueAsNumber: true })}
                        required
                        id="filled-required"
                        label="Price"
                        variant="filled"
                        fullWidth
                        sx={{ width: "100%", marginBottom: "1rem" }}
                      />
                      {errors.price && errors.price.type === "required" && (
                        <span className="errorMsg">This field is required</span>
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        {...register("capacity", { required: true })}
                        required
                        id="filled-required"
                        label="Capacity"
                        variant="filled"
                        fullWidth
                        sx={{ width: "100%", marginBottom: "1rem" }}
                      />
                      {errors.capacity && errors.capacity.type === "required" && (
                        <span className="errorMsg">This field is required</span>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        {...register("discount", { required: true, valueAsNumber: true })}
                        required
                        id="discount"
                        label="Discount"
                        variant="filled"
                        fullWidth
                        sx={{ width: "100%", marginBottom: "1rem" }}
                      />
                      {errors.discount && errors.discount.type === "required" && (
                        <span className="errorMsg">This field is required</span>
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel id="simple-dropdown-label">Facilities</InputLabel>
                      <Select
                        {...register("facilities", { required: true })}
                        options={facilitiesList?.map((facility, index) => ({
                          value: facility._id,
                          label: facility.name,
                        }))}
                        isClearable
                        isSearchable
                        placeholder="Select Facilities"
                        onChange={(selectedOption) => {
                          // Update the form value for the "facilities" field
                          setValue("facilities", selectedOption ? [selectedOption.value] : null);

                          // Handle the selected option here
                          console.log("Selected Option:", selectedOption);
                        }}
                      />
                      {errors.facilities && errors.facilities.type === "required" && (
                        <span className="errorMsg">Facilities are required</span>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {/* <Button onClick={goBack} variant="outlined">
                          Cancel
                        </Button> */}
                    </Grid>

                    <Grid item xs={6}>
                      <Button variant="contained" type="submit">
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>

        </div>
      </Modal>

      {/* Delete Modal */}

      <Modal
        open={modalState === "view-modal"}
        onClose={handleClose}
        className={styleroom.modal}
      >
        <div className={styleroom.paper}>
          <Typography variant="h5">Rooms Details</Typography>
          <div>
            <p>
              <span className="text-warning">Room Number :&nbsp;</span>
              {roomDetails?.roomNumber}
            </p>
            <p>
              <span className="text-warning">Price :&nbsp;</span>
              {roomDetails?.price}
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        open={modalState === "delete-modal"}
        onClose={handleClose}
        className={styleroom.modal}
      >
        <div className={styleroom.paper}>
          <Typography variant="h5">Delete this Room?</Typography>
          <div className="text-center">
            <img src={noData} alt="" />
          </div>
          <div className="text-end">
            <Button
              onClick={deleteRoom}
              className={
                "btn btn-outline-danger my-3" + (isLoading ? " disabled" : "")
              }
            >
              {isLoading ? <CircularProgress size={20} /> : "Delete this item"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Rooms;
