import * as React from "react";
import { Container, Grid, Box,ScopedCssBaseline } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Typography, List, ListItem } from "@mui/material";
import Link from "@mui/material/Link";

const Footer = () => {
  const footerSections = [
    {
      title: "For Beginners",
      links: [
        { text: "New Account" },
        { text: "Start Booking a Room" },
        { text: "Use Payments" },
      ],
    },
    {
      title: "Explore Us",
      links: [
        { text: "Our Careers" },
        { text: "Privacy" },
        { text: "Terms & Conditions" },
      ],
    },
    {
      title: "Connect Us",
      contactInfo: [
        { text: "support@staycation.id" },
        { text: "021 - 2208 - 1996" },
        { text: "Staycation, Jakarta" },
      ],
    },
  ];

  return (
    <ScopedCssBaseline  sx={{ backgroundColor: "#f5f5f5" }}>
    <Container component="footer">
      <Grid
        container
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pl: 8,
        }}
      >
        {/* /* /** */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            // gutterBottom
            href="#app-bar-with-responsive-menu"
            sx={{ textDecoration: "none",
            fontSize: "2rem" }}
          >
            <Box component="span" sx={{ color: "#007BFF", fontWeight: "bold" }}>
              Stay
            </Box>
            <Box component="span" sx={{ color: "black", fontWeight: "bold" }}>
              cation.
            </Box>
          </Typography>
          <Typography sx={{ pt: 3, maxWidth: "200px" }}>
            We kaboom your beauty holiday instantly and memorable.
          </Typography>
        </Grid>
        {/* /* /** */}
        {footerSections.map((section, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="p"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              {section.title}
            </Typography>
            {section.links && (
              <List>
                {section.links.map((link, linkIndex) => (
                  <ListItem
                    key={linkIndex}
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    {link.text}
                  </ListItem>
                ))}
              </List>
            )}
            {section.contactInfo && (
              <List>
                {section.contactInfo.map((info, infoIndex) => (
                  <ListItem
                    key={infoIndex}
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    {info.text}
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
    </ScopedCssBaseline>
  );
};

export default Footer;
