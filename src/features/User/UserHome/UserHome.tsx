import React from 'react'
import NavBar from '../Ui/NavBar/NavBar'
import HeroSection from '../Ui/HeroSection/HeroSection'
import AdsDisplay from '../Ui/AdsDisplay/AdsDisplay';
import Review from './../Ui/Review/Review';
import Footer from './../Ui/Footer/Footer';
import { Box } from '@mui/system';
import StaticSection from '../StaticSection/StaticSection';
import style from './UserHome.module.scss'

const UserHome = () => {
  return (
    <Box>
      <NavBar />
      <HeroSection />
      {/* <RoomsDisplay/> */}
      <div className={`${style.container}`}>
        <div className={`${style.wrapper}`}>
          <h1>Hurry up and book now </h1>
        </div>
      </div>
      <AdsDisplay />
      <StaticSection />
      <Review />
      <Footer />
    </Box>
  )
}

export default UserHome