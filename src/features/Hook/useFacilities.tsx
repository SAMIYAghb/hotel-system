import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { faciRoomsUrl } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const useFacilities = () => {
    const { requestHeaders } = useContext(AuthContext);
    const [facilitiesList, setFacilitiesList] = useState([]);

    const getAllFacilities = () => {
        axios
            .get(`${faciRoomsUrl}`, {
                headers: requestHeaders,
            })
            .then((response) => {
                setFacilitiesList(response?.data?.data?.facilities);

            })
            .catch((error) => {

            });
    };
    useEffect(() => {
        getAllFacilities();
      }, [requestHeaders]);

      return { facilitiesList };
    };

export default useFacilities;