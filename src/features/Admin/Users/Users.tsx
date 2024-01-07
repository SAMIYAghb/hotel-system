import axios from "axios";
import { useContext, useEffect, useState } from "react";
import noData from "../../../assets/images/no-data.png";
import { AuthContext } from "../../../context/AuthContext";
import { usersUrl } from "../../../services/api.tsx";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Users: React.FC = () => {
  const { requestHeaders }: any = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  // **********get all users*****************
  const getUsersList = () => {
    axios
      .get(`${usersUrl}?page=1&size=10`, {
        headers: requestHeaders,
      })
      .then((response) => {
        // console.log("succ list", response?.data?.data.users);

        setUsers(response?.data?.data.users);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // ************************
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <Container>
        <Grid item>
          <Typography component="h2" variant="h5">
            Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8f9fb' }}>
                <TableRow>
                  <TableCell>User name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length > 0 ? (
                  users.map((user) => (
                    <>
                      <TableRow key={user?._id}>
                        <TableCell>{user?.userName}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                        <TableCell>{user?.phoneNumber}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.country}</TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} style={{ height: "100%" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        <img
                          src={noData}
                          alt="No Data"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </>
  );
};
export default Users;
