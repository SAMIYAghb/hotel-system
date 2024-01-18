// import React from 'react';
import { Typography, Box, Button, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useContext, useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import styles from "./StartBooking.module.scss";
import MyDateRangePicker from "../../../Shared/DateRangePicker/MyDateRangePicker";
import axios from "axios";
import { roomsUrl } from "../../../../services/api";
import { AuthContext } from "../../../../context/AuthContext";
const StartBooking = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const { requestHeaders } = useContext(AuthContext);
  const [roomsList, setRoomsList] = useState([]);
  // ****************************
  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);

    // Calculate the number of nights
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setNumberOfNights(Math.max(0, differenceInDays));
    } else {
      setNumberOfNights(0);
    }
  };
  // ****************************
  const handleIncrease = () => {
    setNumberOfNights((prevValue) => prevValue + 1);
    updateDateRange();
  };
  // ****************************
  const handleDecrease = () => {
    if (numberOfNights > 0) {
      setNumberOfNights((prevValue) => prevValue - 1);
      updateDateRange();
    }
  };
  // ****************************
  const updateDateRange = () => {
    const newEndDate = new Date(selectedDateRange.startDate);
    newEndDate.setDate(newEndDate.getDate() + numberOfNights);

    setSelectedDateRange({
      startDate: selectedDateRange.startDate,
      endDate: newEndDate,
      key: "selection",
    });
  }
    // ***********getAllFilterdRooms*****************
    const getAllFilterdRooms = (startDate,endDate) => {
      console.log("req head",requestHeaders)
     
      axios
        .get(`${roomsUrl}`, {
          headers: requestHeaders,
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((response) => {
          console.log("filt rooms succ", response);
          // setRoomsList(response.data.data.rooms);
        })
        .catch((error) => {
          console.log("filt rooms err", error);
        });
    
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h6" variant="h5">
        Start Booking
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
        <Box display="flex" alignItems="center">
          {/* <Button variant="contained"
       sx={{
       mr:1,
        backgroundColor: "rgba(21, 44, 91, 1)",
      }}
      >
      <CalendarMonthIcon  sx={{mb:1}}/>
      </Button> */}
        </Box>
        {/* <SingleInputDateRangePicker onDateChange={handleDateChange}/>
         */}
        <MyDateRangePicker onDateChange={handleDateChange} />
      </Box>
      <Typography sx={{ ml: 1 }} component="h6" variant="h6">
        How long you will stay?
      </Typography>
      <Box display="flex" alignItems="center">
        <Button onClick={handleDecrease} variant="contained" color="secondary">
          -
        </Button>

        {/* Update TextField to display the calculated number of nights */}
        <TextField
          type="text"
          value={`${numberOfNights} nights`}
          variant="outlined"
          margin="dense"
          sx={{ mx: 1 }}
          inputProps={{ style: { textAlign: "center" } }}
        />
        <Button onClick={handleIncrease} variant="contained" color="primary">
          +
        </Button>
      </Box>
      <Typography
        className={styles.headParag}
        sx={{ ml: 1 }}
        component="h6"
        variant="h6"
      >
        You will pay <strong>$480 USD</strong> per{" "}
        <strong>{numberOfNights} nights</strong>
      </Typography>
      <CustomButton
        className="btnWidth"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => getAllFilterdRooms(
          selectedDateRange.startDate, 
          selectedDateRange.endDate
        )}
      >
        Search in rooms
      </CustomButton>
    </Box>
  );
};
export default StartBooking;
