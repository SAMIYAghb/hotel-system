import { ReactNode } from "react";

// Define the authentication data//
export interface IAuth {
    userData: string ;
    saveUserData: () => void;
    requestHeaders: string;
    // baseUrl: string;
    userRole: string | null;
  }

  // Define the props for AuthContextProvider component
export interface AuthContextProviderProps {
    children: ReactNode;
  }
