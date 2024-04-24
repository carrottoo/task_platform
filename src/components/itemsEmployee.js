import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

export const mainListItems = (
    <React.Fragment>
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
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assigned Tasks" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Completed Tasks" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Liked Tasks" />
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
      <ListItemButton>
        <ListItemIcon>
          <TagFacesIcon/>
        </ListItemIcon>
        <ListItemText primary="Interestd Tags" />
      </ListItemButton>
    </React.Fragment>
  );


