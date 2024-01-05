import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NoData from "./../../Shared/NoData/NoData";
import noData from "./../../assets/images/no-data.png";

import { AuthContext } from "../../../context/AuthContext";
import { usersUrl } from "../../../services/api.tsx";
import {
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
import CustomTable from "../../UI/CustomTable/CustomTable";
// import CustomizedTables from "../../UI/CustomTable/CustomTable";

const Users: React.FC = () => {
  const { requestHeaders }: any = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  // let [itemId, setItemId]: any = useState(0);

  // **********get all projects*****************
  const getUsersList = () => {
    axios
      .get(`${usersUrl}?page=1&size=10`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("succ list", response);

        setUsers(response?.data);
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
              <TableHead>
                <TableRow>
                  <TableCell>user name</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length > 0
                  ? users.map((user) => (
                      <>
                        <TableRow key={user?._id}>
                          <TableCell>{user?.userName}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                        </TableRow>
                      </>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </>
  );
};
export default Users;
