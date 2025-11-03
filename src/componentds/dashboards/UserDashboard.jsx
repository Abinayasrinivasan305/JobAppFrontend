import React from "react";
import { Typography, Box, Card, Chip } from "@mui/material";
import { useFavorites } from "../../context/FavoritesContext";
import DashboardLayout from "./DashboardLayout";

export default function UserDashboard() {
  const { userFavorites = [] } = useFavorites();

  return (
    <DashboardLayout>
      <Typography variant="h5" fontWeight="bold" color="primary">
        User Dashboard
      </Typography>
      <Typography sx={{ mt: 2, color: "text.secondary" }}>
        Your favorite jobs:
      </Typography>

      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 3 }}>
        {userFavorites.length > 0 ? (
          userFavorites.map((job) => (
            <Card
              key={job.postId}
              sx={{ p: 3, borderRadius: 3, minWidth: 250, background: "linear-gradient(145deg, #e0f7fa, #ffffff)" }}
            >
              <Typography variant="h6">{job.postProfile}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {job.postDesc}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {job.postTechStack?.map((tech, idx) => (
                  <Chip key={idx} label={tech} size="small" />
                ))}
              </Box>
              <Typography variant="body2">Experience: {job.reqExperience} years</Typography>
            </Card>
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No favorite jobs yet.</Typography>
        )}
      </Box>
    </DashboardLayout>
  );
}
