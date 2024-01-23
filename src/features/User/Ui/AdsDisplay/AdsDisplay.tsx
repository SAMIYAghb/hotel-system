import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { favRooms, roomsDisplayUrl, userAdsDisplayUrl } from '../../../../services/api';
// import Carousel from 'react-material-ui-carousel'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// requires a loader

import "./AdsDisplay.scss"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./RoomsDisplay.scss"
import { IconButton, Grid, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import noImage from "../../../../assets/images/noImage.jpg"
import { toast } from 'react-toastify';
import { NextArrow, PrevArrow } from '../../../../shared/CarouselArrows/CarouselArrows';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const AdsDisplay = () => {
  const [isInPage, setIsInPage] = useState(true);
  const { requestHeaders } = useContext(AuthContext);
  const [adsList, setAdsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [roomId, setRoomId] = useState(0);
  const [favStatus, setFavStatus] = useState({}); // To update the status of Fav

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
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
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 3,
          infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const navigate = useNavigate();
  // Navigate to room details page
  const navigateToDetails = (roomId) => {

    navigate(`/user/home/room-details/${roomId}`);

    console.log("Navigate to room details with ID:", roomId);
  };
  // Get All Rooms
  // const displayRooms = () => {
  //   axios.get(`${roomsDisplayUrl}`, {
  //     headers: requestHeaders
  //   })
  //     .then((response) => {
  //       setRoomsList(response?.data?.data?.rooms)
  //       console.log(response.data.data.rooms)


  //     })
  //     .catch((error) => {
  //       console.log(error);


  //     })
  //     .finally(() => setLoading(false));
  // }
  // ********* Get All Ads *********
  const displayAds = () => {
    axios.get(`${userAdsDisplayUrl}`, {
      headers: requestHeaders
    })
      .then((response) => {
        setAdsList(response?.data?.data?.ads)
        console.log(response.data.data.ads)


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
    displayAds();
    return () => {
      setIsInPage(false);
    };
  }, [])
  return (
    <>
      {/* <div className="container">
        <div className="wrapper">
          <h1>hurry up and book now</h1>
        </div>
      </div> */}
      <div className="slider">
        <h3 className='header-text'>Ads</h3>
        {adsList && adsList.length > 0 && (
          <Slider  {...settings} {...responsiveSettings}>
            {adsList.map((ad) => (
              <div key={ad._id} className="room-container">

                {ad.room.images && ad.room.images.length > 0 ? (
                  <div className="room-content">
                    <img
                      src={ad.room.images[0]}
                      alt={`Ad ${ad.room.roomNumber} - Image 1`}
                      className="room-image"
                      crossOrigin='anonymous'

                    />
                    {ad.isActive && ad.room.discount && (
                      <div className="discount-badge"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        {ad.room.discount}%
                      </div>
                    )}
                    <div>
                      <h3 className='room-name'>{ad.roomNumber}</h3>
                    </div>

                    <div className="overlay">
                      <Grid container justifyContent="center" alignItems="center">
                        {/* <IconButton onClick={() => addToFav(room._id)}>
                          <FavoriteIcon style={{ color: favStatus[room._id] ? '#f50057' : 'white' }} />
                        </IconButton> */}

                        {/* <Link
                          to={`/user/home/room-details/${room._id}`}
                          style={{ textDecoration: 'none' }}> */}
                        {/* <IconButton
                          onClick={() => navigateToDetails(room._id)}>
                            <VisibilityIcon style={{ color: '#4dabf5' }} />
                          </IconButton> */}
                        {/* </Link> */}
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

export default AdsDisplay