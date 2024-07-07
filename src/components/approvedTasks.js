import React from "react";
import {TableCell} from "@mui/material";
import GeneralTaskComponent from "./generalTaskComponent";

const headCells = [
    { id: 'displayId', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Task Name' },
    { id: 'assignee', numeric: false, disablePadding: false, label: 'Assignee'},
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'submittedOn', numeric: false, disablePadding: false, label: 'Submitted On' },
    { id: 'approvedOn', numeric: false, disablePadding: false, label: 'Approved on' },
    { id: 'createdOn', numeric: false, disablePadding: false, label: 'Created on' },
];

const cellContents = (row, labelId, hideIdColumn) => (
    <>
        {!hideIdColumn && (
            <TableCell component="th" id={labelId} scope="row" padding="normal">
                {row.displayId}
            </TableCell>
        )}
        <TableCell padding="normal">{row.name}</TableCell>
        <TableCell padding="normal">{row.assignee}</TableCell>
        <TableCell padding="normal">{row.status}</TableCell>
        <TableCell padding="normal">{row.submittedOn}</TableCell>
        <TableCell padding="normal">{row.approvedOn}</TableCell>
        <TableCell padding="normal">{row.createdOn}</TableCell>
    </>
);

export default function ApprovedTasks() {

    const filterCriteria = (task) => task.assignee !== null && task.is_approved && task.status === 'Done';
  
    return (
        <GeneralTaskComponent
            filterCriteria={filterCriteria}
            noContentMessage={"You haven't approved any tasks yet"}
            heading={'Approved Tasks'}
            headCells={headCells}
            cellContents={cellContents}
        />
    );
};