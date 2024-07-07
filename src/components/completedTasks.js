import React from "react";
import {TableCell} from "@mui/material";
import GeneralTaskComponent from "./generalTaskComponent";

const headCells = [
    { id: 'displayId', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Task Name' },
    { id: 'assignee', numeric: false, disablePadding: false, label: 'Assignee'},
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'updatedOn', numeric: false, disablePadding: false, label: 'Updated on' },
    { id: 'createdOn', numeric: false, disablePadding: false, label: 'Created on' }
];

const cellContents = (row, labelId, hideIdColumn) => (
    <>
        {!hideIdColumn && (
            <TableCell component="th" id={labelId} scope="row" padding="normal" align="center">
                {row.displayId}
            </TableCell>
        )}
        <TableCell align="center" padding="normal">{row.name}</TableCell>
        <TableCell align="center" padding="normal">{row.assignee}</TableCell>
        <TableCell align="center" padding="normal">{row.status}</TableCell>
        <TableCell align="center" padding="normal">{row.updatedOn}</TableCell>
        <TableCell align="center" padding="normal">{row.createdOn}</TableCell>
    </>
);

export default function CompletedTasks(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const userProfile = storedData ? storedData.profile : null;
    const userID = storedData ? storedData.userID : null;

    let filterCriteria;
    let noContentMessage;
    let selectable;

    if (userProfile === 'employer'){
        filterCriteria = (task) => task.status === 'Done';
        noContentMessage = 'None of your tasks has been completed by other users';
        selectable=true;

    }else{
        filterCriteria = (task) => task.assignee === userID && task.status === 'Done';
        noContentMessage = "You haven't completed any task yet";
        selectable=false;
    }

    return (
        <GeneralTaskComponent 
            filterCriteria={filterCriteria}
            noContentMessage={noContentMessage}
            heading = 'Completed Tasks'
            headCells={headCells}
            cellContents={cellContents}
            selectable={selectable}
        />
    );
}