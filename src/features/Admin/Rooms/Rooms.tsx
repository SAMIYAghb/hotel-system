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
import CustomButton from "../../UI/CustomButton/CustomButton";
import {
  AppBar,
  Button,
  Checkbox,
  // CircularProgress,
  // Dialog,
  // DialogContent,
  // DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import styleroom from "./Rooms.module.scss";
import { IAddRoom } from "../../../interface/RoomInterface";
import { useForm } from "react-hook-form";
// import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import noData from '../../../assets/images/noData.png'
import SearchIcon from "@mui/icons-material/Search";
import noImage from '../../../assets/images/noImage.jpg'
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { CloseIcon } from '@mui/icons-material/Close';

const Rooms = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [roomDetails, setRoomDetails] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [modalState, setModalState] = React.useState("close");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleClose = () => setModalState("close");
  // const [searchRoom, setSearchRoom] = useState('');
  // const [timerId, setTimerId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<IAddRoom>();


  // view-Modal
  const showViewModal = (id) => {
    setRoomId(id);
    setModalState("view-modal");
    getRoomDetails(id);
  };
  // Update-Modal
  const showUpdateModal = (room) => {
    setRoomId(room._id);
    setValue("roomNumber", room.roomNumber);
    setValue("price", room.price);
    setValue("capacity", room.capacity);
    setValue("discount", room.discount);
    // setValue("facilities", room?.facilities?.name);
    // setValue("facilities", room?.facilities?.name || []);
    const selectedFacilities = room?.facilities?.map((f) => f._id) || [];
    setValue("facilities", selectedFacilities);


    setModalState("update-modal");
  };
  // Delete_Modal
  const showDeleteModal = (roomId) => {
    setRoomId(roomId);
    setModalState("delete-modal");
  };
  // Format Data
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

  // Get All Rooms
  const getAllRooms = (page: number) => {

    axios
      .get(`${roomsUrl}`, {
        headers: requestHeaders,
        params: {
          size: rowsPerPage,
          page: page,
          // roomNumber: searchRoom
        }
      })
      .then((response) => {
        setPagesArray(Array.from(
          { length: response?.data?.data.totalCount },
          (_, i) => i + 1));
        setRoomsList(response.data.data.rooms);
        setCurrentPage(page); // Set the current page based on the parameter
      })
      .catch((error) => {

      });
  };
  //************* Update Rooms**************

  const updateRoom = (data) => {
    const upfdateFormData = appendToFormData(data);

    axios
      .put(`${updateRoomsUrl}${roomId}`, upfdateFormData, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log(response);
        handleClose();

        // Fetch updated data after the update
        getAllRooms(currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //********** Deleted Rooms****************
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
  // ************Room Details****************
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
  /**********Get All Facility*******/
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

  //******** pagination*************
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // Update currentPage
    getAllRooms(newPage + 1); // Pass the newPage to getAllRooms
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); // Set currentPage to 1 when rowsPerPage changes
    getAllRooms(1); // Pass 1 as the initial page when rowsPerPage changes
  };

  // Search
  // const getRoomNumberValue = (e) => {
  //   console.log(e);

  //   setSearchRoom(e?.target?.value);

  // }
  // Function to handle search button click

  useEffect(() => {
    getAllRooms(currentPage);
    getAllFacility();
  }, [currentPage]);


  // useEffect(() => {
  //   // console.log("Search Room:", searchRoom);
  //   if (timerId) {
  //     clearTimeout(timerId);
  //   }

  //   const newTimeOut = setTimeout(() => {
  //     // console.log("Fetching rooms with search term:", searchRoom);
  //     getAllRooms(1, searchRoom);

  //   }, 500);

  //   setTimerId(newTimeOut);

  //   return () => {
  //     if (timerId) {
  //       clearTimeout(timerId);
  //     }
  //   };
  // }, [searchRoom]);

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
      <div style={{ marginTop: '40px' }}></div>
      {/* search */}
      <div style={{ marginBottom: '10px', width: '50%' }}>
        <TextField
          fullWidth
          placeholder="Search by Room Number...."
          // onChange={getRoomNumberValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="success" />
              </InputAdornment>
            ),
            style: { paddingLeft: "2rem" },
          }}
          className="my-2"
        />
      </div>
      <div>
        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell >Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell align="center" valign="middle">Actios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomsList?.length > 0 &&
                roomsList.map((room) => (
                  <TableRow key={room?._id}>
                    <TableCell align="center" valign="middle">{room?.roomNumber}</TableCell>
                    <TableCell  >
                      {room?.images && room.images.length > 0 ?
                        <img
                          src={room?.images[0]}
                          alt={`Room ${room?.roomNumber}`}
                          style={{ width: "50px", height: "50px" }}
                        /> :
                        <img src={noImage}
                          alt="Placeholder"
                          style={{ width: "50px", height: "50px" }} />}
                    </TableCell>
                    <TableCell align="center" valign="middle">{room?.price}</TableCell>
                    <TableCell align="center" valign="middle">{room?.discount}</TableCell>
                    <TableCell align="center" valign="middle">{room?.capacity}</TableCell>

                    <TableCell>
                      <Button
                        color="primary"
                        className={`${styleroom.customBtn}`}
                        onClick={() => showViewModal(room?._id)}
                        style={{ marginRight: '2px !important' }}
                      >
                        <RemoveRedEyeIcon style={{ border: 'none' }} />
                      </Button>
                      <Button

                        color="warning"
                        className={`${styleroom.customBtn}`}

                        onClick={() => showUpdateModal(room)}
                        style={{ marginRight: '2px !important' }}
                      >
                        <EditIcon style={{ border: 'none' }} />
                      </Button>
                      <Button
                        // color="danger"
                        onClick={() => showDeleteModal(room._id)}
                        className={`${styleroom.customBtn}`}
                        style={{ marginRight: '2px !important' }}
                      >
                        <DeleteIcon style={{ border: 'none' }} sx={{ color: red[500] }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={pagesArray.length}  // Update this line
                  rowsPerPage={rowsPerPage}
                  page={currentPage - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
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
        <div className={styleroom.paper} style={{
          width: '40%', // 40% of the modal width
          height: '80%', // 80% of the modal height
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <Typography variant="h5">Rooms Details</Typography>
          <div style={{ textAlign: 'center' }}>
            <p>
              <span className="text-warning">Room Number :&nbsp;</span>
              {roomDetails?.roomNumber}
            </p>
            <p>
              <span className="text-warning">Price :&nbsp;</span>
              {roomDetails?.price}
            </p>
          </div>
          {/* Cancel button in the bottom right */}

          <Grid item xs={6}>
            <Button variant="contained" type="submit"
              onClick={handleClose}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Cancel
            </Button>
          </Grid>
        </div>
      </Modal>

      {/* Update Modal */}
      {/* <Modal open={modalState === "update-modal"} onClose={handleClose} className={styleroom.modal}>
        <div className={styleroom.paper}  custom-modal-content>
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
                          setValue("facilities", selectedOption ? [selectedOption.value] : null);


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
      </Modal> */}

      <Modal open={modalState === "update-modal"} onClose={handleClose} className={styleroom.modal}>
        <div className={styleroom.paper} style={{
          width: '40%', // 80% of the modal width
          height: '80%', // 80% of the modal height
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <Typography variant="h5">Update Room</Typography>

          <form onSubmit={handleSubmit(updateRoom)}>
            <TextField
              {...register("roomNumber", { required: true })}
              required
              id="filled-required"
              label="Room Number"
              fullWidth
              style={{ marginBottom: '1rem', width: '100%' }}

            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  {...register("price", { required: true, valueAsNumber: true })}
                  required
                  id="filled-required"
                  label="Price"
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
                  {...register("discount", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  required
                  id="discount"
                  label="Discount"
                  // variant="filled"
                  fullWidth
                  sx={{
                    width: "100%",
                    marginBottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%", // Add this line
                    paddingTop: '5px'
                  }}
                />
                {errors.discount && errors.discount.type === "required" && (
                  <span className="errorMsg">This field is required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ padding: "5px", minWidth: 120, width: '98%' }}>
                  <InputLabel id="facilities-label">Facilities</InputLabel>

                  {/* <Select
                        labelId="facilities-label"
                        id="facilities"
                        multiple
                        value={watch("facilities") || []} // Using watch from react-hook-form to get the current value
                        onChange={(e) => setValue("facilities", e.target.value, { shouldValidate: true })}
                        fullWidth
                        sx={{
                          width: "100%",
                          marginBottom: "1rem",
                        }}
                      >
                        {facilitiesList.map((facility) => (
                          <MenuItem key={facility._id} value={facility._id}>
                            {facility.name}
                          </MenuItem>
                        ))}
                      </Select> */}
                  <Select
                    labelId="facilities-label"
                    id="facilities"
                    label="facilities"
                    multiple
                    value={watch('facilities') || []}
                    onChange={(e) => setValue('facilities', e.target.value, { shouldValidate: true })}
                    sx={{ width: '100%' }}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <span key={value} style={{ marginRight: '8px' }}>
                            {facilitiesList.find((facility) => facility._id === value)?.name || ''}
                          </span>
                        ))}
                      </div>
                    )}
                    // MenuComponent={({ children, ...props }) => (
                    //   <div {...props}>
                    //     {children}
                    //     <Divider />
                    //     <MenuItem>
                    //       <Checkbox checked={watch('facilities')?.length === facilitiesList.length} />
                    //       <ListItemText primary="Select All" />
                    //     </MenuItem>
                    //   </div>
                    // )}
                  >
                    {facilitiesList.map((facility) => (
                      <MenuItem key={facility._id} value={facility._id}>
                        <Checkbox checked={watch('facilities')?.includes(facility._id)} />
                        <ListItemText primary={facility.name} />
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
                {errors.facilities && errors.facilities.type === "required" && (
                  <span className="errorMsg">Facilities are required</span>
                )}
              </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid item xs={6}>
              </Grid>

              <Grid item xs={6}>
                <Button variant="contained" type="submit"
                  style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}

      <Modal
        open={modalState === "delete-modal"}
        onClose={handleClose}

        className={styleroom.modal}

      >
        <div className={styleroom.paper}
          style={{
            width: '40%', // 80% of the modal width
            height: '80%', // 80% of the modal height
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Typography variant="h5">Delete this Room?</Typography>

          <div className="text-center">
            <img src={noData} alt="Delete" />

          </div>
          <p>Are you sure you want to delete this room ? </p>
          <div className="text-end">
            {/* <Button
              onClick={deleteRoom}
              className={
                "btn btn-outline-danger my-3" + (isLoading ? " disabled" : "")
              }
            >
              {isLoading ? <CircularProgress size={20} /> : "Delete this item"}
            </Button> */}
            <Grid item xs={6}>
              <Button variant="contained" type="submit"
                onClick={deleteRoom}
                style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
                Delete
              </Button>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Rooms;
