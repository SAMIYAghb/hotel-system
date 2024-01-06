import { Button, CircularProgress, Grid, Input, Paper, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Styles from "./AddNewRoom.module.scss"
import DragDropFileUpload from '../../../../shared/DragDropFileUpload/DragDropFileUpload'
// import CustomButton from './../../../UI/CustomButton/CustomButton';
import axios from 'axios'
import { addroomsUrl } from '../../../../services/api'
import { AuthContext } from '../../../../context/AuthContext'

const AddNewRoom = () => {
  const { requestHeaders } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleFileUpload = (file) => {
  //   console.log(file);
  // };
  const [isLoading, setIsLoading] = useState(false);
  type FormValues = {
    roomNumber: string;
    price: number;
    capacity: string;
    discount: number;
    facilities: string

  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const goBack = () => {
    navigate(-1);
  }

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // setIsLoading(true)
    axios
      .post(`${addroomsUrl}`, data,
        { headers: requestHeaders })
      .then((response) => {
        // setIsLoading(false)

        navigate("/home/rooms");
      })
      .catch((error) => {
        // setIsLoading(false)

      })
      .finally(() => setIsLoading(false));

  }

  return (
    <>
      <Container component="main" className={`${Styles.wrapper}`} sx={{ width: '100%', padding: 0 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} mb={8} mt={4} sx={{ padding: '2rem' }}>
            <Box
              sx={{
                my: 4,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: '100%',
                  maxWidth: 'none',
                  mx: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                {/* First TextField */}
                <TextField
                  {...register('roomNumber', { required: true })}
                  required
                  id="filled-required"
                  label="Room Number"
                  fullWidth
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                />
                {errors.roomNumber && errors.roomNumber.type === 'required' && (
                  <span className="errorMsg">Room Number is required</span>
                )}


                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register('price',
                        {
                          required: true
                          , valueAsNumber: true,
                        })}
                      required
                      id="filled-required"
                      label="Price"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: '100%',
                        marginBottom: '1rem',
                      }}
                    />
                    {errors.price && errors.price.type === 'required' && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register('capacity', { required: true })}
                      required
                      id="filled-required"
                      label="Capacity"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: '100%',
                        marginBottom: '1rem',
                      }}
                    />
                    {errors.capacity && errors.capacity.type === 'required' && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>
                </Grid>
                {/* Second and Third Text Fields in the Same Row */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register('discount',
                        {
                          required: true,
                          valueAsNumber: true,
                        })}
                      required
                      id="discount"
                      label="Discount"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: '100%',
                        marginBottom: '1rem',
                      }}
                    />
                    {errors.discount && errors.discount.type === 'required' && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register('facilities', { required: true })}
                      required
                      id="facilities"
                      label="Facilities"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: '100%',
                        marginBottom: '1rem',
                      }}
                    />
                    {errors.facilities && errors.facilities.type === 'required' && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>
                </Grid>
                {/* <div style={{ padding: 50 }}>
                  <DragDropFileUpload onFileUpload={handleFileUpload} />
                </div> */}

                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <Button
                      onClick={goBack}
                      variant="outlined"
                    >
                      Cancel
                    </Button>

                  </Grid>

                  <Grid item xs={6}>

                    <Button
                      variant="contained"

                    >
                      Add
                    </Button>
                    {/* <Button
                      // variant="contained"
                      color="orange"
                      className={`my-3 px-4 ${isLoading ? "disabled" : ""}`}
                      disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress size={20} thickness={5} /> : "Save"}
                    </Button> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>

  )
}

export default AddNewRoom