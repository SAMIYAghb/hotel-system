import { Container, Grid } from '@mui/material'
import React from 'react'
import SideBar from './../../features/Admin/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import styles from './MasterLayout.module.scss'
export default function MasterLayout() {
  return (
    <>
    <Container style={{ margin: 0 }}>
      <Grid container className={styles.container}>
        {/* First Sidebar */}
        <Grid item md={4} className={styles.sidebar}>
          <SideBar />
        </Grid>

        {/* Outlet (Main Content) */}
        <Grid item md={8} className={styles.body}>
          <Outlet />
        </Grid>

       
      </Grid>
    </Container>
  </>
 
  )
}
