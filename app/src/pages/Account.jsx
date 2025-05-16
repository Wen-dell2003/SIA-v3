import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Avatar,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';

const Account = () => {
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: 'user@example.com', // Replace with actual auth data
    name: 'User Name',
    phone: '',
    address: '',
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEdit = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...userData });
  };

  const handleSave = async () => {
    try {
      // TODO: Connect to your backend to update user data
      setUserData({ ...tempData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Account Settings
      </Typography>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" mb={3}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.primary.main,
                fontSize: '2.5rem',
              }}
            >
              {userData.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {userData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since April 2025
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Profile Information
            </Typography>
            {!isEditing ? (
              <IconButton onClick={handleEdit} color="primary" size="large">
                <Edit />
              </IconButton>
            ) : (
              <Box>
                <IconButton onClick={handleSave} color="primary" sx={{ mr: 1 }}>
                  <Save />
                </IconButton>
                <IconButton onClick={handleCancel} color="error">
                  <Cancel />
                </IconButton>
              </Box>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={isEditing ? tempData.name : userData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                variant="outlined"
                value={userData.email}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                variant="outlined"
                value={isEditing ? tempData.phone : userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
                multiline
                rows={3}
                value={isEditing ? tempData.address : userData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Account Security
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="medium"
            >
              Delete Account
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Account;
