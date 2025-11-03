import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import api from "../../services/api";
import { decodeToken, getToken } from "../../utils/jwtUtils";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export default function SuperAdminDashboard() {
  const [tab, setTab] = useState("admins");
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tab === "admins") fetchAdmins();
    else if (tab === "users") fetchUsers();
    else if (tab === "jobs") fetchJobs();
  }, [tab]);

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/auth/admins");
      setAdmins(Array.isArray(res.data) ? res.data : []);
    } catch {
      setAdmins([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch {
      setUsers([]);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const userData = decodeToken(token);
      const superAdminEmail = userData?.sub;
      const res = await api.get("api/jobs/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredJobs = res.data.filter((job) => job.createdBy === superAdminEmail);
      setJobs(filteredJobs);
    } catch {
      setJobs([]);
    }
  };

  const deleteUser = async (id) => {
    await api.delete(`/auth/delete/${id}`);
    tab === "admins" ? fetchAdmins() : fetchUsers();
  };

  const deleteJob = async (id) => {
    const token = getToken();
    if (!token) return;
    await api.delete(`/jobs/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  const editJob = (id) => navigate("/edit", { state: { id } });

  return (
    <DashboardLayout>
      <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
        Super Admin Panel
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Button variant={tab === "admins" ? "contained" : "outlined"} onClick={() => setTab("admins")}>
          Admins
        </Button>
        <Button variant={tab === "users" ? "contained" : "outlined"} onClick={() => setTab("users")}>
          Users
        </Button>
        <Button variant={tab === "jobs" ? "contained" : "outlined"} onClick={() => setTab("jobs")}>
          Jobs
        </Button>
        <Button href="/create" variant="contained" color="success">
          Add Job
        </Button>
      </Box>

      <Table sx={{ backgroundColor: "white", borderRadius: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{tab === "jobs" ? "Profile" : "Email"}</TableCell>
            <TableCell>{tab === "jobs" ? "Experience" : "Role"}</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tab === "jobs"
            ? jobs.map((job) => (
                <TableRow key={job.postId}>
                  <TableCell>{job.postId}</TableCell>
                  <TableCell>{job.postProfile}</TableCell>
                  <TableCell>{job.reqExperience}</TableCell>
                  <TableCell>
                    <Button onClick={() => editJob(job.postId)}>Edit</Button>
                    <Button color="error" onClick={() => deleteJob(job.postId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            : (tab === "admins" ? admins : users).map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => deleteUser(u.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}
