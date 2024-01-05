import React, { useState } from 'react'
import { resetPassUrl } from '../../services/api'
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import styles from "./ResetPass.module.scss"
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/resetPass.png"
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ResetPass: React.FC = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    seed: string

  };

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    axios
      .post(`${resetPassUrl}`, data)
      .then((response) => {
        console.log("succ response", response);
        console.log(data);
        navigate("/login");
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

    <Container className={`${styles.wrapper}`} component="main">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          mb={8}
          mt={4}
          sx={{
            width: "100%", // Full width on small screens
            [theme.breakpoints.up("md")]: {
              width: "50%", // Half width on medium and larger screens
            },
          }}
        >
          <Paper elevation={0} sx={{ mx: 4, mt: 4 }}>
            <img src={logo} />
          </Paper>
          {/* *******container of left side******* */}
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h4">
              Reset Password
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you already have an account register
              <br />
              You can
              <Link to="/login" className={`${styles.reset}`}> Login here !</Link>
            </Typography>
            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
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

              <TextField
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="errorMsg">Password is required</span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="errorMsg">password is invalid</span>
              )}
              <TextField
                {...register("confirmPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  // validate: (value) =>
                  //   getValues("password") === value || "Password don't match",
                })}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                <span className="errorMsg">Password is required</span>
              )}
              {errors.confirmPassword && errors.confirmPassword.type === "pattern" && (
                <span className="errorMsg">password is invalid</span>
              )}
              <TextField
                {...register("seed", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  // validate: (value) =>
                  //   getValues("password") === value || "Password don't match",
                })}
                margin="normal"
                required
                fullWidth
                name="seed"
                label="Seed"
                type="text"
                id="seed"
              // autoComplete="seed"
              />
              {errors.seed && errors.seed.type === "required" && (
                <span className="errorMsg">Password is required</span>
              )}
              {errors.seed && errors.seed.type === "pattern" && (
                <span className="errorMsg">password is invalid</span>
              )}


              <Button
                className={`${styles.resetBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            </Box>
            {/* //end form inputs */}
          </Box>
        </Grid>

        {/* right side img  */}
        <Grid
          item

          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          mb={8}
          mt={4}
          sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper elevation={0} sx={{ mx: 4, mt: 4 }}>
            <div style={{ position: 'relative' }}>

              <img className={`${styles.resetImg}`} src={img} />
              <Typography
                variant="h4"
                sx={{
                  position: 'absolute',
                  bottom: 100, // Align the text to the bottom
                  left: '40%',
                  transform: 'translateX(-50%)',
                  color: 'white', // Text color
                  zIndex: 1, // Place text above the image
                }}
              >
                Reset Password
                <h6>Homes as unique as you.</h6>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ResetPass