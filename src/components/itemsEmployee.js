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
import ListAltIcon from '@mui/icons-material/ListAlt';
import LabelIcon from '@mui/icons-material/Label';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };


  return(
    <React.Fragment>
      <Tooltip title='User Profile'>
      <ListItemButton onClick={handleNavigate('/employee/profile')}>
        <ListItemIcon>
          <AccountBoxRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title='All Tasks'>
      <ListItemButton onClick={handleNavigate('/employee/all_tasks')}>
        <ListItemIcon>
          <ListAltIcon/>
        </ListItemIcon>
        <ListItemText primary="All Tasks" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title="Assigned Tasks">
      <ListItemButton onClick={handleNavigate('/employee/assigned_tasks')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assigned Tasks" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title="Submitted Tasks">
      <ListItemButton onClick={handleNavigate('/employee/submitted_tasks')}>
        <ListItemIcon>
          <PublishedWithChangesIcon />
        </ListItemIcon>
        <ListItemText primary="Submitted Tasks" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title='Completed Tasks'>
      <ListItemButton onClick={handleNavigate('/employee/completed_tasks')}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Completed Tasks" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title="Liked Tasks">
      <ListItemButton onClick={handleNavigate('/employee/liked_tasks')}>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Liked Tasks" />
      </ListItemButton>
      </Tooltip>
    </React.Fragment>
  );
}

export const SecondaryListItems = () => {

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return(
    <React.Fragment>
      <Tooltip title="Created Tags">
      <ListItemButton onClick={handleNavigate('/employee/created_tags')}>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary="Created Property Tags" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title="Interested Tags">
      <ListItemButton onClick={handleNavigate('/employee/interested_tags')}>
        <ListItemIcon>
          <StarIcon/>
        </ListItemIcon>
        <ListItemText primary="Interestd Property Tags" />
      </ListItemButton>
      </Tooltip>
    </React.Fragment>
  );
}


