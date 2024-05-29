import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PendingIcon from '@mui/icons-material/Pending';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Tooltip from '@mui/material/Tooltip';
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
      <Link to="/all_created_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon/>
        </ListItemIcon>
        <ListItemText primary="Created Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Assigned Tasks" > 
      <Link to="/assigned_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Assigned Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Unassigned Tasks">
      <Link to="/unassigned_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
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
      <Tooltip title="Approved tasks">
      <Link to="/employer/approved_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <HistoryIcon />
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
