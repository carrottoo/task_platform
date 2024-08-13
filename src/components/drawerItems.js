import * as React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LabelIcon from "@mui/icons-material/Label";
import HistoryIcon from "@mui/icons-material/History";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PendingIcon from "@mui/icons-material/Pending";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import StarIcon from "@mui/icons-material/Star";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export const MainListItems = () => {
  return (
    <>
      <Tooltip title="User Profile">
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Created Tasks">
        <Link
          to="/all_created_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Created Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Assigned Tasks">
        <Link
          to="/assigned_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Assigned Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Unassigned Tasks">
        <Link
          to="/unassigned_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PendingIcon />
            </ListItemIcon>
            <ListItemText primary="Unassigned Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Tasks to Review">
        <Link
          to="/submitted_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks to Review" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Approved tasks">
        <Link
          to="/approved_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks Approved" />
          </ListItemButton>
        </Link>
      </Tooltip>
    </>
  );
};

export const SecondaryListItems = () => {
  return (
    <>
      <Tooltip title="Created Tags">
        <Link
          to="/created_property_tags"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Created Property Tags" />
          </ListItemButton>
        </Link>
      </Tooltip>
    </>
  );
};

export const MainListItemsEmployee = () => {
  return (
    <>
      <Tooltip title="User Profile">
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="All Tasks">
        <Link
          to="/all_created_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="All Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Assigned Tasks">
        <Link
          to="/assigned_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Assigned Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Submitted Tasks">
        <Link
          to="/submitted_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PublishedWithChangesIcon />
            </ListItemIcon>
            <ListItemText primary="Submitted Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Completed Tasks">
        <Link
          to="/completed_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Completed Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Liked Tasks">
        <Link
          to="/liked_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Liked Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Disliked Tasks">
        <Link
          to="/disliked_tasks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ThumbDownIcon />
            </ListItemIcon>
            <ListItemText primary="Disliked Tasks" />
          </ListItemButton>
        </Link>
      </Tooltip>
    </>
  );
};

export const SecondaryListItemsEmployee = () => {
  return (
    <>
      <Tooltip title="All Tags">
        <Link
          to="/created_property_tags"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Created Property Tags" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Interested Tags">
        <Link
          to="/interested_property_tags"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Interestd Property Tags" />
          </ListItemButton>
        </Link>
      </Tooltip>
      <Tooltip title="Uninterested Tags">
        <Link
          to="/uninterested_property_tags"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <NotInterestedIcon />
            </ListItemIcon>
            <ListItemText primary="Uninterestd Property Tags" />
          </ListItemButton>
        </Link>
      </Tooltip>
    </>
  );
};
