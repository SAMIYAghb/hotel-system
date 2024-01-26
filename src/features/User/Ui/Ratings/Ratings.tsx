import {Typography,  Button } from '@mui/material'
import { Container, Box} from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import RateComponent from '../../../Shared/RateComponent/RateComponent'
import { allReviewsUrl, createReviewsUrl } from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from './Ratings.module.scss'
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';


function Ratings({ roomId }) {
    const { requestHeaders } = useContext(AuthContext);
    // const { userId } = useContext(AuthContext);
    const [userRating, setUserRating] = useState(0); // State to store the user's rating
    const [reviewText, setReviewText] = useState('');
    const { register, handleSubmit, setValue, reset } = useForm();
    const [reviewsList, setReviewsList] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const handleRatingChange = (rating) => {
        setUserRating(rating);
    };
    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    const toggleReviews = () => {
        setShowReviews((prev) => !prev);
    }

    const createReview = async (data) => {
        try {
            await axios.post(
                createReviewsUrl,
                {
                    roomId: roomId,
                    rating: userRating,
                    review: data.review,
                },
                {
                    headers: requestHeaders,
                }
            );

            toast.success("Review created successfully");
            reset();
            getAllReviews();
        } catch (error) {
            console.error("Error creating review:", error);
            toast.error(error.response.data.message);
        }
    };

    const getAllReviews = () => {
        axios.get(`${allReviewsUrl}${roomId}`,
            {
                headers: requestHeaders
            })
            .then((response) => {
                // console.log("Comment created successfully:", response.data);
                setReviewsList(response?.data?.data?.roomReviews)
                console.log(response?.data?.data?.roomReviews);


            })
            .catch((error) => {
                console.error("Error creating comment:", error);

            })
    }

    useEffect(() => {
        getAllReviews();
    }, []);


    return (
        <>

            <Box sx={{ pl: "2rem", mt: "1rem" }}>
                <Typography variant="h5" sx={{ pt: "1.5rem", pb: "1.5rem" }}>Rate</Typography>
                <RateComponent onChange={handleRatingChange} />
                <form onSubmit={handleSubmit(createReview)}>
                    <textarea
                        {...register('review', { required: true })}
                        className={style.messageField}
                        id="outlined-multiline-static"
                        placeholder='Wite Your Rate Message Here...'
                        rows={6}
                        defaultValue="Add rate"
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
                    >
                        Rate
                    </Button>
                    {/* Button to toggle comments visibility */}
                    <div style={{ marginTop: '1rem' }}>
                        <Button variant="contained" onClick={toggleReviews}>
                            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                        </Button>
                    </div>
                </form>
            </Box>
            {console.log('reviewsList:', reviewsList)}
            {showReviews && reviewsList && reviewsList.length > 0 && (
                <Container>
                    <Box sx={{ pt: "1.5rem", pb: "4rem" }}>
                        {/* Filter comments for the current user */}
                        {reviewsList
                            // .filter((review) => review.user?._id === userId)
                            .map((review) => (
                                <div key={review._id} className={style.commentContainer}>
                                    {/* Render UI for each comment */}
                                    <div className={style.commentContent}>
                                        <p>{review.user?.userName}: {review.review}</p>                                    </div>

                                    <div className={style.commentActions}>
                                        <Button>
                                            <EditIcon />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </Box>
                </Container>
            )}

        </>
    )
}

export default Ratings