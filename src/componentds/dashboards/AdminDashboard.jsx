import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import api from "../../services/api";
import { decodeToken, getToken } from "../../utils/jwtUtils";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const loadJobs = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const userData = decodeToken(token);
      const adminEmail = userData?.sub;
      const res = await api.get("/jobs/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredJobs = res.data.filter((job) => job.createdBy === adminEmail);
      setJobs(filteredJobs);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };

  const deleteJob = async (id) => {
    const token = getToken();
    if (!token) return;
    try {
      await api.delete(`/jobs/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadJobs();
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const editJob = (id) => navigate("/edit", { state: { id } });

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <DashboardLayout>
      <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
        Admin Panel
      </Typography>

      <Button href="/create" variant="contained" sx={{ mb: 3 }}>
        Add Job
      </Button>

      <Table sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <TableRow key={job.postId}>
                <TableCell>{job.postId}</TableCell>
                <TableCell>{job.postProfile}</TableCell>
                <TableCell>{job.reqExperience}</TableCell>
                <TableCell>
                  <Button onClick={() => editJob(job.postId)}>Edit</Button>
                  <Button color="error" onClick={() => deleteJob(job.postId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No jobs found. Click "Add Job" to create your first job post.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}
