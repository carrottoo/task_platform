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

export default function DislikedTasks(){

  
    const filterCriteria = (user_behavior) => user_behavior.is_like === false;
    const noContentMessage = 'You have not disliked any task';

    return (
        <GeneralTaskComponent 
            filterCriteria={filterCriteria}
            noContentMessage={noContentMessage}
            heading = 'Like Tasks'
            headCells={headCells}
            cellContents={cellContents}
            selectable={false}
            isUserBehavior={true}
        />
    );
}