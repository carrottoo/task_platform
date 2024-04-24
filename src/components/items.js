import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import TaskIcon from '@mui/icons-material/Task';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

export const mainListItems = (
    <React.Fragment>
        {/* <ListItem>
          <ListItemAvatar>
            <Avatar src={userImageUrl} sx={{ bgcolor: blue[100], color: blue[600] }}>
              {!userImageUrl && "U"} 
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={username} secondary="User Profile" />
        </ListItem> */}
      <ListItemButton>
        <ListItemIcon>
          <AccountBoxRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <GridViewIcon/>
        </ListItemIcon>
        <ListItemText primary="All Tasks" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Owned Tasks" />
      </ListItemButton>
    </React.Fragment>
  );

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <BookmarksIcon />
      </ListItemIcon>
      <ListItemText primary="Created Tags" />
    </ListItemButton>
  </React.Fragment>
);