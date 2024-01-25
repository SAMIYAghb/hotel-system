import React, { useContext, useState } from 'react'
import { commentUrl } from '../../../../services/api';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { Typography, Divider, TextField, Button, Grid } from '@mui/material';
import { Container, Box, Stack } from '@mui/system';
import { toast } from 'react-toastify';
import RateComponent from '../../../Shared/RateComponent/RateComponent';
import style from './Comments.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomModal from '../../../Shared/CustomModal/CustomModal';
interface IComments {
    comment: string,
    roomId: string
}

function Comments({ roomId }) {
    const [commentInput, setCommentInput] = useState("");
    const { requestHeaders } = useContext(AuthContext);
    const { register, handleSubmit, setValue, reset } = useForm();
    const [modalState, setModalState] = React.useState("close");
    const [commentId, setCommentId] = useState(0);

    const handleClose = () => {
        setModalState("close")
    };
    // Update-Modal
    const showUpdateModal = (comment) => {
        setCommentId(comment._id);
        setValue("comment", comment?.room);
        setModalState("update-modal");
    };

    // create comment
    const createComment: SubmitHandler<IComments> = (roomId: string, comment: string) => {
        axios.post(`${commentUrl}`,
            {
                roomId: roomId,
                comment: comment,
            },
            {
                headers: requestHeaders
            })
            .then((response) => {
                console.log("Comment created successfully:", response);
                setCommentInput("");
                toast.success("Comment creates Successfully");
                getAllComments();
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
                toast.error(error.response.data.message)
            })
    }
    // get all comment for user logged in
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

    //updtate comment
    const updateComment = (roomId, comment) => {
        axios.patch(`${commentUrl}/${roomId}`,
            {
                comment: comment,
            },
            {
                headers: requestHeaders
            })
            .then((response) => {
                toast.success("Comment Update Successfully")
                getAllComments();
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })

    }

    //delete comment
    const deleteComment = (roomId) => {
        axios.patch(`${commentUrl}/${roomId}`,
            {
                roomId: roomId,

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
    return (
        <>


                        <Box sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}>
                            <Typography variant="h5" sx={{ pt: "1.5rem", pb: "1.5rem" }}>Add Your Comment</Typography>
                            <Box>
                                <TextField
                                    {...register('comment', { required: true })}
                                    className={style.messageField}
                                    id="outlined-multiline-static"
                                    label="Comment"
                                    multiline
                                    rows={4}
                                    defaultValue="Set your comment"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
                                onClick={() => createComment(roomId, commentInput)}

                            >
                                send
                            </Button>
                        </Box>




        </>
    )
}


export default Comments