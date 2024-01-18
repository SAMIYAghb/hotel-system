import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  ScopedCssBaseline,
} from "@mui/material";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import styles from "./Review.module.scss";
import img from "../../../../assets/images/review.png";
import StartBooking from "../StartBooking/StartBooking";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { amber } from "@mui/material/colors";

const AccentStarIcon = styled(StarIcon)({
  color: amber[500],
});
const Review = () => {
  return (
    <ScopedCssBaseline 
    sx={{ 
      // backgroundColor: "#f58c01" ,
     paddingTop:"3rem",paddingBottom:"4rem"}}>
      <Container 
      maxWidth="md">
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction={{ xs: "column", md: "row" }}
          useFlexGap
          // flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Box className={styles.reviewImageParent}>
            <Box className={styles.imageBack}></Box>
            <img src={img} alt="" className={styles.reviewImage} />
          </Box>

          <Box sx={{ paddingLeft: "2rem" }}>
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>
              Happy Family
            </Typography>
            <Box>
              <AccentStarIcon />
              <AccentStarIcon />
              <AccentStarIcon />
              <AccentStarIcon />
              <AccentStarIcon />
            </Box>
            <Typography variant="p" sx={{ marginBottom: "16px" }}>
              What a great trip with my family and I should try again next time
              soon ...
            </Typography>

            <Typography variant="body1">Angga, Product Designer</Typography>
          </Box>
        </Stack>
      </Container>
    </ScopedCssBaseline>
  );
};

export default Review;
