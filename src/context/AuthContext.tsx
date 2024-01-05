import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IAuth } from "../interface/AuthInterface";
import { AuthContextProviderProps } from "../interface/AuthInterface";

// Create the AuthContext and set the initial value
export const AuthContext = createContext<IAuth>({
    userData: '',
    saveUserData: () => { },
    requestHeaders: { Authorization: '' },
    //   baseUrl: '',
    userRole: '',
});

// // Define the props for AuthContextProvider component
// interface AuthContextProviderProps {
//   children: ReactNode;
// }

interface DecodedToken {
    username: string;
    email: string;
    password:string;
    role: string;
  }


// AuthContextProvider component that provides the AuthContext to its children
export const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
    const [userData, setUserData] = useState<DecodedToken | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    // Save user data function
    // const saveUserData = () => {
    //     const encodedToken = localStorage.getItem("userToken");
    //     const decodedToken = jwtDecode(encodedToken!) as DecodedToken;
    //     setUserData(decodedToken);
    //     setUserRole(decodedToken.role);
    //   };
    const saveUserData = () => {
        const encodedToken = localStorage.getItem("userToken");
console.log(encodedToken );
        try {
            const decodedToken = jwtDecode(encodedToken!) as DecodedToken;

            setUserData(decodedToken);
            setUserRole(decodedToken.role);

        } catch (error) {

            console.log("Token content:", encodedToken);
            // Handle the error appropriately, e.g., show a message to the user or log it
        }
    };
    // Compute request headers
    const requestHeaders = {
        Authorization: `${localStorage.getItem("userToken")}`,
    };

    // check for userToken and save data
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            saveUserData();
        }
    }, []);

    // Value to be provided by the context
    const contextValue: IAuth = {
        userData,
        saveUserData,
        requestHeaders,
        // baseUrl: "http://upskilling-egypt.com:3003/api/v1",
        userRole
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};