import React from "react";
import bank1 from "../../../../assets/images/payment1.png";
import bank2 from "../../../../assets/images/payment2.png";
import {
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Box,
  Stack
  
} from "@mui/material";
import styles from './Payment.module.scss'
import {useStripe, useElements,  CardElement} from '@stripe/react-stripe-js';


const CheckoutForm = ({bookingId}) => {
  console.log("from checkout",bookingId);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `http://upskilling-egypt.com:3000/api/v0/portal/booking/${bookingId}/pay`,
      },
    });
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }


  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={
          {
            // backgroundColor: "red",
          }
        }
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ pt: "1.5rem", pb: "4rem" }}
        >
          <CardElement className={styles["payment-card"]}/>


          {/* <Stack
            sx={{ display: "flex", justifyContent: "center" }}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Box sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}>
              <Typography variant="h6" sx={{ pt: "1.5rem", pb: "1.5rem" }}>
                Transfer Pembayaran:
              </Typography>
              <Typography variant="h6">Taxe: 10%</Typography>
              <Typography variant="h6" sx={{ pt: "1.5rem" }}>
                Sub total: $480 USD
              </Typography>
              <Typography variant="h6" sx={{ pt: "1.5rem", pb: "1.5rem" }}>
                Total: $580 USD
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Box><img src={bank1} alt="" className=""/> </Box>
                <Box>
                  <Typography variant="h6" sx={{ pt: "1.5rem" }}>
                    Bank Central Asia
                  </Typography>
                  <Typography variant="h6" sx={{ pt: "1.5rem", pb: "1.5rem" }}>
                    2208 1996
                  </Typography>
                  <Typography variant="h6" sx={{ pb: "1.5rem" }}>
                    BuildWith Angga
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Box><img src={bank2} alt="" className=""/> </Box>
                <Box>
                  <Typography variant="h6" sx={{ pt: "1.5rem" }}>
                    Bank Mandiri
                  </Typography>
                  <Typography variant="h6" sx={{ pt: "1.5rem", pb: "1.5rem" }}>
                    2208 1996
                  </Typography>
                  <Typography variant="body1" sx={{ pb: "1.5rem" }}>
                    BuildWith Angga
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name=""
                label="Upload Bukti Transfer"
                type="text"
                id=""
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name=""
                label="Asal Bank Bukti Transfer"
                type="text"
                id=""
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name=""
                label="Nama Pengirim Bank Bukti Transfer"
                type="text"
                id=""
                autoComplete="current-password"
              />
            </Box>
          </Stack> */}
          
          <Button
           disabled={!stripe}
            type="submit"
            variant="contained"
            sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
          >
            Pay
          </Button>
          {/* <Button
                variant="contained"
                sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
              >
                Cancel
              </Button> */}
        </Box>
      </Container>
    </>
  );
};

export default CheckoutForm;
