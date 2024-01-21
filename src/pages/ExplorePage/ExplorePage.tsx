import axios from "axios";
import React, { useEffect, useState } from "react";
import { allRoomsFilterdUrl } from "../../services/api";
import { Box } from "@mui/system";
import NavBar from "../../features/User/Ui/NavBar/NavBar";
import Footer from "../../features/User/Ui/Footer/Footer";
import { Badge, CardContent, Grid, Typography } from "@mui/material";
import noHotelImg from "../../assets/images/noo-img.webp";
import CustomPagination from "../../shared/CustomPagination/CustomPagination";
import { useLocation } from "react-router-dom";
import Style from "./Explore.module.scss"

const ExplorePage: React.FC = () => {
// *******to use selectedDateRange*******
  const location = useLocation();
  const selectedDateRange = location.state?.selectedDateRange;
  // **********************************
  const [roomsList, setRoomsList] = useState([]);
  // *******pagination*******
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / 6);
  // ****************************
  // ***********getAllFilterdRooms*****************
  const getAllFilterdRooms = (page, startDate, endDate) => {
    axios
      .get(`${allRoomsFilterdUrl}`, {
        params: {
          size: 6,
          page: page,
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        console.log("filt rooms succ", response);
        console.log("total count", response.data.data.totalCount);
        setRoomsList(response.data.data.rooms);
        setTotalCount(response.data.data.totalCount);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.log("filt rooms err", error);
      });
  };
  // useEffect(() => {
  //   getAllFilterdRooms(
  //     currentPage,
  //     selectedDateRange?.startDate,
  //     selectedDateRange?.endDate
  //   );
  // }, []);
  useEffect(() => {
    getAllFilterdRooms(
      currentPage,
      selectedDateRange?.startDate,
      selectedDateRange?.endDate
    );
  }, [selectedDateRange]);

  return (
    <Box>
      <NavBar />
      {selectedDateRange ? (
        <Typography
          component="h6"
          variant="h5"
          sx={{ textAlign: "center", my: 4 }}
        >
          Explore ALL Rooms
        </Typography>
      ) : (
        <Typography
          component="h6"
          variant="h5"
          sx={{ textAlign: "center", my: 4 }}
        >
          ALL Rooms
        </Typography>
      )}

      <Grid container spacing={2}>
        {roomsList?.length > 0 &&
          roomsList.map((room, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <CardContent>
                {room?.images && room?.images.length > 0 ? (
                  <div className={Style.imageWrapper}>
                  <span className={Style.badge}> ${room?.price} per night</span>
                    <img
                      src={room?.images}
                      alt={`Image ${index + 1}`}
                  
                    />
                  </div>
                ) : (
                  <div className={Style.imageWrapper}>
                  <span className={Style.badge}>800$</span>
                  <img
                    className="imgAnimate"
                    src={noHotelImg}
                    alt={`Image ${index + 1}`}
                 
                  />
                  </div>
                )}
              </CardContent>
            </Grid>
          ))}
      </Grid>
      {/* pagination */}

      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onFetchRooms={getAllFilterdRooms}
      />

      <Footer />
    </Box>
  );
};
export default ExplorePage;
