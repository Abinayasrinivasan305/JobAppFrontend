import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { toast } from "react-toastify";
import api from "../services/api";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all jobs
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      console.log("Fetched jobs:", res.data);
      const jobs = Array.isArray(res.data)
        ? res.data
        : res.data.jobs || [];
      setPosts(jobs);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      toast.error("Failed to load job posts!");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle search
  const handleSearch = async () => {
    if (!keyword.trim()) return fetchPosts();
    setLoading(true);
    try {
      const res = await api.get(`/jobs/keyword/${keyword}`);
      const jobs = Array.isArray(res.data)
        ? res.data
        : res.data.jobs || [];
      setPosts(jobs);
    } catch (err) {
      console.error("Search failed:", err);
      toast.error("Search failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply button handler
  const handleApply = (jobTitle) => {
    toast.success(`Applied to ${jobTitle} successfully! 🎉`);
  };

  // ✅ Fetch jobs on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* 🔍 Search Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          placeholder="Search jobs..."
          fullWidth
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* 💼 Job Cards */}
      {loading ? (
        <Typography>Loading jobs...</Typography>
      ) : posts.length > 0 ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
          {posts.map((p) => (
            <Card
              key={p.postId}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(145deg, #e0f7fa, #ffffff)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Typography variant="h6">{p.postProfile}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {p.postDesc}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                {p.postTechStack?.map((tech, idx) => (
                  <Chip key={idx} label={tech} size="small" />
                ))}
              </Box>

              <Typography variant="body2">
                Experience: {p.reqExperience} years
              </Typography>

              {/* ✅ Simple Apply Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleApply(p.postProfile)}
              >
                Apply
              </Button>
            </Card>
          ))}
        </Masonry>
      ) : (
        <Typography>No jobs available.</Typography>
      )}
    </Box>
  );
};

export default Search;
