import React, { useContext, useEffect, useState } from 'react'
import StartBooking from '../StartBooking/StartBooking'
import axios from 'axios';
import {userRoomsDetailsUrl } from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import imgO from '../../../../assets/images/Hotel.jpg'
import { Divider, Typography} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import style from './RoomDetails.module.scss'
import Box from '@mui/material/Box';
import Comments from '../Comments/Comments';
import Ratings from '../Ratings/Ratings';

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
      })
      .catch((error) => {
      })


  }

  useEffect(() => {
    console.log("roomId:", roomId);
    displayRoomsDetails();
  }, [])

  return (
    <>

      <Typography variant="h2" style={{ textAlign: 'center', marginBottom: '10px' }}>
        {roomDetails.roomNumber}
      </Typography>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '5px' }}>
        <Typography variant="body1" style={{ marginRight: '5px' }}>
          <Link to="/user/home" style={{ color: 'black', textDecoration: 'none' }}>
            Home
          </Link>
        </Typography>
        <Typography variant="body1" style={{ marginRight: '5px' }}>/</Typography>
        <Typography variant="body1" style={{ color: '#1a237e' }}>
          Room Details
        </Typography>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8} lg={8}>
            {/* <Item>xs=6 md=8</Item> */}
            <img
              src={roomDetails.images && roomDetails.images.length > 0 ? roomDetails.images[0] : imgO}
              alt="Large Image"
              className={`${style.fadeInImage} `}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', paddingLeft: '20px'

              }}
            />

          </Grid>
          <Grid item xs={6} md={4}>
            {roomDetails.images && roomDetails.images.slice(1, 3).map((img, index) => (
              <img src={img} alt={`Small Image ${index + 1}`}
                style={{
                  width: '80%', height: '50%', objectFit: 'cover',

                }}
                className={`${style.fadeInImage} ${style.show}`}

              />

            ))}
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography variant="body1" sx={{ paddingLeft: '10px' }}>
              Welcome to our elegant and comfortable rooms designed to provide you with a
              memorable stay. Each room is thoughtfully furnished to ensure a perfect blend of style and functionality. The spacious interiors are adorned with modern décor,
              creating a welcoming atmosphere for both leisure and business travelers.
            </Typography>
            <Typography variant='body2' sx={{ paddingLeft: '10px' }}>
              Each room boasts a stunning view and is meticulously designed to create a soothing ambiance. The combination of tasteful furnishings and modern conveniences ensures that your time with us is both enjoyable and rejuvenating.

              Indulge in the ultimate comfort with plush bedding, and unwind in the well-appointed
              sitting area. The en-suite bathroom features a spa-like atmosphere,
              allowing you to pamper yourself after a day of exploration or business meetings.
            </Typography>
            <Typography sx={{ paddingLeft: '10px' }}>
              Whether you're here for business or leisure, our rooms are your sanctuary away from home. Experience unmatched hospitality and exceptional service throughout your stay.
              Book now to secure your reservation and embark on a delightful journey of relaxation and luxury.
            </Typography>
            <Typography variant="h6" color="secondary" sx={{ paddingLeft: '10px' }}>Key Features:</Typography>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingLeft: '10px' }}>
              <MonetizationOnIcon style={{ marginRight: '5px', color: 'EC407A' }} />
              <Typography variant="body1">Price: {roomDetails.price}</Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingLeft: '10px' }}>
              <PeopleIcon style={{ marginRight: '5px', color: 'EC407A' }} />
              <Typography variant="body1">Capacity: {roomDetails.capacity}</Typography>
            </div>
            <div style={{ marginBottom: '10px', paddingLeft: '10px' }}>
              <Typography variant="body1">Facilities:</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {roomDetails.facilities?.map((facility) => (
                  <li key={facility?._id}>
                    <EmojiObjectsIcon style={{ marginRight: '5px', color: 'EC407A' }} />
                    {facility?.name}
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <StartBooking />
          </Grid>
        </Grid>
      </Box>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Ratings roomId={roomId} />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ textAlign: 'center' }} />
          <Grid item xs={12} lg={5}>
            <Comments roomId={roomId} />

          </Grid>
        </Grid>
      </Container>



    </>
  )
}

export default RoomDetails