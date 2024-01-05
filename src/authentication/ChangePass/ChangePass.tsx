import * as React from "react";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/login.png";
import Styles from "./ChangePass.module.scss";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext.tsx";
import { changePassUrl } from "../../services/api.tsx";
import CustomButton from './../../features/UI/CustomButton/CustomButton';
import { IChangePass } from './../../interface/AuthInterface';

const ChangePass: React.FC = () => {
  const { saveUserData , requestHeaders} = useContext(AuthContext);
  // let {getToastValue} = useContext(ToastContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePass>();

  const onSubmit: SubmitHandler<IChangePass> = async (data) => {
    // console.log(data);
    await axios
      .post(`${changePassUrl}`, data,{
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("succ response", response);
        navigate('/home');
     

        // getToastValue("success", "Login successfully!")
      })
      .catch((error) => {
        console.log(error);
        // getToastValue("error", error.response?.data.message || "An error occurred");
      });
  };

  return (
    <Container className={`${Styles.wrapper}`} component="main">
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
              Change password
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
            Change password
            </Typography>
            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("oldPassword", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="oldPassword"
                name="oldPassword"
                type="password"
                autoComplete="oldPassword"
                autoFocus
              />
              {errors.oldPassword && errors.oldPassword.type === "required" && (
                <span className="errorMsg">oldPassword is required</span>
              )}

              {errors.oldPassword && errors.oldPassword.type === "pattern" && (
                <span className="errorMsg">oldPassword is invalid</span>
              )}

              <TextField
                {...register("newPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="newPassword"
                type="password"
                id="newPassword"
                autoComplete="newPassword"
              />
              {errors.newPassword && errors.newPassword.type === "required" && (
                <span className="errorMsg">newPassword is required</span>
              )}
              {errors.newPassword && errors.newPassword.type === "pattern" && (
                <span className="errorMsg">newPassword is invalid</span>
              )}
              <TextField
                {...register("confirmPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
              />
              {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                <span className="errorMsg">confirmPassword is required</span>
              )}
              {errors.confirmPassword && errors.confirmPassword.type === "pattern" && (
                <span className="errorMsg">confirmPassword is invalid</span>
              )}

              <Grid container>
                <Grid item xs>
                  <Link to="/forget-password">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>

              <CustomButton
                className="your-custom-class"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </CustomButton>
            </Box>
            {/* //end form inputs */}
          </Box>
        </Grid>

        <Grid
          item

          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          mb={8}
          mt={4}
        >
          <img className={`${Styles.loginImg}`} src={img} />

        </Grid>
      </Grid>
    </Container>
    
  );
};
export default ChangePass;
