import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  addToFavUrl,
  allFavRoomsUrl,
  allRoomsFilterdUrl,
  removeFavRoomUrl,
} from "../../services/api";
import { Container, Box } from "@mui/system";
import NavBar from "../../features/User/Ui/NavBar/NavBar";
import Footer from "../../features/User/Ui/Footer/Footer";
import { CardContent, Grid, IconButton, Typography } from "@mui/material";
import noHotelImg from "../../assets/images/noo-img.webp";
import CustomPagination from "../../shared/CustomPagination/CustomPagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Style from "./Fav.module.css";
import Loader from "../../shared/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const FavouritesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { requestHeaders } = useContext(AuthContext);

  // **********************************
  const [favRoomsList, setFavRoomsList] = useState([]);
  // *******pagination*******
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / 6);
  // ****************************
  const [favStatus, setFavStatus] = useState({}); // To update the status of Fav

  // ***********getAllFavRooms*****************
  const getAllFavRooms = () => {
    axios
      .get(`${allFavRoomsUrl}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log(
          "succ fet fav",
          response?.data?.data?.favoriteRooms[0].rooms
        );
        setIsLoading(true);
        setFavRoomsList(response?.data?.data?.favoriteRooms[0].rooms);
        // setTotalCount(response.data.data.totalCount);
        // setCurrentPage(page);
      })
      .catch((error) => {
        console.log("fav rooms err", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // ***********removeFavRooms*****************
  const removeFromFav = (roomId: string) => {
    axios
      .delete(
        `${removeFavRoomUrl}/${roomId}`,
        {
          headers: requestHeaders,
        }
      
      )

      .then((response) => {
        console.log("succ remove", response.data.data.rooms);
        toast.success("Removed from Favorite Successfully");
        // setIsLoading(true);
        // setFavRoomsList(response.data.data.rooms);
        // setTotalCount(response.data.data.totalCount);
        // setCurrentPage(page);
      })
      .catch((error) => {
        console.log("fav remov err", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Load favStatus from localStorage on component mount
  useEffect(() => {
    const storedFavStatus = localStorage.getItem("favStatus");
    if (storedFavStatus) {
      setFavStatus(JSON.parse(storedFavStatus));
    }
  }, []);

  // Save favStatus to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favStatus", JSON.stringify(favStatus));
  }, [favStatus]);

  useEffect(() => {
    getAllFavRooms();
  }, []);

  return (
    <Box>
      <NavBar />
      {/* <Container> */}
      <Typography
        component="h6"
        variant="h5"
        sx={{ textAlign: "center", my: 4 }}
      >
        Your Favorites
      </Typography>

      <Grid container spacing={2}>
        {isLoading ? (
          <div className="centered">
            {" "}
            <Loader />
          </div>
        ) : (
          <>
            {favRoomsList?.length > 0 &&
              favRoomsList.map((room, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                  <CardContent>
                    {room?.images && room?.images.length > 0 ? (
                      <div className={Style.imageWrapper}>
                        {/* <span className={Style.badge}>
                    ${room?.price} per night
                  </span> */}
                        <img
                          src={
                            room?.images.length > 1
                              ? room?.images[0]
                              : room?.images[0]
                          }
                          alt={`Image ${index + 1}`}
                        />
                        <div>
                          <h3 className={Style.roomName}>{room?.roomNumber}</h3>
                        </div>

                        <div className={Style.overlay}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton onClick={() => removeFromFav(room._id)}>
                              <FavoriteIcon
                                style={{
                                  color: favStatus[room._id]
                                    ? "#f50057"
                                    : "white",
                                }}
                              />
                            </IconButton>

                            {/* </Link> */}
                          </Grid>
                        </div>
                      </div>
                    ) : (
                      <div className={Style.imageWrapper}>
                        {/* <span className={Style.badge}>
                    ${room?.price} per night
                  </span> */}
                        <img
                          className="imgAnimate"
                          src={noHotelImg}
                          alt={`Image ${index + 1}`}
                        />
                        <div>
                          <h3 className={Style.roomName}>{room?.roomNumber}</h3>
                        </div>

                        <div className={Style.overlay}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton onClick={() => removeFromFav(room._id)}>
                              <FavoriteIcon
                          
                              style={{ color: favStatus[room._id] ? '#f50057' : 'white' }}
                              />
                            </IconButton>

                            {/* </Link> */}
                          </Grid>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Grid>
              ))}
          </>
        )}
      </Grid>
      {/* pagination */}
      {!isLoading ? (
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onFetchRooms={getAllFavRooms}
        />
      ) : (
        ""
      )}
      {/* </Container> */}
      <Footer />
    </Box>
  );
};

export default FavouritesPage;
