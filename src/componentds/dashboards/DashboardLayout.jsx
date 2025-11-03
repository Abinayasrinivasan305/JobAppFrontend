import React from "react";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom right, #e0f7fa, #b3e5fc)", // light sky blue gradient
        p: { xs: 2, md: 4 },
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
}
