import { ReactNode } from "react";

// Define the authentication data//
export interface IAuth {
    userData: string ;
    saveUserData: () => void;
    requestHeaders: string;
    // baseUrl: string;
    userRole: string | null;
    updateUserData: () => void;
  }

  // Define the props for AuthContextProvider component
export interface AuthContextProviderProps {
    children: ReactNode;
  }

  export interface ILogin {
    email: string;
    password: string;
}
export interface IRegister {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    country: string;
    profileImage:FileList;
}