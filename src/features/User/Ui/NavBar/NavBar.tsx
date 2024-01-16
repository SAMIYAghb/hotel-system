import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import avatar from '../../../../assets/images/avatar.png';
// import { AuthContext } from "../../../../context/AuthContext";
// import { useContext } from 'react';

const NavBar = () => {
  // const { userData } = useContext(AuthContext);
  return (
    <>
      <AppBar 
      elevation={0}
      // color="transparent"
      // sx={{ml:"250px"}}
      position="static">
        <Toolbar
         style={{ justifyContent: "end" }}>
          <Typography
            sx={{ 
              "&:hover": { color: "red" , fontSize:"24px"}
             }}
            // color="inherit"
          >
            {/* {userData?.userName || "user"} */}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            // color="inherit"
          >
            <Avatar alt="Remy Sharp" src={avatar }/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar