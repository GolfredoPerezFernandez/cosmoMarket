import { FC, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NewStory from "./pages/NewStory";
import Dashboard from "./pages/Blog";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi'
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from "@mui/icons-material/Dashboard";
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from "@mui/material/Tooltip";
import MediumLogo from "./assets/logo.svg";
import Home from "./pages/Home";
import HomeIcon from '@mui/icons-material/Home';
import { TypeAnimation } from 'react-type-animation';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
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

const App: FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { signMessageAsync } = useSignMessage();
  const { isConnected } = useAccount({
    onConnect: async ({ address, isReconnected }) => {
      if (address && !isReconnected) {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/requestAuth`,
          { address }
          , {
            headers: {
              'content-type': 'application/json',
            },
          });

        const message = data?.message;

        const signature = await signMessageAsync({ message });

        await axios.post(`${process.env.REACT_APP_BACKEND}/verifyAuth`,
          { message, signature }
          , {
            headers: {
              'content-type': 'application/json',
            },
          });

      }
    }
  });

  /**
   * @description Handle opening and closing Drawer (Sidebar) component
   */
  const handleDrawerOpen = () => {
    setOpen((o) => !o);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} elevation={1}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 3 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <img src={"https://bafybeieiaoiw2qfi66l2d3gokba32jsyvcfi3nwnlalnli6jjmdyhzmdma.ipfs.w3s.link/Group%202.png"} alt="logo" width="40px" height="auto" />
            <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
              Golfredo FullStack Developer. 
            </Typography>
            
            <Box sx={{ display: 'flex',marginLeft:'20%',flexDirection:'row' }}>
            <Typography noWrap  sx={{marginLeft:100, ml: 1 ,fontSize: '1em'}}>
            Tecnologies Involved:
            </Typography>
<TypeAnimation
      sequence={['ReactJs.', 
      3000, 
        'React Native', 
        3000, 
        'NextJs', 
        3000, 
        'Expo Cli.', 
        3000,
        'Material UI',
        3000,
        'Chackra UI',
        3000,
        'Solidity', 
        3000, 
        'Truffle', 
        3000, 
        'HardHat', 
        3000, 
        'Moralis Web3',
        3000,
        'Firebase',
        3000,
        'Docker',
        3000,
        'Node & Express',
        3000,
        'GraphQL',
        3000,
        'Figma',
        3000,
        'Blender',
        3000, 
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '1em',width:"150px",fontWeight:100,color:'black',textAlign:'center' }}
     />
</Box>
            <Box sx={{ flexGrow: 1 }} />
            <ConnectButton />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <Divider />
          <List>
            {[         
               { title: "Welcome", icon: HomeIcon, link: "/" },
              { title: "Blog", icon: DashboardIcon, link: "/blog" },   

              (isConnected && { title: "New Story", icon: EditIcon, link: "/write" })
              // @ts-ignore
            ].filter(Boolean).map(({ title, icon: Icon, link }) => {
              return (
                <Tooltip title={title} key={title} placement="right">
                  <ListItem key={title} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      onClick={() => pathname !== link && navigate(link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon
                          color={pathname === link ? "secondary" : "inherit"}
                        />
                      </ListItemIcon>
                      <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              )
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 7 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Dashboard />} />
            {isConnected && <Route path="/write" element={<NewStory />} />}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;
