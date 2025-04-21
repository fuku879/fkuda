import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import React, { CSSProperties } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddHomeIcon from "@mui/icons-material/AddHome";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { NavLink } from "react-router-dom";

interface SideBarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    handleDrawerTransitionEnd: () => void;
    handleDrawerClose: () => void;
}

interface menuItem {
    text: string;
    path: string;
    icon: React.ComponentType;
}

const SideBar = ({
    drawerWidth,
    mobileOpen,
    handleDrawerTransitionEnd,
    handleDrawerClose,
}: SideBarProps) => {
    const MenuItems: menuItem[] = [
        { text: "Home", path: "/", icon: AddHomeIcon },
        { text: "Report", path: "/report", icon: EqualizerIcon },
    ];

    const baseLinkStyle: CSSProperties = {
        textDecoration: "none",
        color: "inherit",
        display: "block",
    };

    const activeLinkStyle: CSSProperties = {
        backgroundColor: "rgba(0,0,0,0.08)",
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {MenuItems.map((item, index) => (
                    <NavLink
                        key={item.text}
                        to={item.path}
                        style={({ isActive }) => {
                            console.log(
                                "what you selected is ?",
                                item.text,
                                isActive
                            );
                            return {
                                ...baseLinkStyle,
                                ...(isActive ? activeLinkStyle : {}),
                            };
                        }}
                    >
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )} */}
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
            </List>
            <Divider />
            {/* <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
        >
            {/*for mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            {/*for PC */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default SideBar;
