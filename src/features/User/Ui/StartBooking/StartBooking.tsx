import { Typography, Box, Button, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import styles from "./StartBooking.module.scss";
import MyDateRangePicker from "../../../Shared/DateRangePicker/MyDateRangePicker";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StartBooking = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const navigate = useNavigate();

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h6" variant="h5">
        Start Filtration
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

        <MyDateRangePicker onDateChange={handleDateChange} />
      </Box>
      <Typography sx={{ ml: 1 }} component="h6" variant="h6">
        Capacity
      </Typography>
      <Box display="flex" alignItems="center">
        <Button onClick={handleDecrease} variant="contained" color="secondary">
          -
        </Button>
        <TextField
          type="text"
          value={`${numberOfPersons} persons`}
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
        You will pay <strong>$480 USD </strong> per
        <strong> {numberOfPersons} persons</strong>
      </Typography>

      <button
        className="btnWidth"
        onClick={() =>
          navigate("/user/home/explore", { state: { selectedDateRange } })
        }
      >
        Explore
      </button>
    </Box>
  );
};
export default StartBooking;
