import React from 'react';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import HeaderLayout from '../Layouts/HeaderLayout';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { sampleTasks } from '../Clients/sample-tasks';
import { ExcelExport } from '@progress/kendo-react-excel-export';
const Users = () => {
    const _export = React.useRef(null);
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };
    const sampleProjects = [
        { id: 1, name: 'Timesheet' },
        { id: 2, name: 'Weather app' },
    ];

    const sampleClients = [
        { id: 1, name: 'Rishika Jain' },
        { id: 2, name: 'John Doe' },
    ];
    const dataOrders = [{
        orderName: "Cunewalde",
        orderId: 1,
        productId: 1
    }, {
        orderName: "Albuquerque",
        orderId: 2,
        productId: 1
    }, {
        orderName: "Geneva",
        orderId: 3,
        productId: 2
    }, {
        orderName: "Graz",
        orderId: 4,
        productId: 2
    }, {
        orderName: "London",
        orderId: 5,
        productId: 3
    }];

    const initialData = sampleTasks.map((item, index) => ({
        ...item,
        inEdit: false,
        Sno: index + 1,
    }));

    const [data, setData] = React.useState(initialData);
    const [editID, setEditID] = React.useState(null);

    const rowClick = (event) => {
        setEditID(event.dataItem.Sno);
    };

    const itemChange = (event) => {
        const inEditID = event.dataItem.Sno;
        const field = event.field || '';
        const newData = data.map((item) =>
            item.Sno === inEditID ? { ...item, [field]: event.value } : item
        );
        setData(newData);
    };

    const closeEdit = (event) => {
        if (event.target === event.currentTarget) {
            setEditID(null);
        }
    };

    const addRecord = () => {
        const newRecord = {
            Sno: data.length + 1,
            inEdit: true,
        };
        setData([newRecord, ...data]);
        setEditID(newRecord.Sno);
    };

    return (
        <ExcelExport ref={_export}>

            <HeaderLayout className='container w-5 p-5'>
                <div className='row'>
                    <div className='fs-2'>Task Details</div>
                    <Grid
                        style={{
                            height: '420px',
                        }}
                        className='m-4'
                        data={data}
                        editField="inEdit"
                        onRowClick={rowClick}
                        onItemChange={itemChange}
                    >
                        <GridToolbar>
                            <button
                                title="Export Excel"
                                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                onClick={excelExport}
                            >
                                Export to Excel
                            </button>
                            <div onClick={closeEdit}>
                                <button
                                    title='Add new'
                                    className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
                                    onClick={addRecord}
                                > + Add new
                                </button>
                            </div>
                        </GridToolbar>
                        <Column field='Sno' title='Sno' width='50px' editable={false} />
                        <Column field='TaskName' title='Task Name' />
                        <Column
                            field='ClientName'
                            title='Client Name'
                            editor={(props) => (
                                <AutoComplete
                                    data={sampleClients.map(client => client.name)}
                                    value={props.dataItem.ClientName}
                                    onChange={(e) => props.onChange('ClientName', e.target.value)}
                                />
                            )}
                        />
                        <Column
                            field='ProjectName'
                            title='Project Name'
                            editor={(props) => (
                                <AutoComplete
                                    label="Order"
                                    data={dataOrders}
                                    textField="orderName"
                                    suggest={true}
                                    value={props.dataItem.ProjectName ? String(props.dataItem.ProjectName) : ''}
                                    onChange={(e) => props.onChange('ProjectName', e.target.value)}
                                />
                            )}
                        />


                        <Column field='StartDate' title='Start Date' editor='date' format='{0:d}' />
                        <Column field='EndDate' title='End Date' editor='date' format='{0:d}' />
                        <Column field='Status' title='Status' />
                    </Grid>
                </div>
            </HeaderLayout>
        </ExcelExport>
    )
}

export default Users