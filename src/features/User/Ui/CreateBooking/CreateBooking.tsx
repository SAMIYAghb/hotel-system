
import { Typography, Box, Button, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useContext, useRef, useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import styles from "./CreateBooking.module.scss";
import MyDateRangePicker from "../../../Shared/DateRangePicker/MyDateRangePicker";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import  axios  from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { createBookingUrl, userRoomsDetailsUrl } from "../../../../services/api";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const CreateBooking = () => {
    const dateRangePickerRef = useRef();
    const { roomId } = useParams();
    // console.log(roomId );
  const { requestHeaders } = useContext(AuthContext);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const navigate = useNavigate();
  
  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
    // if (dateRange) {
    //   console.log("Plage de dates sélectionnée :", dateRange);
    //   console.log("startDate sélectionnée :", dateRange.startDate);
    //   console.log("endDate sélectionnée :", dateRange.endDate);
    //   console.log("numberOfNights sélectionnée :", dateRange.numberOfNights);
    // }
  };
  // *************increase num of persons***************
  const handleIncrease = () => {
    setNumberOfPersons((prevValue) => prevValue + 1);
    updateDateRange();
  };
  // ************decrease num of persons****************
  const handleDecrease = () => {
    if (numberOfPersons > 0) {
      setNumberOfPersons((prevValue) => prevValue - 1);
      updateDateRange();
    }
  };
  // ****************************
  const updateDateRange = () => {
    const newEndDate = new Date(selectedDateRange.startDate);
    newEndDate.setDate(newEndDate.getDate() + numberOfPersons);

    setSelectedDateRange({
      startDate: selectedDateRange.startDate,
      endDate: newEndDate,
      key: "selection",
    });

  };
  /********************************************** */
  // Get All Rooms
  const [roomDetails, setRoomDetails] = useState([]);
  const displayRoomsDetails = () => {
    axios.get(`${userRoomsDetailsUrl}${roomId}`,
      {
        headers: requestHeaders
      })
      .then((response) => {
        setRoomDetails(response?.data?.data?.room)
        // console.log(response.data.data.room)


      })
      .catch((error) => {
        console.log(error);


      })

  }
  useEffect(() => {
    // console.log("roomId:", roomId);
    displayRoomsDetails();
  }, [])
  /********************************************** */
  const {
    register,
    handleSubmit,
    // setValue,
    // watch,
    formState: { errors },
  } = useForm();
  // Définissez les types manuellement si nécessaire
interface DateRange {
    startDate: string;
    endDate: string;
    // Autres propriétés...
  }
  
  interface RoomDetails {
    _id: string;
    price: number;
    // Autres propriétés...
  }
  
  interface BookingRequestBody {
    bookingStartDate: string;
    bookingEndDate: string;
    room: string;
    totalPrice: number;
  }
  const onSubmit = async (data) => {
    console.log(data);
  
    // Vérifiez si selectedDateRange est correctement défini
    if (selectedDateRange) {
      console.log("Valeur de dateRange hors de handleDateChange :",
       selectedDateRange);
  
      // Utilisez l'interface pour déclarer le type de requestBody
    //   const requestBody: BookingRequestBody = {
    //     // Ensure selectedDateRange.startDate is not null or undefined
    //     bookingStartDate: selectedDateRange.startDate ? selectedDateRange.startDate.toISOString() : "",
    //     bookingEndDate: selectedDateRange.endDate ? selectedDateRange.endDate.toISOString() : "",
    //     room: roomDetails?._id || "",
    //     totalPrice: roomDetails?.price || 0,
    //   };
    const requestBody = {
        startDate: selectedDateRange.startDate ? formatDate(selectedDateRange.startDate) : "",
        endDate: selectedDateRange.endDate ? formatDate(selectedDateRange.endDate) : "",
        room: roomDetails?._id || "",
        totalPrice: roomDetails?.price || 0,
      };
  console.log("requestBody",requestBody);
      // Envoyer la requête à votre endpoint de création de réservation
      try {
        const response = await axios.post(createBookingUrl, requestBody, {
          headers: requestHeaders,
        });
  
        console.log(response); // Affichez la réponse du serveur si nécessaire
  
        // Rediriger ou effectuer d'autres actions après la création de la réservation
        // navigate('/votre-chemin-de-redirection');
      } catch (error) {
        console.error(error); // Gérez les erreurs de requête si nécessaire
      }
    }
  };
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date); // Crée une nouvelle instance de Date si ce n'est pas déjà le cas
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h6" variant="h5">
        create a booking
      </Typography>
      <Typography sx={{ ml: 1 }} component="h6" variant="h6">
        Pick a Date
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center"></Box>

        <MyDateRangePicker 
        onDateChange={handleDateChange} 
        ref={dateRangePickerRef} 
        // {...register("startDate", { required: 'Start date is required' })}
        // {...register("endDate", { required: 'End date is required' })}
        />
      </Box>

      <Typography
        className={styles.headParag}
        sx={{ ml: 1 }}
        component="h6"
        variant="h6"
      >
        You will pay <strong>$00USD </strong>
      </Typography>

      <button
      type="submit"
        className="btnWidth"
        // onClick={() =>
        //   navigate("/user/home/explore", { state: { selectedDateRange } })
        // }
      >
        pay
      </button>
    </Box>
  );
};
export default CreateBooking;