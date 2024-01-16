import React from 'react'
import NavBar from '../Ui/NavBar/NavBar'
import HeroSection from '../Ui/HeroSection/HeroSection'
import RoomsDisplay from './../Ui/RoomsDisplay/RoomsDisplay';
import Review from './../Ui/Review/Review';
import Footer from './../Ui/Footer/Footer';


const UserHome = () => {
  return (
    <div>
      <NavBar/>
      <HeroSection/>
      <RoomsDisplay/>
      <Review/>
      <Footer/>
      </div>
  )
}

export default UserHome