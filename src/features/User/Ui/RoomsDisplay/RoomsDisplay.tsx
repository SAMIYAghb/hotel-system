import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { favRooms, roomsDisplayUrl } from '../../../../services/api';
// import Carousel from 'react-material-ui-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "./RoomsDisplay.scss"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RoomsDisplay.scss"
import { IconButton, Grid, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import noImage from "../../../../assets/images/noImage.jpg"
import { toast } from 'react-toastify';
import { NextArrow, PrevArrow } from '../../../../shared/CarouselArrows/CarouselArrows';
import { Link } from 'react-router-dom';

const RoomsDisplay = () => {

  const { requestHeaders } = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [roomId, setRoomId] = useState(0);
  const [favStatus, setFavStatus] = useState({}); // To update the status of Fav

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 5,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,

  };
  console.log(settings);

  const responsiveSettings = {
    // Define responsive settings based on screen width
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },

    ],
  };

  // Navigate to room details page
  const navigateToDetails = (roomId) => {
    console.log("Navigate to room details with ID:", roomId);
  };
  // Get All Rooms
  const displayRooms = () => {
    axios.get(`${roomsDisplayUrl}`, {
      headers: requestHeaders
    })
      .then((response) => {
        setRoomsList(response?.data?.data?.rooms)
        console.log(response.data.data.rooms)


      })
      .catch((error) => {
        console.log(error);


      })
      .finally(() => setLoading(false));
  }

  // Add to Fav
  const addToFav = (roomId: string) => {
    axios.post(`${favRooms}`,
      {
        roomId: roomId
      },
      {
        headers: requestHeaders
      })
      .then((response) => {
        toast.success("Room Add to Favorite Successfully")
        setFavStatus((prevFavStatus) => ({
          ...prevFavStatus,
          // ...prevFavStatus: This is the spread operator (...).
          //  It's used to create a shallow copy of the previous state prevFavStatus
          [roomId]: true,
          // creates a new key-value pair in the state object where the key is the roomId of the current room,
          //  and the value is set to true. This indicates that the room is now marked as a favorite.
        }));

      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })


  }

  useEffect(() => {
    displayRooms();
  }, [])
  return (
    <>

      <div className="slider">
        <h3>Most Picked</h3>
        {roomsList && roomsList.length > 0 && (
          <Slider  {...settings} {...responsiveSettings}>
            {roomsList.map((room) => (
              <div key={room._id} className="room-container">
                <h3>{room.roomNumber}</h3>
                {room.images && room.images.length > 0 ? (
                  <div className="room-content">
                    <img
                      src={room.images[0]}
                      alt={`Room ${room.roomNumber} - Image 1`}
                      className="room-image"
                      style={{ padding: '5px' }}
                    />
                    {room.discount && (
                      <div className="discount-badge" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        -{room.discount}%OFF
                      </div>
                    )}

                    <div className="overlay">
                      <Grid container justifyContent="center" alignItems="center">
                        <IconButton onClick={() => addToFav(room._id)}>
                          <FavoriteIcon style={{ color: favStatus[room._id] ? '#f50057' : 'white' }} />
                        </IconButton>
                        {/* <IconButton>
                          <VisibilityIcon style={{ color: '#4dabf5' }} />
                        </IconButton> */}
                        {/* Link to the details page when the eye icon is clicked */}
                        <Link to={`/room-details/${room._id}`} style={{ textDecoration: 'none' }}>
                          <IconButton onClick={() => navigateToDetails(room._id)}>
                            <VisibilityIcon style={{ color: '#4dabf5' }} />
                          </IconButton>
                        </Link>
                      </Grid>
                    </div>
                  </div>
                ) : (
                  <div className="default-image">

                    <img src={noImage} width={100} height={100} alt="" />
                  </div>
                )}
              </div>
            ))}

          </Slider>
        )}
      </div>
    </>
  )
}

export default RoomsDisplay