import React, { useContext, useEffect, useState } from 'react'
import StartBooking from '../StartBooking/StartBooking'
import axios from 'axios';
import { commentUrl, createReviewsUrl, userRoomsDetailsUrl } from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { Container, Stack, styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import imgO from '../../../../assets/images/Hotel.jpg'
import { Divider, TextField, Typography, Button, Rating } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import style from './RoomDetails.module.scss'
import Box from '@mui/material/Box';
import Review from '../Review/Review';
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';
import RateComponent from './../../../Shared/RateComponent/RateComponent';
import { useForm } from 'react-hook-form';
import Comments from '../Comments/Comments';
import CustomModal from '../../../Shared/CustomModal/CustomModal';
import Ratings from '../Ratings/Ratings';

const RoomDetails = () => {
  const [roomDetails, setRoomDetails] = useState([]);
  const { requestHeaders } = useContext(AuthContext);
  const { roomId } = useParams();
  const { userId } = useContext(AuthContext);

  interface IRoomDetials {
    comment: string,
    roomId: string
  }
  const {
    register,
    handleSubmit,
    setValue,
    // getValues,
    formState: { errors },
  } = useForm<IRoomDetials>();

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


  // craete rate and review

  const [userRating, setUserRating] = useState(0); // State to store the user's rating
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };


  const createReview = (roomId, rating, review) => {
    axios.post(`${createReviewsUrl}`,

      {
        roomId: roomId,
        rating: rating,
        review: review,
      },
      {
        headers: requestHeaders
      })
      .then((response) => {
        console.log("Review created successfully:", response.data);
        toast.success("Review created successfully");

      })
      .catch((error) => {
        console.error("Error creating review:", error);
        toast.error(error.response.data.message);

      })
  }
  // *************************************
  const [commentsList, setCommentsList] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const getAllComments = () => {
    axios.get(`${commentUrl}/${roomId}`,
      {
        headers: requestHeaders
      })
      .then((response) => {
        // console.log("Comment created successfully:", response.data);
        setCommentsList(response?.data?.data?.roomComments)
        console.log(response?.data?.data?.roomComments);


      })
      .catch((error) => {
        console.error("Error creating comment:", error);

      })
  }

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  }
  // ----------------------------
  const [modalState, setModalState] = React.useState("close");
  const [commentId, setCommentId] = useState('');

  const handleClose = () => {
    setModalState("close")
  };
  const showUpdateModal = (comment) => {
    console.log("Comment object:", comment);

    setCommentId(comment);
    console.log(comment);

    setValue('comment', comment?.comment);
    setModalState("update-modal");
  };
  const updateComment = (data) => {
    console.log('Comment ID:', commentId);
    axios.patch(
      `${commentUrl}/${commentId}`,
      {
        headers: requestHeaders,
        data: { commentId },
      })
      .then((response) => {
        toast.success("Comment Update Successfully");
        getAllComments();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  // ------------------------------------------------

    //delete comment
    const deleteComment = (commentId) => {
      axios.patch(`${commentUrl}/${commentId}`,
          {
              roomId: commentId,

          },
          {
              headers: requestHeaders
          })
          .then((response) => {
              setCommentsList(response?.data?.data?.roomComments)
              toast.success("Comment Delete Successfully")
              getAllComments();
          })
          .catch((error) => {
              toast.error(error.response.data.message)
          })

  }

  // *************************************
  useEffect(() => {
    console.log("roomId:", roomId);
    displayRoomsDetails();
    getAllComments()
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
                width: '100%', height: '100%', objectFit: 'cover',paddingLeft:'20px'

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

      {/* -------------------- */}
      <Container>

        <Box sx={{ pt: "1.5rem", pb: "4rem" }}>
          <Stack
            sx={{ display: 'flex', justifyContent: "center" }}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}>


            <Ratings roomId={roomId} />



            <Comments
              roomId={roomId}
            />



          </Stack>
        </Box>
      </Container>

      {/* -------------------- */}

      {/* Button to toggle comments */}
      <Button variant="contained" onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>

      {/* Comments section for the current user */}
      {showComments && commentsList.length > 0 &&
        <Container>
          <Box sx={{ pt: "1.5rem", pb: "4rem" }}>
            {/* Filter comments for the current user */}
            {commentsList
              .filter((comment) => comment.user._id === userId)
              .map((comment) => (
                <div key={comment._id}>
                  {/* Render UI for each comment */}
                  <p>{comment.user.userName}: {comment.comment}</p>
                  <span
                    style={{ marginLeft: '10px', cursor: 'pointer', color: 'yellow' }}
                    onClick={() => showUpdateModal(comment._id, comment.comment)}
                  >
                    edit
                  </span>

                  {/* Delete Comment Icon */}
                  <span
                    style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                  onClick={() => deleteComment(comment._id)}
                  >
                    delete
                  </span>
                </div>
              ))}
          </Box>
        </Container>
      }
      {/* Update Modal */}
      <CustomModal
        open={modalState === "update-modal"}
        onClose={handleClose}
        title="Update Comment"
      >
        <div>
          <form onSubmit={handleSubmit((data) => updateComment(commentId, data.comment))}>
            <TextField
              {...register('comment', { required: true })}
              className={style.messageField}
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" type="submit" style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </CustomModal>

      {/* <Review/> */}
      <Footer />
    </>
  )
}

export default RoomDetails