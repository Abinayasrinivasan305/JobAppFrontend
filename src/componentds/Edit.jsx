import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Card, Chip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import api from '../services/api'


const Edit = () => {
const location = useLocation();
const navigate = useNavigate();
const { id } = location.state || {};


const [form, setForm] = useState({ postId: id, postProfile: "", postDesc: "", reqExperience: 0, postTechStack: [] });
const [skill, setSkill] = useState("");


useEffect(() => { if (id) fetchJob() }, [id]);
const fetchJob = async ()=>{ const res = await api.get(`api/jobs/${id}`); setForm(res.data); }


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
const handleAddSkill = () => { if (skill.trim() && !form.postTechStack.includes(skill)) { setForm({ ...form, postTechStack: [...form.postTechStack, skill] }); setSkill(""); } };
const handleRemoveSkill = (s) => { setForm({ ...form, postTechStack: form.postTechStack.filter((sk) => sk !== s) }); };


const handleSubmit = async (e) => { e.preventDefault(); await api.put(`/jobs/admin/${form.postId}`, form); navigate('/'); };


return (
<Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #e3f2fd, #bbdefb)", p: 2 }}>
<Card sx={{ p: 4, maxWidth: 600, width: "100%", borderRadius: 3, boxShadow: 4 }}>
<Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>Edit Job</Typography>
<form onSubmit={handleSubmit}>
<TextField label="Job Profile" name="postProfile" fullWidth sx={{ mb: 2 }} value={form.postProfile} onChange={handleChange} />
<TextField label="Description" name="postDesc" fullWidth multiline rows={3} sx={{ mb: 2 }} value={form.postDesc} onChange={handleChange} />
<TextField label="Experience (Years)" name="reqExperience" type="number" fullWidth sx={{ mb: 2 }} value={form.reqExperience} onChange={handleChange} />
<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
<TextField label="Add Skill" value={skill} onChange={(e) => setSkill(e.target.value)} fullWidth />
<Button variant="contained" onClick={handleAddSkill}>Add</Button>
</Box>
<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>{form.postTechStack.map((s, i) => (<Chip key={i} label={s} onDelete={() => handleRemoveSkill(s)} color="primary" variant="outlined" />))}</Box>
<Button type="submit" variant="contained" fullWidth sx={{ py: 1.2 }}>Update Job</Button>
</form>
</Card>
</Box>
);
};


export default Edit;