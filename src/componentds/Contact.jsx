import React from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e0f7fa, #b3e5fc)",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "600px",
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.8)", // glass effect
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#004d40", mb: 2 }}
        >
          Contact Us
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Have questions, feedback, or need support? Fill out the form below and we’ll get back to you soon.
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField label="Full Name" variant="outlined" fullWidth required />
          <TextField label="Email Address" variant="outlined" fullWidth required />
          <TextField label="Subject" variant="outlined" fullWidth />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              background: "linear-gradient(135deg, #e0f7fa, #80deea)",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(135deg, #b3e5fc, #4fc3f7)",
              },
            }}
          >
            Send Message
          </Button>
        </Box>

        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            You can also reach us at:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            support@jobportal.com
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            +91 98765 43210
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Contact;
