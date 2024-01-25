import { Divider, Typography, TextField, Button } from '@mui/material'
import { Container, Box, Stack } from '@mui/system'
import React, { useContext, useState } from 'react'
import RateComponent from '../../../Shared/RateComponent/RateComponent'
import { createReviewsUrl } from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from './Ratings.module.scss'
function Ratings({ roomId }) {
    // craete rate and review
    const { requestHeaders } = useContext(AuthContext);

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
    return (
        <>

            <div>
                <RateComponent onChange={handleRatingChange} />
            </div>
            <Box sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}>
                <Typography variant="h5" sx={{ pt: "1.5rem", pb: "1.5rem" }}>Rate</Typography>
                <Box>
                    <TextField
                        className={style.messageField}
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={4}
                        defaultValue="Add rate"
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    />
                </Box>
                <Button
                    variant="contained"
                    sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
                    onClick={() => createReview(roomId, userRating, reviewText)}

                >
                    Rate
                </Button>

            </Box>





        </>
    )
}

export default Ratings