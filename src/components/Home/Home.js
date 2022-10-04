import { useContext, useEffect, useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import MenuIcon from "@mui/icons-material/Menu"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TopicIcon from '@mui/icons-material/Topic';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MembersTable from "./MembersTable";
import PondInsurance from "./PondInsurance";
import Rules from "./Rules";
import Statements from "./Statements";
import { UserContext } from "../UserContext/UserContext";
import { useJwt } from "react-jwt";
import { Navigate, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    color: "deeppink",
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Home = () => {
  const navigate = useNavigate()
  const token = useContext(UserContext)
  const { decodedToken } = useJwt(token)
  const [user, setUser] = useState(null);
  const [width, setWidth] = useState(window.innerWidth)
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [active, setActive] = useState("");

  const handleSignOut = () => {
    setUser(null)
    navigate('/')
  }
  useEffect(() => {
    if (token) {
      setUser(decodedToken)
    }
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    }
      window.addEventListener("resize", handleWindowResize);
    
    return () => window.removeEventListener("resize", handleWindowResize);
  },[token,decodedToken])

  if (!token) {
    return <Navigate to="/" replace />
  }

  const handleActive = (title) => {
    width < 800 && setOpen(false)
    switch (title) {
      case "Members":
        setActive(<MembersTable />)
        break;
      case "Pond Insurance":
        setActive(<PondInsurance />)
        break;
      case "Monthly Statements":
        setActive(<Statements />)
        break;
      case "Rules & Regulations":
        setActive(<Rules />)
        break;
      default:
        handleSignOut()
        break;
    }
  }
// #00897b
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: "#2d5986" }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, ...(open && { display: 'none' })}}>
                        <MenuIcon />
                    </IconButton>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" noWrap component="div">
                            {user && <>Welcome {user.name}</>}
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{...(width > 800 ? { display: "" } : open ? { display: "" } : {display: "none" } ) }}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {[{ title: "Members", icon: <GroupIcon /> }, { title: "Pond Insurance", icon: <TopicIcon /> }, { title: "Monthly Statements", icon: <AccountBalanceIcon /> }, { title: "Rules & Regulations", icon: <RuleFolderIcon /> }, { title: "Sign Out", icon: <LogoutIcon />, display: true }].map((text, index) => (
                    <ListItem key={text.title} disablePadding sx={{ display: 'block' }} onClick={() => handleActive(text.title)}>
                      <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                          {text.icon}
                        </ListItemIcon>
                        <ListItemText primary={text.title} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
              {active}
            </Box>
        </Box>
    )
}

export default Home
// ability to vote on shit
// group email