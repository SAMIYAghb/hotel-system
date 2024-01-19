import axios from "axios";
import React, { useEffect, useState } from "react";
import { allRoomsFilterdUrl } from "../../services/api";
import { Box, textAlign } from "@mui/system";
import NavBar from "../../features/User/Ui/NavBar/NavBar";
import Footer from "../../features/User/Ui/Footer/Footer";
import { CardContent, Grid, Typography } from "@mui/material";
import noHotelImg from "../../assets/images/noo-img.webp"
const ExplorePage: React.FC = ({ selectedDateRange }) => {
  const [roomsList, setRoomsList] = useState([]);
  // ***********getAllFilterdRooms*****************
  const getAllFilterdRooms = (startDate, endDate) => {
    axios
      .get(`${allRoomsFilterdUrl}`, {
        params: {
          // size: rowsPerPage,
          // page: page,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        console.log("filt rooms succ", response);
        setRoomsList(response.data.data.rooms);
      })
      .catch((error) => {
        console.log("filt rooms err", error);
      });
  };
  useEffect(() => {
    getAllFilterdRooms(
      selectedDateRange?.startDate,
      selectedDateRange?.endDate
    );
  }, []);
  //   useEffect(() => {
  //     if (selectedDateRange) {
  //     getAllFilterdRooms(
  //       selectedDateRange?.startDate,
  //       selectedDateRange?.endDate
  //     );
  //     }
  //   }, [selectedDateRange]);

  return (
    <Box>
      <NavBar />
      <Typography
        component="h6"
        variant="h5"
        sx={{ textAlign: "center", mt: 2 }}
      >
        Explore ALL Rooms
      </Typography>
      {/* <Typography>ALL Rooms</Typography> */}
      <Grid container spacing={2}>
        {roomsList?.length > 0 &&
        (  roomsList.map((room, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <CardContent style={{ textAlign: "center", height: "300px" }}>
              {room?.images && room?.images.length > 0 ? (
                <img
                  src={room?.images}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "100%" ,borderRadius:".6rem"}}
                />
              ):(<img
              className="imgAnimate"
                src={noHotelImg}
                alt={`Image ${index + 1}`}
                style={{ width: "100%", height: "100%" ,borderRadius:".6rem"}}
              />)}
              </CardContent>
            </Grid>
          ))
        )
          }
      </Grid>

      <Footer />
    </Box>
  );
};
export default ExplorePage;
