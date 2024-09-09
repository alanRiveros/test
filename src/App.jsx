import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SavedLocations from './pages/SavedLocations';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, IconButton, Menu, MenuItem, AppBar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import DetailsPage from './pages/DetailsPage';
import { SearchProvider } from './context/SearchContext';
import { useBreakpoint } from './context/BreakpointContext'; // Importar el contexto

const drawerWidth = 240;

function App() {
  // Hook para obtener la ubicación actual en la que estamos
  const location = useLocation();
  const { isSmallScreen } = useBreakpoint(); // Usar el BreakpointContext para detectar pantallas pequeñas
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // Estado para el menú hamburguesa

  // Función para determinar si una ruta es la actual
  const isActive = (path) => location.pathname === path;

  // Lista de enlaces de navegación
  const menuItems = [
    { text: 'Home', icon: <DashboardIcon />, path: '/' },
    { text: 'Favoritos', icon: <FavoriteIcon />, path: '/saved-locations' }
  ];

  // Abrir el menú hamburguesa
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Cerrar el menú hamburguesa
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', width: '98vw' }}>
      {/* Si es pantalla grande, mostrar Drawer permanente */}
      {!isSmallScreen && (
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
      )}

      {/* Si es pantalla pequeña, mostrar AppBar con menú hamburguesa */}
      {isSmallScreen && (
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Is Cloudy
            </Typography>
          </Toolbar>
          {/* Menú hamburguesa */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.text}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItem>
            ))}
          </Menu>
        </AppBar>
      )}

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          mt: isSmallScreen ? 8 : 0 // Añadir margen superior si es pantalla pequeña
        }}
      >
        <SearchProvider>
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
