import React, { useState, useEffect } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid, Card, CardContent, CardMedia, Button, useTheme, useMediaQuery, CircularProgress, Alert, Badge, Snackbar } from '@mui/material';
import { Menu, ShoppingCart, Home, AccountCircle, Book } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const drawerWidth = 220;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addToCart, getCartItemsCount } = useCart();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAllBooks({ page: 1, limit: 6 });
      setBooks(response.data.books);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 600, color: 'primary.main' }}>
         Menu
      </Typography>
      <List>
        {[
          { text: 'Home', icon: <Home />, path: '/dashboard' },
          { text: 'Books', icon: <Book />, path: '/books' },
          { text: 'Cart', icon: <ShoppingCart />, path: '/cart' },
          { text: 'Account', icon: <AccountCircle />, path: '/account' }
        ].map(({ text, icon, path }) => (
          <ListItem 
            button 
            key={text} 
            onClick={() => navigate(path)}
            sx={{
              mb: 0.5,
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{
            mt: 2,
            mx: 1,
            borderRadius: 1,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'error.dark',
            }
          }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            UnangPahina 
          </Typography>          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={getCartItemsCount()} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/account')}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: 'white',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '2px 0 4px rgba(0, 0, 0, 0.02)'
            },
          }}
        >
          <Toolbar /> {/* Add spacing for AppBar */}
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: { xs: 8, sm: 8 },
          backgroundColor: '#f8fafc'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              mb: 3
            }}
          >
            Available Books
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {books.length > 0 ? (
                books.map((book) => (
                  <Grid item xs={12} sm={6} md={4} key={book._id}>
                    <Card 
                      elevation={0}
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                          borderColor: 'transparent'
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="260"
                        image={book.imageUrl}
                        alt={book.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            mb: 1 
                          }}
                        >
                          {book.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mb: 1 }}
                        >
                          {book.author}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {book.description}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          color="primary" 
                          sx={{ 
                            mb: 2,
                            fontWeight: 600 
                          }}
                        >
                          ₱{book.price.toFixed(2)}
                        </Typography>                        <Button 
                          variant="contained" 
                          fullWidth 
                          startIcon={<ShoppingCart />}
                          disabled={book.stock === 0}
                          onClick={() => {
                            addToCart(book);
                            setSnackbarOpen(true);
                          }}
                          sx={{ 
                            mt: 'auto',
                            py: 1,
                            textTransform: 'none',
                            borderRadius: 1.5,
                            fontWeight: 500,
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            }
                          }}
                        >
                          {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      py: 8,
                      px: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      No books available at the moment
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Item added to cart"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Dashboard;
