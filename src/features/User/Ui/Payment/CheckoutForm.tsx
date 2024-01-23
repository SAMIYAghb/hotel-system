import React from 'react'
import bank1 from '../../../../assets/images/payment1.png';
import bank2 from '../../../../assets/images/payment2.png';
import {
    Button,
    Container,
    Divider,
    TextField,
    Typography
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import Stack from "@mui/material/Stack";
  import {PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          // backgroundColor: "red",
        }}
      >
        <Box 
        component="form"
        noValidate
        // onSubmit={handleSubmit(onSubmit)}
        sx={{pt:"1.5rem", pb:"4rem"}}>
          <Stack
          sx={{display: 'flex',justifyContent:"center"}}
           direction="row" 
           divider={<Divider orientation="vertical" flexItem />}
           spacing={2}>
            <Box sx={{pl: "2rem", pr: "2rem", mt: "1rem" }}>
              <Typography variant="h6"sx={{pt:"1.5rem", pb:"1.5rem"}}>Transfer Pembayaran:</Typography>
              <Typography variant="h6">Taxe: 10%</Typography>
              <Typography variant="h6"sx={{pt:"1.5rem"}}>Sub total: $480 USD</Typography>
              <Typography variant="h6"sx={{pt:"1.5rem", pb:"1.5rem"}}>Total: $580 USD</Typography>
              <Box sx={{display:"flex", justifyContent :"space-between", alignContent :"center"}}>
                <Box>
                  {/* <img src={bank1} alt="" className=""/>  */}
                </Box>
                <Box>
                <Typography variant="h6"sx={{pt:"1.5rem"}}>Bank Central Asia</Typography>
                <Typography variant="h6"sx={{pt:"1.5rem", pb:"1.5rem"}}>2208 1996</Typography>
                <Typography variant="h6"sx={{pb:"1.5rem"}}>BuildWith Angga</Typography>
                </Box> 
              </Box>
              <Box sx={{display:"flex", justifyContent :"space-between", alignContent :"center"}}>
                <Box>
                  {/* <img src={bank2} alt="" className=""/>  */}
                </Box>
                <Box>
                <Typography variant="h6"sx={{pt:"1.5rem"}}>Bank Mandiri</Typography>
                <Typography variant="h6"sx={{pt:"1.5rem", pb:"1.5rem"}}>2208 1996</Typography>
                <Typography variant="body1"sx={{pb:"1.5rem"}}>BuildWith Angga</Typography>
                </Box> 
              </Box>
            </Box>
            <Box sx={{  pl: "2rem", pr: "2rem", mt: "1rem" }}>
             
            <TextField
                // {...register("password", {
                //   required: true,
                //   pattern:
                //     /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                // })}
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
            
          </Stack>
          <PaymentElement />
          <Button
                variant="contained"
                sx={{ pl: "2rem", pr: "2rem", mt: "1rem" }}
              >
                Continue to Book
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
  )
}

export default CheckoutForm
