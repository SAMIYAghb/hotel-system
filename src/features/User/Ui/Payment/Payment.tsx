import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');

const Payment = () => {
  const { bookingId } = useParams();
  console.log(bookingId);

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    //   };
  return (
    <>
     {/* <div>Payment</div> */}
    <Elements stripe={stripePromise}
    //  options={options}
     >
      <CheckoutForm bookingId={bookingId} />
    </Elements>
    </>
  )
}

export default Payment