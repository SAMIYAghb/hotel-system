import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
 import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
 import GridViewIcon from '@mui/icons-material/GridView';
 import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
 import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
 import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
 import LogoutIcon from '@mui/icons-material/Logout';


const SideBar: React.FC = () => {
  // let { userRole } = useContext(AuthContext);
  

  //*************sidebar collapse***************
  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  //  logout Function
  const navigate = useNavigate();
  function logOut(): void {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  //Model
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <div className="sidebar-container">
      {/* <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        // className="custom-model"
        dialogClassName="custom-model"
      >
        <Modal.Body className="p-0">
          <ChangePassword handleClose={handleClose} />
        </Modal.Body>
      </Modal> */}
      <Sidebar className="vh-100" collapsed={isCollapsed}>
        <div
          className={`toggle-sidebar-btn ${isCollapsed ? "collapsed" : ""} `}
          onClick={handleToggle}
        >
          {isCollapsed ? (
            <KeyboardDoubleArrowRightIcon/>
          ) : (
            <KeyboardDoubleArrowLeftIcon/>
          )}
        </div>
       
        <Menu className="mt-5">
         
          <MenuItem
            icon={<AccountBalanceIcon/>}
            component={<Link to="/home" />}
          >
            Home
          </MenuItem>
        <MenuItem
            icon={<PeopleAltIcon/>}
            component={<Link to="/home/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<GridViewIcon/>}
            component={<Link to="/home/rooms" />}
          >
            Rooms
          </MenuItem>
        <MenuItem
            icon={<CardGiftcardIcon/>}
            component={<Link to="/home/ads" />}
          >
            Ads
          </MenuItem>
          <MenuItem
            icon={<CalendarMonthIcon/>}
            component={<Link to="/home/bookings" />}
          >
            Bookings
          </MenuItem>
          
            {/* <MenuItem
            onClick={handleShow}
            icon={<i className="fa-solid fa-unlock"></i>}
          >
            Change Password
          </MenuItem> */}

          <MenuItem
            onClick={logOut}
            icon={<LogoutIcon/>}
          >
            Logout
          </MenuItem>
         
        </Menu>
      </Sidebar>
    </div>
  );
};
export default SideBar;

