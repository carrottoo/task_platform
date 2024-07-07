export function descendingComparator(a, b, orderBy) {
    const aValue = new Date(a[orderBy]).toString() !== 'Invalid Date' ? new Date(a[orderBy]).getTime() : a[orderBy];
    const bValue = new Date(b[orderBy]).toString() !== 'Invalid Date' ? new Date(b[orderBy]).getTime() : b[orderBy];
  
    if (bValue < aValue) {
        return -1;
    }

    if (bValue > aValue) {
        return 1;
    }

    return 0;
}

export function getComparator(orderBy) {
    return (a, b) => {

        for (let i = 0; i < orderBy.length; i++) {
            const comp = descendingComparator(a, b, orderBy[i].id);

            if (comp !== 0) {
                return orderBy[i].order === 'desc' ? comp : -comp;
            }
        }

        return 0;
    };
}

export function stableSort(array, comparator) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);

        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];

    });

    return stabilizedThis.map((el) => el[0]);
    
}
  

