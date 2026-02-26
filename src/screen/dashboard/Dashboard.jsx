 // src/screen/dashboard/Dashboard.jsx
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { user_is_signin } from "../../config/LocalStorageMethods"; // now localStorage methods
import { Outlet, useNavigate } from "react-router-dom";

import "../../style/dashboard.css";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  React.useEffect(() => {
    user_is_signin()
      .then((user) => {
        if (user?.email === "admin@admin.com") {
          setIsAdmin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const commonRoutes = [
    { name: "Home", icons: "fa-solid fa-house-chimney", routeName: "/" },
    { name: "Dashboard", icons: "fa-solid fa-house-chimney", routeName: "/dashboard" },
  ];

   
  const adminCreateRoutes = [
    { name: "Create Quiz", routeName: "create-quiz", icons: "fa-solid fa-clipboard" },
    { name: "Create Course", routeName: "create-course", icons: "fa-solid fa-book" },
    { name: "Course Control", routeName: "student-registration-form-course-and-sec-control", icons: "fa-solid fa-gamepad" },
  ];

   
  const adminListRoutes = [
    { name: "Course List", routeName: "course-list", icons: "fa-solid fa-list-ul" },
    { name: "Student Registration List", routeName: "student-registration-list", icons: "fa-solid fa-list-ul" },
    { name: "Enrolled Student", routeName: "enrolled-student", icons: "fa-solid fa-user" },
  ];

  const userRoutes = [
    { name: "Detail", icons: "fa-solid fa-user", routeName: "user-profile" },
    
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {isAdmin ? "Welcome to Admin Panel" : "Welcome to User Profile"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {commonRoutes.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.routeName)}>
                <ListItemIcon>{item.icons && <i className={item.icons}></i>}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {isAdmin &&
            adminCreateRoutes.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(item.routeName)}>
                  <ListItemIcon>{item.icons && <i className={item.icons}></i>}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>

        <Divider />
         <List>
  {isAdmin
    ? adminListRoutes.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => navigate(item.routeName)}>
            <ListItemIcon>{item.icons && <i className={item.icons}></i>}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))
    : userRoutes.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => navigate(item.routeName)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
</List>

      </Drawer>

      <Box sx={{ padding: "5rem 0 0 2rem" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
