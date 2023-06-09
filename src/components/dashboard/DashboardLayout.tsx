import MenuIcon from "@mui/icons-material/Menu";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";

import logo from "../../assets/nodemarket.svg";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Roles } from "@/lib/withRole";
import { type } from "@/lib/withApproval";

const drawerWidth = 200;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface MenuItem {
  text: string;
  link: string;
  Icon: typeof SpaceDashboardIcon;
  condition?: () => boolean;
}

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const MENU_CONFIGURATION: MenuItem[] = [
    { text: "Overview", link: "/dashboard", Icon: SpaceDashboardIcon },
    {
      text: "Documentation",
      link: "/documentation",
      Icon: ArticleIcon,
      condition: () => user?.user_metadata.role === Roles.Promoter,
    },
    {
      text: "Admin",
      link: "/admin-approval",
      Icon: SupervisorAccountIcon,
      condition: () => user?.user_metadata.type === type.ad,
    },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 10000 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image src={logo} alt="NodeMarket Logo" />
            </Link>
          </Box>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {MENU_CONFIGURATION.map(({ text, link, Icon, condition }, index) =>
            !condition || condition() ? (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push(link)}
              >
                <ListItemButton
                  selected={router.pathname === link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ) : null
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
