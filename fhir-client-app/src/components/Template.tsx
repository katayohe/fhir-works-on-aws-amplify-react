import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import PersonIcon from '@mui/icons-material/Person';
import BiotechIcon from '@mui/icons-material/Biotech';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import { NavLink } from 'react-router-dom';
import * as colors from "@mui/material/colors";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export interface GenericTemplateProps {
  children: React.ReactNode;
  title: string;
}

// export default function PageTemplate() {
const PageTemplate: React.FC<GenericTemplateProps> = ({
  children,
  title,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [drawerPatientState, changeDrawerPatientState] = React.useState(false);
  const [drawerLabState, changeDrawerLabState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const drawerPatientStateClick = () => {
    changeDrawerPatientState(!drawerPatientState);
  };
  
  const drawerLabStateClick = () => {
    changeDrawerLabState(!drawerLabState);
  };
  
  const current = (isActive:boolean) => {
    return({
      color: isActive ? colors.blue[800] : 'black', 
      textDecoration: 'none',
      background: isActive ? colors.grey[100] : '', 
      width: '100%',
      display: 'inline-block',
      })
  };
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            FHIR client
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavLink to="/" style={({isActive}) => (current(isActive))}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashbord" />
            </ListItemButton>
          </NavLink>
          
          <ListItemButton onClick={drawerPatientStateClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Patient" />
            {drawerPatientState ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={drawerPatientState} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="/patient" style={({isActive}) => (current(isActive))}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="List patients" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/patient/add" style={({isActive}) => (current(isActive))}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add patient" />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>

          <ListItemButton onClick={drawerLabStateClick}>
            <ListItemIcon>
              <BiotechIcon />
            </ListItemIcon>
            <ListItemText primary="Lab" />
            {drawerLabState ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={drawerLabState} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="/lab" style={({isActive}) => (current(isActive))}>
                <ListItemButton  sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="List labs" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/lab/create" style={({isActive}) => (current(isActive))}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add lab" />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
        </List>
      
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          {title}
        </Typography>
          {children}
      </Main>

    </Box>
  );
};

export default PageTemplate