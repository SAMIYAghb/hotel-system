import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { facilitiesRoomsUrl } from "../../../services/api";
import CustomTable from "../../UI/CustomTable/CustomTable";
import styleFacilities from "./Facilities.module.scss";

import {
  AppBar,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import noData from '../../../assets/images/noData.png';
import CustomButton from "./../../UI/CustomButton/CustomButton";
import CustomModal from "./../../UI/CustomModal/CustomModal";

const Facilities = () => {
  const { requestHeaders } = useContext(AuthContext);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const facilityColumns = [
    { label: "Facility", key: "name" },
    // { label: "Image", key: "image" },
    { label: "Created By", key: "createdBy.userName" },
    { label: "Created At", key: "createdAt" },
    { label: "Updated At", key: "updatedAt" },
  ];
  const [facilityId, setFacilityId] = useState(0);
  const [facilityDetails, setFacilityDetails] = useState([]);
  // Modal
  const [modalState, setModalState] = useState("close");
  const handleClose = () => setModalState("close");

  // Add_Modal
  const showAddModal = () => {
    // setFacilityId(facilityId);
    setModalState("add-modal");
  };
  // view-Modal
  const showViewModal = (id) => {
    // console.log(id);
    setFacilityId(id);
    setModalState("view-modal");
    getFacilityDetails(id);
  };
  // Update-Modal
  const showUpdateModal = (facility) => {
    setFacilityId(facility._id);
    setValue("name", facility.name);

    setModalState("update-modal");
  };
  // Delete_Modal
  const showDeleteModal = (facilityId) => {
    setFacilityId(facilityId);
    setModalState("delete-modal");
  };

  interface IFacility {
    name: string;
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFacility>();

  // ************Add Facility
  const onSubmit: SubmitHandler<IFacility> = async (data: IFacility) => {
    // console.log(data);
    console.log("Valeur de name avant envoi:", data.name);

    await axios
      .post(`${facilitiesRoomsUrl}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("succ response", response);
        handleClose();
        getAllFacilities();
        console.log(facilitiesList);
      })
      .catch((error) => {
        console.log(error);
        // getToastValue("error", error.response?.data.message || "An error occurred");
      });
  };

  // ************facility Details****************
  const getFacilityDetails = async(facilityId) => {
    await axios
      .get(`${facilitiesRoomsUrl}/${facilityId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setFacilityDetails(response?.data?.data?.facility);
        // console.log(response?.data?.data?.facility);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //**************** */ update  Facility
  const updateFacility = async(data) => {
    // const upfdateFormData = appendToFormData(data);
    // console.log(data);
    await axios
      .put(`${facilitiesRoomsUrl}/${facilityId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        // console.log(response);
        handleClose();

        // Fetch updated data after the update
        getAllFacilities();
        // getAllRooms(currentPage);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //********** Deleted Facilities****************
  const deleteFacility = async() => {
    await axios
      .delete(`${facilitiesRoomsUrl}/${facilityId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        // setRoomsList(response.data.data.totalCount);
        // setRoomId(roomId);
        handleClose();
        getAllFacilities();
        // getAllRooms(currentPage);
      })
      .catch((error) => {

      });
  };

  //************* */ Get All Facilities
  const getAllFacilities = async () => {
    await axios
      .get(`${facilitiesRoomsUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setFacilitiesList(response?.data?.data?.facilities);
        // console.log(response?.data?.data?.facilities);
      })
      .catch((error) => {
        console.log("Error fetching facilities:", error);
      });
  };

  

  useEffect(() => {
    getAllFacilities();
  }, []);

  return (
    <>
      <div>
        {/* Add new facility */}
        <AppBar position="static">
          <div className={styleFacilities.header}>
            <Typography variant="h6">
              facility Table Details
              <p variant="h6">You can check all details</p>
            </Typography>
              <CustomButton
                className="your-custom-class"
                type="submit"
                style={{ width: '200px' }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={showAddModal}
              >
                Add new facility
              </CustomButton>
          </div>
        </AppBar>
        <div style={{ marginTop: "40px" }}></div>
        
        {/* Add Modal */}
        <CustomModal
          open={modalState === "add-modal"}
          onClose={handleClose}
          title="Add facility"
        >
          <div>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <TextField
                  {...register("name", {
                    required: true,
                  })}
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="errorMsg">Name is required</span>
                )}
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      right: "20px",
                    }}
                  >
                    Add facility
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CustomModal>
        {/*end Add Modal */}
        {/* View Modal */}
        <CustomModal
          open={modalState === "view-modal"}
          onClose={handleClose}
          title="Facility details"
        >
          {/* View modal content goes here */}
          <div>
            <div style={{ textAlign: "center" }}>
              <p>
                <span className="text-warning">Facility name :&nbsp;</span>
                {facilityDetails?.name}
              </p>
              <p>
                <span className="text-warning">Created by :&nbsp;</span>
                {facilityDetails?.createdBy || "admin"}
              </p>
              <p>
                <span className="text-warning">Created at :&nbsp;</span>
                {facilityDetails?.createdAt}
              </p>
              <p>
                <span className="text-warning">Updated at :&nbsp;</span>
                {facilityDetails?.updatedAt}
              </p>
            </div>

            <Grid item xs={6}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleClose}
                style={{ position: "absolute", bottom: "30px", right: "20px" }}
              >
                Ok
              </Button>
            </Grid>
          </div>
        </CustomModal>
        {/*end View Modal */}
        {/* Update Modal */}
        <CustomModal
          open={modalState === "update-modal"}
          onClose={handleClose}
          title="Update facility"
        >
          <div>
            <form onSubmit={handleSubmit(updateFacility)}>
              <Grid container spacing={2}>
                <TextField
                  {...register("name", {
                    required: true,
                  })}
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="errorMsg">Name is required</span>
                )}
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      position: "absolute",
                      bottom: "30px",
                      right: "20px",
                    }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </CustomModal>
        {/*end  Update Modal */}
        {/* Delete Modal */}
      <CustomModal
        open={modalState === "delete-modal"}
        onClose={handleClose}
        title="Delete this facility?"

      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <img src={noData} alt="Delete" style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }} />
        </div>
        <p>Are you sure you want to delete this facility ? </p>
        <div >
          <Grid item xs={6}>
            <Button variant="contained" type="submit"
              onClick={deleteFacility}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Delete
            </Button>
          </Grid>
        </div>

      </CustomModal>
        {/*end delete Modal */}


        {/* CustomTable */}
        <CustomTable
          data={facilitiesList}
          onView={showViewModal}
          onUpdate={showUpdateModal}
          onDelete={showDeleteModal}
          // isLoading={isLoading}
          modelName="Facility"
          columns={facilityColumns || []}
        />
      </div>
    </>
  );
};

export default Facilities;
