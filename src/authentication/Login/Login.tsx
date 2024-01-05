import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/login.png";
import Styles from "./Login.module.scss";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext.tsx";
import { loginUrl } from "../../services/api.tsx";

const Login: React.FC = () => {
  let { saveUserData } = useContext(AuthContext);
  // let {getToastValue} = useContext(ToastContext);
  const navigate = useNavigate();
  type FormValues = {
    email: string;
    password: string;

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    await axios
      .post(`${loginUrl}`, data)
      .then((response) => {
        console.log("succ response", response);
        localStorage.setItem("userToken", response.data.token);
        navigate('/home');
        saveUserData();

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
              Sign in
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you don’t have an account register
              <br />
              You can
              <Link className={`${Styles.register}`}> Register here !</Link>
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
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && errors.password.type === "required" && (
                <span className="errorMsg">Password is required</span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="errorMsg">password is invalid</span>
              )}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>

              <Button
                className={`${Styles.loginBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
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
export default Login;
