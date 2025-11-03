import React, { useEffect, useState } from "react";
import { Box, Card, Typography, TextField, Button, Chip, IconButton } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import api from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import { decodeToken } from "../utils/jwtUtils";

const Search = () => {
  const { userFavorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const token = localStorage.getItem('token');
  const userData = decodeToken(token);
  const role = userData?.role?.replace(/^ROLE_/, '');

  const fetchPosts = async () => {
    try {
      const res = await api.get("/jobs");
      setPosts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    if (!keyword.trim()) return fetchPosts();
    try {
      const res = await api.get(`/jobs/keyword/${keyword}`);
      setPosts(res.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleApply = (job) => {
    toast.success(`Applied to ${job.postProfile} successfully!`);
    // You can add your apply API logic here
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 4 }}>
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

      {/* Job Cards */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
        {posts.length > 0 ? (
          posts.map((p) => {
            const isFavorite = role === "USER" && userFavorites?.some((fav) => fav.postId === p.postId);

            return (
              <Card
                key={p.postId}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "linear-gradient(145deg, #e0f7fa, #ffffff)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  position: "relative",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
                }}
              >
                {/* Favorite button only for users */}
                {role === "USER" && (
                  <IconButton
                    onClick={() => toggleFavorite(p)}
                    sx={{ position: "absolute", top: 10, right: 10, color: isFavorite ? "red" : "grey" }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}

                <Typography variant="h6">{p.postProfile}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>{p.postDesc}</Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                  {p.postTechStack?.map((tech, idx) => (
                    <Chip key={idx} label={tech} size="small" />
                  ))}
                </Box>

                <Typography variant="body2">Experience: {p.reqExperience} years</Typography>

                {/* Apply button only for users */}
                {role === "USER" && (
                  <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => handleApply(p)}>
                    Apply
                  </Button>
                )}
              </Card>
            );
          })
        ) : (
          <Typography>No jobs available.</Typography>
        )}
      </Masonry>
    </Box>
  );
};

export default Search;
