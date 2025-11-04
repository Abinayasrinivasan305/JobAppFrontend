// src/components/jobs/Create.jsx
import React, { useState } from "react";
import { Typography, TextField, Button, Paper, Box, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { decodeToken } from "../utils/jwtUtils";

const initial = { postProfile: "", reqExperience: 0, postTechStack: [], postDesc: "" };

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !form.postTechStack.includes(newSkill)) {
      setForm({ ...form, postTechStack: [...form.postTechStack, newSkill] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({ ...form, postTechStack: form.postTechStack.filter((s) => s !== skill) });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    const decoded = decodeToken(token);
    const jobData = { ...form, createdBy: decoded.sub };

    await api.post("/jobs/admin/add", jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/dashboard/admin"); // go back to admin dashboard
  } catch (err) {
    console.error("Error creating job post:", err);
    alert(err.response?.data?.message || "Error creating job post");
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        p: 2,
      }}
    >
      <Paper sx={{ padding: "2%", maxWidth: "700px", margin: "2% auto" }} elevation={3}>
        <Typography align="center" variant="h5" sx={{ fontWeight: "bold", marginBottom: "2%" }}>
          Create New Job Post
        </Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Job Profile"
              variant="outlined"
              required
              value={form.postProfile}
              onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
              fullWidth
            />
            <TextField
              type="number"
              label="Years of Experience"
              variant="outlined"
              required
              value={form.reqExperience}
              onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
              fullWidth
            />
            <TextField
              label="Job Description"
              variant="outlined"
              required
              multiline
              rows={4}
              value={form.postDesc}
              onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
              fullWidth
            />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Required Skills
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Add Skill"
                variant="outlined"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleAddSkill} sx={{ whiteSpace: "nowrap" }}>
                Add Skill
              </Button>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {form.postTechStack.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>

            <Button variant="contained" type="submit" size="large" sx={{ marginTop: 2 }}>
              Submit Job
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Create;
