import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import HeaderLayout from '../Layouts/HeaderLayout';

const roles = ['Timesheet', 'Review Minner', 'Weather App'];
const randomRole = () => {
    return randomArrayItem(roles);
};
function generateRandomDescription() {
    const id = randomId();
    const name = randomTraderName();
    const date = randomCreatedDate();
    const role = randomArrayItem(['Market', 'Finance', 'Development']);

    const description = `${name} (ID: ${id}) joined on ${date}. Role: ${role}.`;

    return description;
}

const initialRows = [
    {
        id: randomId(),
        sno: 1,
        name: randomTraderName(),
        estimated_hours: 25,
        description: generateRandomDescription(),
        start_date: randomCreatedDate(),
        end_date: randomCreatedDate(),
        role: randomRole(),

    },
    {
        id: randomId(),
        sno: 2,
        name: randomTraderName(),
        estimated_hours: 36,
        description: generateRandomDescription(),
        start_date: randomCreatedDate(),
        end_date: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        sno: 3,
        name: randomTraderName(),
        estimated_hours: 19,
        description: generateRandomDescription(),
        start_date: randomCreatedDate(),
        end_date: randomCreatedDate(),
        role: randomRole(),
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, {
            id,
            sno: oldRows.length + 1, // Assuming sno is incremented for each new row
            name: '',
            estimated_hours: '', // Adjust this according to your data structure
            description: generateRandomDescription(),
            start_date: randomCreatedDate(),
            end_date: randomCreatedDate(),
            role: randomRole(),
            isNew: true,
        },]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: 'Edit', fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add Task
            </Button>
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'Edit' } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'View' } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: 'View', ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow && editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'sno', headerName: 'Sno', width: 50, editable: false },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        {
            field: 'role',
            headerName: 'Project Name',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Timesheet app', 'Weather app', 'Review Minner'],
        },
        { field: 'description', headerName: 'Description', width: 250, editable: true },
        {
            field: 'estimated_hours',
            headerName: 'Estimated Hours',
            type: 'number',
            width: 130,
            align: 'center',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'start_date',
            headerName: 'Start date',
            type: 'date',
            width: 120,
            editable: true,
        }, {
            field: 'end_date',
            headerName: 'End date',
            type: 'date',
            width: 120,
            editable: true,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === 'Edit';

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <HeaderLayout>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
        </HeaderLayout>
    );
}
