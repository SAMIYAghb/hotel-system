import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IAuth } from "../interface/AuthInterface";
import { AuthContextProviderProps } from "../interface/AuthInterface";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {auth} from "../Config/Firebase";
// Create the AuthContext and set the initial value
export const AuthContext = createContext<IAuth>({
  userData: "",
  saveUserData: () => { },
  requestHeaders: "",
  //   baseUrl: '',
  userRole: "",

  updateUserData: () => {},

});

// // Define the props for AuthContextProvider component
// interface AuthContextProviderProps {
//   children: ReactNode;
// }

interface DecodedToken {
  username: string;
  email: string;
  password: string;
  role: string;
  
}

// AuthContextProvider component that provides the AuthContext to its children
export const AuthContextProvider: React.FC<AuthContextProviderProps> = (
  props
) => {
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [authData, setAuthData] = useState(null); //new line 
  
    // *******google-auth*********
    const [user, setUser] = useState({});

    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
      signInWithRedirect(auth, provider);
    };
  
    const logOut = () => {
      signOut(auth);
      console.log(auth);
    };

  const updateUserData = (newUserData: string) => {
    setUserData(newUserData);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };

  }, []);

  // Save user data function
  // const saveUserData = () => {
  //     const encodedToken = localStorage.getItem("userToken");
  //     const decodedToken = jwtDecode(encodedToken!) as DecodedToken;
  //     setUserData(decodedToken);
  //     setUserRole(decodedToken.role);
  //   };
  const saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");

    try {
      const decodedToken = jwtDecode(encodedToken!) as DecodedToken;

      setUserData(decodedToken);
      // console.log(decodedToken);
      setUserRole(decodedToken.role);

      console.log(decodedToken.role);

      // console.log(decodedToken.role);
      setAuthData({ user, token: encodedToken }); // Save the entire response data & this is new line


    } catch (error) {
      // Handle the error appropriately, e.g., show a message to the user or log it
    }
  };
  // Compute request headers
  const requestHeaders = {
    Authorization: ` ${localStorage.getItem("userToken")}`,
  };


  // check for userToken and save data
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
    console.log(userData);
    
  }, []);

  // Value to be provided by the context
  const contextValue: IAuth = {
    userData,
    saveUserData,
    requestHeaders,
    // baseUrl: "http://upskilling-egypt.com:3003/api/v1",
    userRole,
    updateUserData,
    setUserRole,

    authData,
    userId: userData?._id || '', //New line in authContext
    googleSignIn,
    logOut,
    user,

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};