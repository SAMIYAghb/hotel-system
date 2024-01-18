import React from 'react'
import NavBar from '../Ui/NavBar/NavBar'
import HeroSection from '../Ui/HeroSection/HeroSection'
import RoomsDisplay from './../Ui/RoomsDisplay/RoomsDisplay';
import Review from './../Ui/Review/Review';
import Footer from './../Ui/Footer/Footer';
import { Box} from '@mui/system';


const UserHome = () => {
  return (
    <Box>
      <NavBar/>
      <HeroSection/>
      <RoomsDisplay/>
      <Review/>
      <Footer/>
      </Box>
  )
}

export default UserHome