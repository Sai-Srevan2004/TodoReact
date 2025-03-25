import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useMediaQuery, useTheme } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          {/* App Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            📝 To-Do App
          </Typography>

          {/* Mobile Menu Icon */}
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={Link} to="/add-task">Add Task</Button>
                  <Button color="inherit" component={Link} to="/all-tasks">All Tasks</Button>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/">Login</Button>
                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {isAuthenticated ? (
              <>
                <ListItem button component={Link} to="/add-task">
                  <ListItemText primary="Add Task" />
                </ListItem>
                <ListItem button component={Link} to="/all-tasks">
                  <ListItemText primary="All Tasks" />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/signup">
                  <ListItemText primary="Signup" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
