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
    <TableCell align="center" padding="normal">
      {row.name}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.description}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.status}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.updatedOn}
    </TableCell>
    <TableCell align="center" padding="normal">
      {row.createdOn}
    </TableCell>
  </>
);

export default function AllTasks() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const userProfile = storedData ? storedData.profile : null;

  const noContentMessage = "No task has been created";
  let heading;
  let renderAssign;
  let renderUnassign;
  let renderLike;
  let renderDislike;
  let renderSetProperty;
  let selectable;
  let fetchProperties;

  if (userProfile === "employer") {
    heading = "Created Tasks";
    renderAssign = false;
    renderUnassign = false;
    renderLike = false;
    renderDislike = false;
    renderSetProperty = true;
    selectable = true;
    fetchProperties = true;
  } else {
    heading = "All Available Tasks";
    renderAssign = true;
    renderUnassign = true;
    renderLike = true;
    renderDislike = true;
    renderSetProperty = false;
    selectable = false;
    fetchProperties = false;
  }

  return (
    <GeneralTaskComponent
      noContentMessage={noContentMessage}
      heading={heading}
      headCells={headCells}
      cellContents={cellContents}
      renderAssign={renderAssign}
      renderUnassign={renderUnassign}
      renderLike={renderLike}
      renderDislike={renderDislike}
      renderSetProperty={renderSetProperty}
      selectable={selectable}
      filter={false}
      fetchProperties={fetchProperties}
    />
  );
}
