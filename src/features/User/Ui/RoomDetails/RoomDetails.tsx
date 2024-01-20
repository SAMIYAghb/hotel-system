import React, { useContext, useEffect, useState } from 'react'
import StartBooking from '../StartBooking/StartBooking'
import axios from 'axios';
import { userRoomsDetailsUrl } from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const [roomDetails, setRoomDetails] = useState([]);
  const { requestHeaders } = useContext(AuthContext);
  const { roomId } = useParams();
  // Get All Rooms
  const displayRoomsDetails = () => {
    axios.get(`${userRoomsDetailsUrl}${roomId}`,
    {
      headers: requestHeaders
    })
      .then((response) => {
        setRoomDetails(response?.data?.data?.room)
        console.log(response.data.data.room)


      })
      .catch((error) => {
        console.log(error);


      })

  }
  useEffect(() => {
    console.log("roomId:", roomId);
    displayRoomsDetails();
  }, [])

  return (
    <>
      <StartBooking />
      <div>

        <h2>{roomDetails.roomNumber}</h2>
        <p> {roomDetails.price}</p>
        <p> {roomDetails.capacity}</p>
        <p> {roomDetails.facilities}</p>

      </div>

    </>
  )
}

export default RoomDetails