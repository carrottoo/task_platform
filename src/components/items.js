import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import TaskIcon from '@mui/icons-material/Task';
import LabelIcon from '@mui/icons-material/Label';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PendingIcon from '@mui/icons-material/Pending';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export const MainListItems = () => {
  
  return(
    <React.Fragment>
        {/* <ListItem>
          <ListItemAvatar>
            <Avatar src={userImageUrl} sx={{ bgcolor: blue[100], color: blue[600] }}>
              {!userImageUrl && "U"} 
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={username} secondary="User Profile" />
        </ListItem> */}
      <Tooltip title="User Profile">
      <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBoxRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Created Tasks">
      <Link to="/employer/created_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon/>
        </ListItemIcon>
        <ListItemText primary="Created Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Assigned Tasks" > 
      <Link to="/employer/assigned_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Assigned Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Unassigned Tasks">
      <Link to="/employer/unassigned_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <PendingIcon />
        </ListItemIcon>
        <ListItemText primary="Unassigned Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Tasks to Review">
      <Link to="/employer/tasks_to_review" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <RateReviewIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks to Review" />
      </ListItemButton>
      </Link>
      </Tooltip>
    </React.Fragment>
  );
}


export const SecondaryListItems = () => {
  
  return(
    <React.Fragment>
      <Tooltip title="Created Tags" >
      <Link to="/created_property_tags" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary="Created Property Tags" />
      </ListItemButton>
      </Link>
      </Tooltip>
    </React.Fragment>
  );
}
