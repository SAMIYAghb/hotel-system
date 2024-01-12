import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { adsDetailsUrl, adsUrl, deleteAdsUrl, updateAdsUrl } from '../../../services/api';
import { AppBar, Button, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import CustomButton from '../../UI/CustomButton/CustomButton';
import noData from '../../../assets/images/noData.png'
import style from './Ads.module.scss'
import CustomModal from '../../UI/CustomModal/CustomModal';
import { red } from "@mui/material/colors";
import { useForm } from 'react-hook-form';
import { IAds } from '../../../interface/AdsInterface';


const Ads: React.FC = () => {
  const { requestHeaders } = useContext(AuthContext);
  // const [adsList, setAdsList] = useState([]);
  const [adsList, setAdsList] = useState([] ?? []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [adId, setAdId] = useState(0);
  const [adDetails, setAdDetails] = useState([]);
  const [modalState, setModalState] = React.useState("close");
  const [active, setActive] = useState('');

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {

  //   setActive(event.target.value);
  // };
  const handleChange = (event) => {
    setActive(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IAds>();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllAds(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleMenuClick = (event, ad) => {
    setAnchorEl(event.currentTarget);
    setSelectedAd(ad);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAd(null);
    setModalState("close")
  };


  // Update-Modal
  const showUpdateModal = (ad) => {
    setAdId(ad._id);
    setValue("discount", ad?.room?.discount);
    // setValue("isActive", ad?.isActive ? 'Yes' : 'No');
    // setValue('discount', ad?.room?.discount || '');
    setValue('isActive', ad?.isActive ? 'yes' : 'no');
    // setValue("isActive", ad?.isActive);
    setModalState("update-modal");
  };


  // view-Modal
  const showViewModal = (id) => {
    setAdId(id);
    setModalState("view-modal");
    getAdsDetails(id);
  };

  // Delete_Modal
  const showDeleteModal = (adId) => {
    setAdId(adId);
    setModalState("delete-modal");
  };

  // ******** Get All Ads ********
  const getAllAds = () => {
    axios.get(`${adsUrl}`, {
      headers: requestHeaders
    })
      .then((response) => {
        setAdsList(response.data.data.ads)
        console.log(response.data.data.ads);

      })
      .catch((error) => {
        console.log(error);

      })
  }
  //************* Update Ads **************

  // const updateAds = (data) => {
  //   const isActiveBoolean = active === 'yes';
  //   data.isActive = isActiveBoolean;
  //   axios
  //     .put(`${updateAdsUrl}/${adId}`, data, {
  //       headers: requestHeaders,
  //     })
  //     .then((response) => {

  //       handleClose();

  //       // Fetch updated data after the update
  //       getAllAds(currentPage);
  //     })
  //     .catch((error) => {

  //     });
  // };
  const updateAds = (data) => {
    // const isActiveBoolean = active === 'yes';
    data.isActive = active === 'yes';
    axios
      .put(`${updateAdsUrl}${adId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        handleClose();

        // Fetch updated data after the update
        getAllAds(page);
      })
      .catch((error) => {
        // Handle error
      });
  };

  //********** Deleted Ads ****************
  const deleteAds = () => {
    axios
      .delete(`${deleteAdsUrl}${adId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setAdsList(response.data.data.ads);
        handleClose();
        getAllAds(page);
      })
      .catch((error) => {
        // Handle error
      });
  };
  // const deleteAds = () => {
  //   axios
  //     .delete(`${deleteAdsUrl}${adId}`, {
  //       headers: requestHeaders,
  //     })
  //     .then((response) => {
  //       // Filter out the deleted ad from the adsList
  //       const updatedAdsList = adsList.filter((ad) => ad._id !== adId);

  //       setAdsList(updatedAdsList);
  //       setAdId(adId);
  //       handleClose();
  //     })
  //     .catch((error) => {
  //       // Handle error
  //     });
  // };

  // ************ Ads Details****************
  const getAdsDetails = (adId) => {
    setAdDetails(null); // Reset adDetails state
    axios
      .get(`${adsDetailsUrl}${adId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setAdDetails(response?.data?.data?.ads);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    getAllAds()
  }, [])
  return (
    <>
      <AppBar position="static">
        <div className={style.header}>
          <Typography variant="h6">
            Rooms Table Details
            <p variant="h6">You can check all details</p>
          </Typography>

          <Link to="/home/ads/add-ad">
            <CustomButton
              className="your-custom-class"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new Ad
            </CustomButton>
          </Link>
        </div>
      </AppBar>
      <div style={{ marginTop: '40px' }}></div>
      <div>
        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>Room Number</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Action</TableCell>
                {/* <TableCell align="center" valign="middle">Actios</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {adsList?.length > 0 &&
                adsList.map((ad) => (
                  <TableRow key={ad?._id}>
                    <TableCell align="center" valign="middle">{ad?.room?.roomNumber}</TableCell>
                    <TableCell align="center" valign="middle">{ad?.room?.price}</TableCell>
                    <TableCell align="center" valign="middle">{ad?.room?.discount}</TableCell>
                    <TableCell align="center" valign="middle">{ad?.room?.capacity}</TableCell>
                    <TableCell align="center" valign="middle">{ad?.isActive ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, ad)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        // open={Boolean(anchorEl)}
                        open={Boolean(anchorEl && selectedAd?._id === ad?._id)}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => showViewModal(ad?._id)}
                        >
                          <Tooltip title="View" arrow>
                            <IconButton color="primary" >
                              <VisibilityIcon fontSize='small' />
                              <p style={{ fontSize: '20px' }}>View</p>
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                        <MenuItem
                          onClick={() => showUpdateModal(ad)}>
                          <Tooltip title="Update" arrow>
                            <IconButton color="warning">
                              <EditIcon fontSize='small' />
                              <p style={{ fontSize: '20px' }}>Edit</p>
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                        <MenuItem onClick={() => showDeleteModal(ad._id)}>
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              // sx={{ color: red[500] }}
                              color="error"
                            >
                              <DeleteIcon fontSize='small' />
                              <p style={{ fontSize: '20px' }}>Delete</p>
                            </IconButton>
                          </Tooltip>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {adsList?.length > 0 && (
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={adsList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}

              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer >
      </div >

      {/* View Modal */}
      <CustomModal
        open={modalState === "view-modal"}
        onClose={handleClose}
        title="Ads Details"
        // identifier="view-modal"
      >
        <div >
          {console.log('adDetails:', adDetails)}
          <div style={{ textAlign: 'center' }}>
            <p>
              <span className="text-warning">Room Number :&nbsp;</span>
              {adDetails?.room?.roomNumber}
            </p>
            <p>
              <span className="text-warning">Price :&nbsp;</span>
              {adDetails?.room?.price}
            </p>
            <p>
              <span className="text-warning">Active :&nbsp;</span>
              {adDetails?.isActive ? 'Yes' : 'No'}
            </p>

          </div>

          <Grid item xs={6}>
            <Button variant="contained" type="submit"
              onClick={handleClose}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Ok
            </Button>
          </Grid>
        </div>
      </CustomModal>

      {/* Update Modal */}

      <CustomModal
        open={modalState === "update-modal"}
        onClose={handleClose}
        title="Update Room"
        // identifier="update-modal"

      >
        <div>
          <form onSubmit={handleSubmit(updateAds)}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Active</InputLabel>
              <Select
                {...register('isActive', { required: true })}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={active}
                label="Active"
                onChange={handleChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            {errors.isActive && <span className="errorMsg">Active is required</span>}

            <TextField
              {...register('discount', { required: true, valueAsNumber: true })}
              required
              id="discount"
              label="Discount"
              fullWidth
              value={watch('discount')}
              sx={{
                width: '100%',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                paddingTop: '5px',
              }}
            />
            {errors.discount && <span className="errorMsg">This field is required</span>}



            <Grid container spacing={2}>
              <Grid item xs={6}>
              </Grid>

              <Grid item xs={6}>
                <Button variant="contained" type="submit"
                  style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>

      </CustomModal>

      {/* Delete Modal */}
      <CustomModal
        open={modalState === "delete-modal"}
        onClose={handleClose}
        title="Delete this Ad?"
        // identifier="delete-modal"

      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <img src={noData} alt="Delete" style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }} />
        </div>
        <p>Are you sure you want to delete this room ? </p>
        <div >
          {/* <Button
              onClick={deleteRoom}
              className={
                "btn btn-outline-danger my-3" + (isLoading ? " disabled" : "")
              }
            >
              {isLoading ? <CircularProgress size={20} /> : "Delete this item"}
            </Button> */}
          <Grid item xs={6}>
            <Button variant="contained" type="submit"
              onClick={deleteAds}
              style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
              Delete
            </Button>
          </Grid>
        </div>

      </CustomModal>

    </>
  )
}
export default Ads;