import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SavedLocations from './pages/SavedLocations';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DetailsPage from './pages/DetailsPage';
import { SearchProvider } from './context/SearchContext';

const drawerWidth = 240;

function App() {
  // Hook para obtener la ubicación actual en la que estamos
  const location = useLocation();

  // Función para determinar si una ruta es la actual
  const isActive = (path) => location.pathname === path;

  // Lista de enlaces de navegación
  const menuItems = [
    { text: 'Home', icon: <DashboardIcon />, path: '/' },
    { text: 'Saved Locations', icon: <FavoriteIcon />, path: '/saved-locations' }
  ];


  return (
    <Box sx={{ 
      display: 'flex', 
      width: '98vw'
      }}>
      {/* Menú lateral */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Is Cloudy
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={isActive(item.path)} // Estado activo
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3
        }}
      >
        <Toolbar />
        <SearchProvider> {/* Envolvemos la aplicación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-locations" element={<SavedLocations />} />
          <Route path="/details/:city" element={<DetailsPage />} />
        </Routes>
        </SearchProvider>
      </Box>
    </Box>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
