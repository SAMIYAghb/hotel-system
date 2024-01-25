// import { useContext } from 'react';
// import './App.css'
// import Login from './authentication/Login/Login'
// import { AuthContext } from './context/AuthContext';
// import NotFound from './shared/NotFound/NotFound';
// import Register from './authentication/Register/Register';
// import ResetPass from './authentication/ResetPass/ResetPass';
// import ChangePass from './authentication/ChangePass/ChangePass';
// import { RouterProvider, createBrowserRouter} from 'react-router-dom';
// import AuthLayout from './shared/AuthLayout/AuthLayout';
// import MasterLayout from './shared/MasterLayout/MasterLayout';
// import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
// import Rooms from './features/Admin/Rooms/Rooms';
// import Home from './features/Admin/Home/Home';
// import Users from './features/Admin/Users/Users';
// import Ads from './features/Admin/Ads/Ads';
// import Bookings from './features/Admin/Bookings/Bookings';
// import ForgetPass from './authentication/ForgetPass/ForgetPass';
// import { IAuth } from './interface/AuthInterface';
// import AddNewRoom from './features/Admin/Rooms/AddNewRoom/AddNewRoom';
// import AddNewAd from './features/Admin/Ads/AddNewAd/AddNewAd';
// import Facilities from './features/Admin/Facilities/Facilities';
// import UserHome from './features/User/UserHome/UserHome';


// import ExplorePage from './pages/ExplorePage/ExplorePage';
// import RoomDetails from './features/User/Ui/RoomDetails/RoomDetails';
// import FavouritesPage from './pages/FavouritesPage/FavouritesPage';


// import Profile from './features/User/Ui/Profile/Profile';
// import Payment from './features/User/Ui/Payment/Payment';
// import BookingDetails from './features/User/Ui/BookingDetails/BookingDetails';





// function App() {
//   const { userData, saveUserData }: IAuth = useContext(AuthContext);

//   const routes = createBrowserRouter([
//     {
//       path: "/",
//       element: <AuthLayout />,
//       errorElement: <NotFound />,
//       children: [
//         { index: true, element: <Login saveUserData={saveUserData} /> },
//         { path: "login", element: <Login saveUserData={saveUserData} /> },
//         { path: "register", element: <Register /> },
//         { path: "forget-password", element: <ForgetPass /> },
//         { path: "reset-password", element: <ResetPass /> },

//         { path: "notfound", element: <NotFound /> },
//         { path: "change-password", element: <ChangePass /> },
//       ],
//     },
//     {
//       path: "/admin/home",

//       element: (
//         <ProtectedRoute userData={userData}>
//           <MasterLayout userData={userData} />
//         </ProtectedRoute>
//       ),
//       errorElement: <NotFound />,
//       children: [
//         { index: true, element: <Home /> },
//         { path: "users", element: <Users /> },
//         { path: "rooms", element: <Rooms /> },
//         { path: "rooms/add-room", element: <AddNewRoom /> },
//         { path: "ads", element: <Ads /> },

//         { path: "ads/add-ad", element: <AddNewAd /> },

//         { path: "facilities", element: <Facilities /> },

//         { path: "bookings", element: <Bookings /> },
//       ],
//     },
//     {
//       path: "/user/home",

//       errorElement: <NotFound />,
//       children: [
//         { index: true, element: <UserHome /> },

//         { path: "explore", element: <ExplorePage /> },
//         { path: "fav", element: <FavouritesPage /> },
//         { path: "room-details/:roomId", element: <RoomDetails /> },

//         { path: "profile", element: <Profile /> },

//         { path: "payment/:bookingId", element: <Payment /> },
//         { path: "booking-details/:bookingId", element: <BookingDetails /> },

//   ]},
//   ]);

//   return (
//     <>

//       <RouterProvider router={routes} />
//     </>
//   );
// }

// export default App;

// import { useContext, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './authentication/Login/Login';
// import { AuthContext } from './context/AuthContext';
// import NotFound from './shared/NotFound/NotFound';
// import Register from './authentication/Register/Register';
// import ResetPass from './authentication/ResetPass/ResetPass';
// import ChangePass from './authentication/ChangePass/ChangePass';
// import AuthLayout from './shared/AuthLayout/AuthLayout';
// import MasterLayout from './shared/MasterLayout/MasterLayout';
// import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
// import Rooms from './features/Admin/Rooms/Rooms';
// import Home from './features/Admin/Home/Home';
// import Users from './features/Admin/Users/Users';
// import Ads from './features/Admin/Ads/Ads';
// import Bookings from './features/Admin/Bookings/Bookings';
// import ForgetPass from './authentication/ForgetPass/ForgetPass';
// import { IAuth } from './interface/AuthInterface';
// import AddNewRoom from './features/Admin/Rooms/AddNewRoom/AddNewRoom';
// import AddNewAd from './features/Admin/Ads/AddNewAd/AddNewAd';
// import Facilities from './features/Admin/Facilities/Facilities';
// import UserHome from './features/User/UserHome/UserHome';
// import ExplorePage from './pages/ExplorePage/ExplorePage';
// import RoomDetails from './features/User/Ui/RoomDetails/RoomDetails';
// import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
// import Profile from './features/User/Ui/Profile/Profile';
// import Payment from './features/User/Ui/Payment/Payment';
// import BookingDetails from './features/User/Ui/BookingDetails/BookingDetails';

// function App() {
//   const { userData }: IAuth = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             userData ? <Navigate to="/user/home" /> : <AuthLayout />
//           }
//         >
//           <Route path="/" element={<UserHome />} /> {/* Route par défaut pour UserHome */}
//         <Route path="/user/home" element={<UserHome />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="forget-password" element={<ForgetPass />} />
//           <Route path="reset-password" element={<ResetPass />} />
//           <Route path="change-password" element={<ChangePass />} />
//           <Route path="notfound" element={<NotFound />} />
//         </Route>

//         <Route
//           path="/admin/home"
//           element={
//             <ProtectedRoute userData={userData}>
//               <MasterLayout userData={userData} />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Home />} />
//           <Route path="users" element={<Users />} />
//           <Route path="rooms" element={<Rooms />} />
//           <Route path="rooms/add-room" element={<AddNewRoom />} />
//           <Route path="ads" element={<Ads />} />
//           <Route path="ads/add-ad" element={<AddNewAd />} />
//           <Route path="facilities" element={<Facilities />} />
//           <Route path="bookings" element={<Bookings />} />
//         </Route>

//         <Route
//           path="/user/home"
//           element={
//             <Routes>
//               <Route index element={<UserHome />} />
//               <Route path="explore" element={<ExplorePage />} />
//               <Route path="fav" element={<FavouritesPage />} />
//               <Route path="room-details/:roomId" element={<RoomDetails />} />
//               <Route path="profile" element={<Profile />} />
//               <Route path="payment/:bookingId" element={<Payment />} />
//               <Route path="booking-details/:bookingId" element={<BookingDetails />} />
//             </Routes>
//           }
//         />
        
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './authentication/Login/Login';
import { AuthContext } from './context/AuthContext';
import NotFound from './shared/NotFound/NotFound';
import Register from './authentication/Register/Register';
import ResetPass from './authentication/ResetPass/ResetPass';
import ChangePass from './authentication/ChangePass/ChangePass';
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
import ExplorePage from './pages/ExplorePage/ExplorePage';
import RoomDetails from './features/User/Ui/RoomDetails/RoomDetails';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import Profile from './features/User/Ui/Profile/Profile';
import Payment from './features/User/Ui/Payment/Payment';
import BookingDetails from './features/User/Ui/BookingDetails/BookingDetails';

function App() {
  const { userData , userRole}: IAuth = useContext(AuthContext);
console.log(userRole,userData);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              userRole === "admin" ? (
                <Navigate to="/admin/home" />
              ) : (
                <Navigate to="/user/home" />
              )
            ) : (
              <AuthLayout />
            )
          }
        >
          {/* Route par défaut pour UserHome */}
          <Route path="/" element={<UserHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPass />} />
          <Route path="reset-password" element={<ResetPass />} />
          <Route path="change-password" element={<ChangePass />} />
          <Route path="notfound" element={<NotFound />} />
        </Route>

        {/* Routes pour l'administration */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute userData={userData}>
           <MasterLayout userData={userData} />
         </ProtectedRoute>
            // userData && userRole === "admin" ? (
            //   <ProtectedRoute userData={userData}>
            //     <MasterLayout userData={userData} />
            //   </ProtectedRoute>
            // ) : (
            //   <Navigate to="/user/home" />
            // )
          }
        >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/add-room" element={<AddNewRoom />} />
          <Route path="ads" element={<Ads />} />
          <Route path="ads/add-ad" element={<AddNewAd />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>

        {/* Routes pour les utilisateurs */}
        <Route
          path="/user/home/*"
          element={
            <Routes>
              <Route index element={<UserHome />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="fav" element={<FavouritesPage />} />
              <Route path="room-details/:roomId" element={<RoomDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="payment/:bookingId" element={<Payment />} />
              <Route
                path="booking-details/:bookingId"
                element={<BookingDetails />}
              />
            </Routes>
          }
        />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

