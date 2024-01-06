import { Button, Grid, Paper, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Styles from "./AddNewRoom.module.scss";
import { InputLabel, MenuItem, Select } from "@mui/material";
// import CustomButton from './../../../UI/CustomButton/CustomButton';
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { addroomsUrl } from "../../../../services/api";
import { IAddRoom } from "../../../../interface/RoomInterface";
import { faciRoomsUrl } from "./../../../../services/api";

const AddNewRoom: React.FC = () => {
  const { requestHeaders } = useContext(AuthContext);
  // console.log(addroomsUrl);
  const navigate = useNavigate();

  // const handleFileUpload = (file) => {
  //   console.log(file);
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [facilities, setFacilities] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddRoom>();

  const appendToFormData = (data: IAddRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data["roomNumber"]);
    formData.append("price", data["price"]);
    formData.append("capacity", data["capacity"]);
    formData.append("discount", data["discount"]);
    formData.append("facilities", data["facilities"][0]);
    // formData.append("imgs", data["imgs"][0]);
    return formData;
  };

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit: SubmitHandler<IAddRoom> = async (data: IAddRoom) => {
    // setIsLoading(true)
    const addFormData = appendToFormData(data);
    axios
      .post(`${addroomsUrl}`, addFormData, { headers: requestHeaders })
      .then((response) => {
        // setIsLoading(false)
        console.log("success");
        navigate("/home/rooms");
      })
      .catch((error) => {
        // setIsLoading(false)
        console.log("error");
      })
      .finally(() => setIsLoading(false));
  };

  /**********get facility*******/
  const getAllFacility = () => {
    axios
      .get(`${faciRoomsUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setFacilities(response?.data?.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllFacility();
  }, []);

  return (
    <>
      <Container
        component="main"
        className={`${Styles.wrapper}`}
        sx={{ width: "100%", padding: 0 }}
      >
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            mb={8}
            mt={4}
            sx={{ padding: "2rem" }}
          >
            <Box
              sx={{
                my: 4,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: "100%",
                  maxWidth: "none",
                  mx: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                {/* First TextField */}
                <TextField
                  {...register("roomNumber", { required: true })}
                  required
                  id="filled-required"
                  label="Room Number"
                  fullWidth
                  sx={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="errorMsg">Le prix est requis</span>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      required
                      id="filled-required"
                      label="Price"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.price && errors.price.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register("capacity", { required: true })}
                      required
                      id="filled-required"
                      label="Capacity"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.capacity && errors.capacity.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>
                </Grid>
                {/* Second and Third Text Fields in the Same Row */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("discount", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      required
                      id="discount"
                      label="Discount"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.discount && errors.discount.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <InputLabel id="simple-dropdown-label">
                      facilities
                    </InputLabel>
                    <Select
                    {...register("facilities", { required: true })}
                      labelId="simple-dropdown-label"
                      id="simple-dropdown"
                      // value={selectedOption}
                      // onChange={handleChange}
                    >
                      <MenuItem value="">facilities</MenuItem>
                     {/* {facilities?.map((facility)=>(
                      
                      <MenuItem {facility._id} value={facility._id}>{facility.name}</MenuItem>
                      
                     ))}                     */}
                    </Select>
                    
                      {errors.facilities && errors.facilities.type === "required" && (
    <span className="errorMsg">Facilities are required</span>
  )}
                  </Grid>
                </Grid>
                {/* <div style={{ padding: 50 }}>
                  <DragDropFileUpload onFileUpload={handleFileUpload} />
                </div> */}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button onClick={goBack} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button variant="contained" type="submit">
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
  );
};

export default AddNewRoom;
