import React from "react";
import { TableCell } from "@mui/material";
import GeneralTaskComponent from "./generalTaskComponent";

// Tasks to review for employers and submitted tasks for employees

const headCells = [
  { id: "displayId", numeric: true, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Task Name" },
  { id: "assignee", numeric: false, disablePadding: false, label: "Assignee" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "submittedOn",
    numeric: false,
    disablePadding: false,
    label: "Submitted on",
  },
  {
    id: "createdOn",
    numeric: false,
    disablePadding: false,
    label: "Created on",
  },
];

const cellContents = (row, labelId, hideIdColumn) => (
  <>
    {!hideIdColumn && (
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="normal"
        align="center"
      >
        {row.displayId}
      </TableCell>
    )}
    <TableCell align="center" padding="normal">
      {row.name}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.assignee}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.status}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.submittedOn}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.createdOn}
    </TableCell>
  </>
);

export default function SubmittedTasks() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userID = storedData ? storedData.userID : null;
  const userProfile = storedData ? storedData.profile : null;

  let filterCriteria;
  let noContentMessage;
  let heading;
  let renderApprove;
  let selectable;

  if (userProfile === "employer") {
    filterCriteria = (task) =>
      task.assignee !== null &&
      task.is_submitted &&
      task.status === "In review";
    noContentMessage = "You have no tasks to review";
    heading = "Tasks to Review";
    renderApprove = true;
    selectable = true;
  } else {
    filterCriteria = (task) =>
      task.assignee === userID &&
      task.is_submitted &&
      task.status === "In review";
    noContentMessage = "You haven't submitted any tasks";
    heading = "Submitted Tasks";
    renderApprove = false;
    selectable = false;
  }

  return (
    <GeneralTaskComponent
      filterCriteria={filterCriteria}
      noContentMessage={noContentMessage}
      heading={heading}
      headCells={headCells}
      cellContents={cellContents}
      renderApprove={renderApprove}
      selectable={selectable}
    />
  );
}
