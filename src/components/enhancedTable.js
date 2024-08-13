import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip, TextField, Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { getComparator, stableSort } from './comparator';

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, 
        headCells, hideIdColumn, selectable, hasActions } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {selectable && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all rows',
                            }}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    (!hideIdColumn || headCell.id !== 'displayId') && (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {headCell.label}
                        </Typography>
                        {orderBy === headCell.id && (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        )}
                    </TableSortLabel>
                </TableCell>
                )))}
                {hasActions && (
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                        Actions
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props) {
    const { numSelected, selected, heading, filterText, onFilterTextChange, onClearSort, handleDelete } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {heading}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(selected)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <TextField
                        value={filterText}
                        onChange={onFilterTextChange}
                        placeholder="Filter list"
                        variant="standard"
                        size="small"
                        sx={{ marginRight: 2 }}
                    />
                    <Button 
                        onClick={onClearSort} 
                        variant="text" 
                        color="primary" 
                        size="small" 
                        sx={{ ml: 2 }}
                    >
                        Clear Sort
                    </Button>
                </>
            )}
        </Toolbar>
    );
}

EnhancedTable.propTypes = {
    rows: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
    cellContents: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    hideIdColumn: PropTypes.bool,
    renderActions: PropTypes.func,
    handleDelete: PropTypes.func.isRequired,
    selectable: PropTypes.bool,
};

export default function EnhancedTable({ rows, headCells, cellContents, heading, hideIdColumn, renderActions, handleDelete, selectable = true }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterText, setFilterText] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        console.log(`Sorting by ${property} in ${isAsc ? 'descending' : 'ascending'} order.`);
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClearSort = () => {
        setOrderBy('');
        setOrder('asc');
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row) => {
        if (event.target.closest('td:last-child')) {
            event.stopPropagation();
            return;
        }
    
        const selectedIndex = selected.indexOf(row.id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
    
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterTextChange = (event) => {
        setFilterText(event.target.value);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleRowDelete = async (selectedIds) => {
        const selectedRows = rows.filter((row) => selectedIds.includes(row.id));

        handleDelete(selectedRows)

        // clear the selected state after deletion
        setSelected([]);
    };


    // Apply the filter to the rows
    const filteredRows = rows.filter((row) => {
        return Object.keys(row).some((key) =>
            String(row[key]).toLowerCase().includes(filterText.toLowerCase())
        );
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(filteredRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, filteredRows],
    );

    const hasActions = typeof renderActions === 'function';

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={selected}
                    heading={heading}
                    filterText={filterText}
                    onFilterTextChange={handleFilterTextChange}
                    handleDelete={handleRowDelete}
                    onClearSort={handleClearSort}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            headCells={headCells}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                            hideIdColumn={hideIdColumn}
                            selectable={selectable}
                            hasActions={hasActions}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={selectable ? (event) => handleClick(event, row) : null}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: selectable ? 'pointer' : 'default' }}
                                    >
                                        {selectable && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                        )}
                                        {cellContents(row, labelId, hideIdColumn)}
                                        {hasActions && (
                                            <TableCell padding="normal" align="center">
                                                {renderActions(row)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={headCells.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0)} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
