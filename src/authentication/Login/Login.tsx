import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../../assets/images/Staycation.png";
import img from "../../assets/images/Rectangle 7.png";
import Styles from "./Login.module.scss";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext.tsx";
import { facebookAuthUrl, loginUrl, userLoginUrl } from "../../services/api.tsx";
import { toast } from "react-toastify";
import FacebookLogin from '@greatsumini/react-facebook-login';


const Login: React.FC = () => {
  const { saveUserData, userRole, } = useContext(AuthContext);
  // let {getToastValue} = useContext(ToastContext);
  const location = useLocation();
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
    const url = userRole === "admin" ? loginUrl : userLoginUrl;
    await axios
      .post(url, data)
      .then((response) => {
        localStorage.setItem("userToken", response?.data?.data?.token);
        const userRole = response?.data?.data?.user?.role;
        const userName=response?.data?.data?.user?.userName;
        console.log(userName);

        // saveUserData();
        saveUserData();

        if (userRole == "admin") {
          navigate("/admin/home");
        } else {

          // navigate("/user/home");
          const from = location.state?.from || "/user/home";
          //New Line save location when your in another page and login
          navigate(from);
        }


        toast.success("Login Successfully")

      // navigate("/user/home");

      // toast.success("Login Successfully");

      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

      
  };



  /*****facebook */
  const responseFacebook = async (response: any) => {
    // Gérez la réponse Facebook ici
    // Vous pouvez effectuer une requête API vers votre serveur avec le jeton Facebook
    try {
      const { accessToken, userID } = response;
      console.log(accessToken);
      console.log(userID);

      // Exemple de requête API
      const facebookAuthResponse = await axios.post(facebookAuthUrl , {
        accessToken,
      });

      // Gérez la réponse de votre serveur
      const { user, token } = facebookAuthResponse.data;

      // Enregistrez les données de l'utilisateur et le jeton
      localStorage.setItem("userToken", token);
      saveUserData();

      // Redirigez ou naviguez vers la page appropriée
      const from = location.state?.from || "/user/home";
      navigate(from);

      toast.success("Connexion réussie");
    } catch (error) {
      toast.error("Échec de l'authentification avec Facebook");
    }
};

  return (
    <Grid container component="main" className={Styles.main}>
      <Grid item xs={12} sm={12} md={6} className={Styles.formContainer}>
        <Paper elevation={0} className={Styles.paper}>
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
              Sign in
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you don’t have an account register
              <br />
              You can
              <Link to="/register"> Register here !</Link>
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
                <Grid item xs sx={{ mb: 5, pb: 5, pt: 2 }}>
                  <Link to="/forget-password">Forgot password?</Link>
                </Grid>
              </Grid>

              <Button
                className={`${Styles.loginBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 5, mb: 2, py: 1 }}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box> 
          <FacebookLogin
        appId="1503450150434613"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps: any) => (
          <Button
            onClick={renderProps.onClick}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1 }}
          >
            Connexion with Facebook
          </Button>
        )}
      />
      </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={Styles.imageContainer}>
        <img src={img} alt="Login Image" className={Styles.image} />
        <Typography variant="h4" className={Styles.imageText}>
          Sign in to Roamhome
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
