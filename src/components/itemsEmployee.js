import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LabelIcon from '@mui/icons-material/Label';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const MainListItems = () => {

  return(
    <React.Fragment>
      <Tooltip title='User Profile'> 
      <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBoxRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title='All Tasks'>
      <Link to="/all_created_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon/>
        </ListItemIcon>
        <ListItemText primary="All Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Assigned Tasks"> 
      <Link to="/assigned_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Assigned Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Submitted Tasks">
      <Link to="/employee/submitted_tasks" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
      <ListItemButton>
        <ListItemIcon>
          <PublishedWithChangesIcon />
        </ListItemIcon>
        <ListItemText primary="Submitted Tasks" />
      </ListItemButton>
      </Tooltip>
      <Tooltip title='Completed Tasks'>
      <Link to="/employee/completed_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Completed Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Liked Tasks">
      <Link to="/employee/liked_tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Liked Tasks" />
      </ListItemButton>
      </Link>
      </Tooltip>
    </React.Fragment>
  );
}

export const SecondaryListItems = () => {

  return(
    <React.Fragment>
      <Tooltip title="Created Tags">
      <Link to="/created_property_tags" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary="Created Property Tags" />
      </ListItemButton>
      </Link>
      </Tooltip>
      <Tooltip title="Interested Tags">
      <Link to="/interested_tags" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <StarIcon/>
        </ListItemIcon>
        <ListItemText primary="Interestd Property Tags" />
      </ListItemButton>
      </Link>
      </Tooltip>
    </React.Fragment>
  );
}


