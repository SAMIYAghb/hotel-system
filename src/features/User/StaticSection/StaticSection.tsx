import React from 'react';
import { Grid, Paper } from '@mui/material';
import './StaticSection.module.scss'
import image1 from '../../../assets/images/house1.jpg'; // replace with the actual path to your image
import image2 from '../../../assets/images/house2.jpg';
import image3 from '../../../assets/images/house3.jpg';
import image4 from '../../../assets/images/house4.jpg';
import image5 from '../../../assets/images/house5.jpg';

import image6 from '../../../assets/images/hotal1.jpg';
import image7 from '../../../assets/images/hotal2.jpg';
import image8 from '../../../assets/images/hotal3.jpg';
import image9 from '../../../assets/images/hotal4.jpg';
import image10 from '../../../assets/images/hotal5.jpg';

export default function StaticSection() {
    const imagePaths = [image1, image2, image3, image4, image5];
    const imagePaths1 = [image6, image7, image8, image9, image10];


    return (
        <>
            <h3 className='header-text' style={{paddingTop:'50px'}}>Houses with beauty backyard</h3>
            <Grid container spacing={2} className="room-container" sx={{paddingBottom:'50px'}} >
                {imagePaths.map((path, index) => (
                    <Grid item key={index} xs={2.3} >
                        <Paper className="room-content" >
                            <img src={path} className='room-image' alt={`Image ${index + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <h3 className='header-text'>Most Picked</h3>
            <Grid container spacing={2} className="room-container" >
                {imagePaths1.map((path, index) => (
                    <Grid item key={index} xs={2.3} >
                        <Paper className="room-content" >
                            <img src={path} className='room-image' alt={`Image ${index + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>

    );
}

