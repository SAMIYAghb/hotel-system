
// import img from "../../../../assets/images/review.png";
// import styles from "./Review.module.scss";
import axios from "axios";
import { useContext, useEffect } from 'react';

import { AuthContext } from "../../../../context/AuthContext";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    'tok_1OaH1DBQWp069pqTZ4RzPl0x.'
    );

const Payment = () => {
  const { requestHeaders} = useContext(AuthContext);
// const url = `${baseUrl}/portal/booking/${bookingId}/pay`;
const url ="http://upskilling-egypt.com:3000/api/v0/portal/booking/65af77c8e815336ace215b49/pay";

const options = {
  // passing the client secret obtained from the server
  clientSecret: '{{CLIENT_SECRET}}',
};

  const payBooking = async () => { 
    await axios
      .post(url,  {
        headers: requestHeaders,
      })
      .then((response) => {
       console.log(response)

        // toast.success("Password change successfully!");
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    payBooking();
  }, [])
  
  return (
    <>
<Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
      
    </>
  )
}

export default Payment
