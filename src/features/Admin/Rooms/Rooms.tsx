import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  deleteRoomsUrl,
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
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import { styled } from '@mui/system';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import styleroom from "./Rooms.module.scss";
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { CloseIcon } from '@mui/icons-material/Close';

const Rooms = () => {
  const { requestHeaders, saveUserData } = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [roomDetails, setRoomDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = React.useState("close");

  const handleClose = () => setModalState("close");

  const showViewModal = (id) => {
    setRoomId(id);
    setModalState("view-modal");
    getRoomDetails(id);
  };

  const showUpdateModal = (room) => {
    setRoomId(room._id);
    // setValue("title", task.title);
    // setValue("description", task.description);
    // setValue("employeeId", task.employee.userName);
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
    console.log(data);
    axios
      .put(`${updateRoomsUrl}${roomId}`, data, {
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

  useEffect(() => {
    getAllRooms();
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
      {/* <Modal open={modalState === "update-modal"} onClose={handleClose}>
        <div>
          <Typography variant="h5">Update Task</Typography>
          <form onSubmit={handleSubmit(updateTask)} className="form-wrapper m-auto pt-5 pb-3 px-5">

          </form>
        </div>
      </Modal> */}

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
          <div className="text-center"></div>
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
