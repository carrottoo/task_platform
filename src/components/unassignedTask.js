import React from "react";
import { TableCell } from "@mui/material";
import GeneralTaskComponent from "./generalTaskComponent";

const headCells = [
  { id: "displayId", numeric: true, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Task Name" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "updatedOn",
    numeric: false,
    disablePadding: false,
    label: "Updated on",
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
      <TableCell component="th" id={labelId} scope="row" padding="normal">
        {row.displayId}
      </TableCell>
    )}
    <TableCell padding="normal">{row.name}</TableCell>
    <TableCell padding="normal">{row.description}</TableCell>
    <TableCell padding="normal">{row.status}</TableCell>
    <TableCell padding="normal">{row.updatedOn}</TableCell>
    <TableCell padding="normal">{row.createdOn}</TableCell>
  </>
);

export default function UnassignedTasks() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userProfile = storedData ? storedData.profile : null;

  const filterCriteria = (task) =>
    task.assignee === null && task.status === "Not started";
  let noContentMessage;
  let renderAssign;
  let selectable;

  if (userProfile === "employer") {
    noContentMessage = "All of your tasks has been taken by other users";
    renderAssign = false;
    selectable = true;
  } else {
    noContentMessage = "All tasks have been assigened";
    renderAssign = true;
    selectable = false;
  }

  return (
    <GeneralTaskComponent
      filterCriteria={filterCriteria}
      noContentMessage={noContentMessage}
      heading="Unassigned Tasks"
      headCells={headCells}
      cellContents={cellContents}
      renderAssign={renderAssign}
      selectable={selectable}
    />
  );
}
