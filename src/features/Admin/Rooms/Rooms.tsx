import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { roomsUrl,addroomsUrl,roomsDetailsUrl,updateRoomsUrl,deleteRoomsUrl } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import { get } from 'react-hook-form';
import CustomButton from '../../UI/CustomButton/CustomButton';
const Rooms = () => {
  const { requestHeaders,saveUserData} = useContext(AuthContext);
  const [roomsList,setRoomsList] = useState([])
  const [roomId, setRoomId]: number= useState(0);
  const [roomDetails, setRoomDetails] = useState({});
  // Get All Rooms
  const getAllRooms = () => {
    console.log("Request Headers:", requestHeaders);

    axios.get(`${roomsUrl}`, {

      headers: requestHeaders,

    })
      .then((response) => {
        console.log(response?.data);
        // setRoomsList(response?.data?);
      })
      .catch((error) => {
         console.log('Error fetching rooms:', error);


      })
  }
  const updateRoom = (data) => {

    axios
      .put(`${updateRoom}/${roomId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
     getAllRooms();
      })
      .catch((error) => {

      })

  };
  // ************to deleted from Rooms*********
  const deleteRoom = () => {

    axios
      .delete(`${deleteRoom}/${roomId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
      roomsList(response.data.data);
        setRoomId(roomId);
        getAllRooms();
      })
      .catch((error) => {

      })

  };
  // ************get Room details to view****************
  const getRoomDetails = (roomId) => {
    axios
      .get(`${roomsDetailsUrl}/${roomId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setRoomDetails(response?.data);
      })
      .catch((error) => {

      });
  };


  useEffect(() => {
    getAllRooms();
  }, []);


  return (



    <CustomButton
    className="your-custom-class"
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    Add new Room
  </CustomButton>
  )
}

export default Rooms