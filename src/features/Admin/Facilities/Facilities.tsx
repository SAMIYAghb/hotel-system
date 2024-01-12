import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { facilitiesUrl } from "../../../services/api";
import CustomTable from "../../UI/CustomTable/CustomTable";
import Button from "@mui/material/Button";
import CustomDialog from "./../../UI/CustomDialog/CustomDialog";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box , Grid} from "@mui/material";


const Facilities = () => {
  const [dialogAction, setDialogAction] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { requestHeaders } = useContext(AuthContext);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const facilityColumns = [
    { label: "Facility", key: "name" },
    // { label: "Image", key: "image" },
    { label: "Created By", key: "createdBy.userName" },
    { label: "Created At", key: "createdAt" },
    { label: "Updated At", key: "updatedAt" },
  ];

  // const handleOpenDialog = () => {
  //   setDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  // };

  // const showViewModal = (itemId) => {
  //   handleOpenDialog(itemId);
  //   handleOpenDialog();
  // };
  interface IFacility {
    name: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFacility>();

  //********** Generic function to open dialog based on action
  const handleOpenDialog = (action, item = null) => {
    setDialogAction(action);
    setSelectedItem(item);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  

  // ************Add Facility
  const onSubmit: SubmitHandler<IFacility> = async (data: IFacility) => {
    // console.log(data);
    console.log("Valeur de name avant envoi:", data.name);

    await axios
      .post(`${facilitiesUrl}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("succ response", response);
        handleCloseDialog();
        getAllFacilities();
        console.log(facilitiesList);
      })
      .catch((error) => {
        console.log(error);
        // getToastValue("error", error.response?.data.message || "An error occurred");
      });
  };

  //   const dynamicContent = (
  //     <CustomDialog
  //       open={dialogOpen}
  //       handleClose={handleCloseDialog}
  //       title={"Add Facility"}
  //       buttonText={"Save"}
  //       onSubmit={handleSubmit(onSubmit)}
  //       content={
  //         <>
  //         <TextField
  //           {...register("name", {
  //             required: true,
  //           })}
  //           margin="normal"
  //           fullWidth
  //           id="name"
  //           label="name"
  //           name="name"
  //           autoComplete="name"
  //           autoFocus
  //         />
  //         {errors.name && errors.name.type === "required" && (
  //           <span className="errorMsg">Name is required</span>
  //         )}
  //         </>
  //       }
  //     />
  //   );

  //************* */ Get All Facilities
  const getAllFacilities = async () => {
    await axios
      .get(`${facilitiesUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setFacilitiesList(response?.data?.data?.facilities);
        console.log(response?.data?.data?.facilities);
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
        <div>
          <Button variant="contained" onClick={() =>handleOpenDialog("add")}>
            Add new facility
          </Button>
          <CustomDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            title={"Add Facility"}
            buttonText={"Save"}
            onSubmit={handleSubmit(onSubmit)}
            content={
              <>
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
              </>
            }
          />
        </div>
        {/* Add new facility */}

        {/* show facility details*/}
        <div>
          <CustomDialog
            open={dialogOpen}
            handleClose={handleCloseDialog}
            title={"Add Facility"}
            buttonText={"Close"}
            onSubmit={handleSubmit(onSubmit)}
            content={
              <>
                <p>facility details</p>
              </>
            }
          />
        </div>
        {/* show facility details*/}
        {/* CustomTable */}
        <CustomTable
          data={facilitiesList}
          // data={roomsList}
          // onView={showViewModal}
          onView={() => handleOpenDialog("view")}
          // onUpdate={() => handleOpenDialog("edit")}
          // onDelete={() => handleOpenDialog("delete")}
          // onUpdate={showUpdateModal}
          // onDelete={showDeleteModal}
          // isLoading={isLoading}
          modelName="Facility"
          // modelName="Room"
          //   columns={roomColumns}

          columns={facilityColumns || []}
        />
      </div>
    </>
  );
};

export default Facilities;
