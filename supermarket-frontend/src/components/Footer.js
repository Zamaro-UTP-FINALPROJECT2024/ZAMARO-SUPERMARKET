import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 2,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Supermercado. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
