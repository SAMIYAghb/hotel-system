import { useContext } from 'react';
import './App.css'
import Login from './authentication/Login/Login'

import Register from './authentication/Register/Register'

import { AuthContext } from './context/AuthContext';
import NotFound from './shared/NotFound/NotFound';
import Register from './authentication/Register/Register';
import ResetPass from './authentication/ResetPass/ResetPass';
import ChangePass from './authentication/ChangePass/ChangePass';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import AuthLayout from './shared/AuthLayout/AuthLayout';
import MasterLayout from './shared/MasterLayout/MasterLayout';
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
import Rooms from './features/Admin/Rooms/Rooms';
import Home from './features/Admin/Home/Home';
import Users from './features/Admin/Users/Users';
import Ads from './features/Admin/Ads/Ads';
import Bookings from './features/Admin/Bookings/Bookings';
import ForgetPass from './authentication/ForgetPass/ForgetPass';


function App() {
  const{ userData, saveUserData } :IAuth= useContext(AuthContext);

  const routes = createHashRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login
           saveUserData={saveUserData}
           /> },
        { path: "login", element: <Login
        saveUserData={saveUserData}
        /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        // { path: "verify-user", element: <VerifyUser /> },
        { path: "notfound", element: <NotFound /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
    {
      path: "home",

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
        { path: "ads", element: <Ads /> },
        { path: "bookings", element: <Bookings /> },
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