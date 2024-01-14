import React from 'react'
import { forgetPassUrl } from '../../services/api'
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import styles from "./ForgetPass.module.scss"
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/resetPass.png"

const ForgetPass = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  type FormValues = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    axios
      .post(`${forgetPassUrl}`, data)
      .then((response) => {
        console.log("succ response", response);
        console.log(data);
        navigate("/reset-password");
        // getToastValue(
        //   "success",
        //   response?.data?.message || "password reset successfully"
        // );
      })
      .catch((error) => {
        console.log(error);

        // getToastValue(
        //   "error",
        //   error?.response?.data?.message ||
        //     "An error occurred. Please try again."
        // );
      });
  };


  return (
    <Grid container component="main" className={styles.main}>
      <Grid item xs={12} sm={12} md={6} className={styles.formContainer}>
        <Paper elevation={0} className={styles.paper}>
          <Paper elevation={0} sx={{ mx: 4, pt: 1, mb: 2 }}>
            <img src={logo} />
          </Paper>
          {/* *******container of left side******* */}
          <Box
            sx={{
              // my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              // mt: 3, maxWidth: '400px', margin: 'auto'
            }}
          >
            <Typography component="h2" variant="h5">
            Forgot password
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
            If you already have an account register
              <br />
              You can
              <Link to="/login" className={`${styles.forgetpass}`}> Login here !</Link>
            </Typography>
            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TextField
                {...register("email", {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email && errors.email.type === "required" && (
                <span className="errorMsg">Email is required</span>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <span className="errorMsg">Email is invalid</span>
              )}



              <Grid container>
                <Grid item xs sx={{ mb: 5, pb: 5, pt: 2 }}>
                  <Link to="/forget-password">Forgot password?</Link>
                </Grid>
              </Grid>

              <Button
                className={`${styles.loginBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 5, mb: 2, py: 1 }}
              >
                Send Mail
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={styles.imageContainer}>
        <img src={img} alt="Login Image" className={styles.image} />
        <Typography variant="h4" className={styles.imageText}>
        Forgot password
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ForgetPass