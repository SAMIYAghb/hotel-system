import { useContext } from 'react';
import './App.css'
import Login from './authentication/Login/Login'
import { AuthContext } from './context/AuthContext';
import NotFound from './shared/NotFound/NotFound';
import Register from './authentication/Register/Register';
import ResetPass from './authentication/ResetPass/ResetPass';
import ChangePass from './authentication/ChangePass/ChangePass';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import AuthLayout from './shared/AuthLayout/AuthLayout';
import MasterLayout from './shared/MasterLayout/MasterLayout';
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
import Rooms from './features/Admin/Rooms/Rooms';
import Home from './features/Admin/Home/Home';
import Users from './features/Admin/Users/Users';
import Ads from './features/Admin/Ads/Ads';
import Bookings from './features/Admin/Bookings/Bookings';
import ForgetPass from './authentication/ForgetPass/ForgetPass';
import { IAuth } from './interface/AuthInterface';
import AddNewRoom from './features/Admin/Rooms/AddNewRoom/AddNewRoom';
import AddNewAd from './features/Admin/Ads/AddNewAd/AddNewAd';
import Facilities from './features/Admin/Facilities/Facilities';
import UserHome from './features/User/UserHome/UserHome';

import RoomDetails from './features/User/Ui/RoomDetails/RoomDetails';

import Profile from './features/User/Ui/Profile/Profile';





function App() {
  const { userData, saveUserData }: IAuth = useContext(AuthContext);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        // { path: "verify-user", element: <VerifyUser /> },
        { path: "notfound", element: <NotFound /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
    {
      path: "/admin/home",

      element: (
        <ProtectedRoute userData={userData}>
          <MasterLayout userData={userData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "rooms", element: <Rooms /> },
        { path: "rooms/add-room", element: <AddNewRoom /> },
        { path: "ads", element: <Ads /> },

        { path: "ads/add-ad", element: <AddNewAd /> },

        { path: "facilities", element: <Facilities /> },

        { path: "bookings", element: <Bookings /> },
      ],
    },
    {
      path: "/user/home",

      // element: (
      //   <ProtectedRoute userData={userData}>
      //     <MasterLayout userData={userData} />
      //   </ProtectedRoute>
      // ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <UserHome /> },
        { path: "profile", element: <Profile /> },
        // { path: "rooms", element: <Rooms /> },
        // { path: "rooms/add-room", element: <AddNewRoom /> },
        // { path: "ads", element: <Ads /> },

        // { path: "ads/add-ad", element: <AddNewAd /> },

        // { path: "facilities", element: <Facilities /> },

        { path: "room-details/:roomId", element: <RoomDetails /> },
      ],
    },
  ]);

  return (
    <>

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
