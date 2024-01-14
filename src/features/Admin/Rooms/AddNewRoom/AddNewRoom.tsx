import { Button, Checkbox, Divider, FormControl, Grid, ListItemText, Paper, Select, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Styles from "./AddNewRoom.module.scss";
import { InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { addroomsUrl } from "../../../../services/api";
import { IAddRoom } from "../../../../interface/RoomInterface";
import DragDropFileUpload from "../../../../shared/DragDropFileUpload/DragDropFileUpload";
import useFacilities from "../../../Hook/useFacilities";
import { toast } from 'react-toastify';
const AddNewRoom: React.FC = () => {
  const { requestHeaders } = useContext(AuthContext);

  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { facilitiesList } = useFacilities();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },

  } = useForm<IAddRoom>();

  // Format Data
  const appendToFormData = (data: IAddRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);

    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }


    // formData.append("imgs", data["imgs"][0]);
    return formData;
  };
// **** Cancel Button*******
  const goBack = () => {
    navigate(-1);
  };
  // *******Create New Room**********
  const onSubmit: SubmitHandler<IAddRoom> = async (data: IAddRoom) => {
    // setIsLoading(true)
    const addFormData = appendToFormData(data);
    axios
      .post(`${addroomsUrl}`, addFormData, { headers: requestHeaders })
      .then((response) => {
        // setIsLoading(false)

        navigate("/home/rooms");
        toast.success("Room Add Successfully");
      })
      .catch((error) => {
        // setIsLoading(false)
        toast.error(error.response.data.message)

      })
      .finally(() => setIsLoading(false));
  };

// ***** Handle File Upload
  const handleFileUpload = (file) => {
    setSelectedImage(URL.createObjectURL(file));
  };


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
                {errors.roomNumber && errors.roomNumber.type === "required" && (
                  <span className="errorMsg">This field is required</span>
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
                      // variant="filled"
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
                      // variant="filled"
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
                      // variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%", // Add this line
                        paddingTop: '5px'
                      }}
                    />
                    {errors.discount && errors.discount.type === "required" && (
                      <span className="errorMsg">This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl sx={{ padding: "5px", minWidth: 120, width: '98%' }}>
                      <InputLabel id="facilities-label">Facilities</InputLabel>


                      <Select
                        labelId="facilities-label"
                        id="facilities"
                        label="facilities"
                        multiple
                        value={watch('facilities') || []}
                        onChange={(e) => setValue('facilities', e.target.value, { shouldValidate: true })}
                        sx={{ width: '100%' }}
                        renderValue={(selected) => (
                          <div>
                            {selected.map((value) => (
                              <span key={value} style={{ marginRight: '8px' }}>
                                {facilitiesList.find((facility) => facility._id === value)?.name || ''}
                              </span>
                            ))}
                          </div>
                        )}

                      >
                        {facilitiesList.map((facility) => (
                          <MenuItem key={facility._id} value={facility._id}>
                            <Checkbox checked={watch('facilities')?.includes(facility._id)} />
                            <ListItemText primary={facility.name} />
                          </MenuItem>
                        ))}
                      </Select>

                    </FormControl>
                    {errors.facilities && errors.facilities.type === "required" && (
                      <span className="errorMsg">Facilities are required</span>
                    )}
                  </Grid>
                </Grid>

                <div style={{ padding: 50 }}>
                  <DragDropFileUpload onFileUpload={handleFileUpload} />
                  {selectedImage && (
                    <div style={{ marginTop: '20px' }}>
                      <img src={selectedImage} alt="Selected"
                        style={{ maxWidth: '80%', maxHeight: '100px' }} />
                    </div>
                  )}
                </div>



                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-end",
                    marginTop: "1rem", // Adjust the top margin as needed
                  }}
                >
                  <Grid item>
                    <Button onClick={goBack} variant="outlined">
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" type="submit">
                      Add
                    </Button>
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
