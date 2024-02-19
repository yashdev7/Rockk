import React from 'react';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import HeaderLayout from '../HeaderLayout';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { sampleProducts } from '../sample-product';
import '@progress/kendo-theme-default/dist/all.css';
import { DropDownList } from '@progress/kendo-react-dropdowns';

import { AutoComplete } from "@progress/kendo-react-dropdowns";
import countries from "../countries";
import "./overview-styles.css";
const Tasks = () => {
    const initialData = sampleProducts.map((item, index) => ({
        ...item,
        inEdit: false,
        ProductID: index + 1,
    }));

    const [data, setData] = React.useState(initialData);
    const [editID, setEditID] = React.useState(null);

    const rowClick = (event) => {
        setEditID(event.dataItem.ProductID);
    };

    const itemChange = (event) => {
        const inEditID = event.dataItem.ProductID;
        const field = event.field || '';
        const newData = data.map((item) =>
            item.ProductID === inEditID ? { ...item, [field]: event.value } : item
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
            ProductID: data.length + 1,
            inEdit: true,
        };
        setData([newRecord, ...data]);
        setEditID(newRecord.ProductID);
    };

    return (
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
                        <div onClick={closeEdit}>
                            <button
                                title='Add new'
                                className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
                                onClick={addRecord}
                            >+ Add new
                            </button>
                        </div>
                    </GridToolbar>
                    <Column field='ProductID' title='Id' width='50px' editable={false} />
                    <Column field='TaskName' title='Task Name' />
                    <Column
                        field='ClientName'
                        title='Client Name'
                        editor={(props) => (
                            <AutoComplete
                                data={sampleProducts.clients}
                                value={sampleProducts.ClientName}
                                onChange={(e) => props.onChange('ClientName', e.target.value)}
                            />
                        )}
                    />
                    <GridColumn
                        field='ProjectName'
                        title='Project Name'
                        editor={(props) => (
                            <AutoComplete
                                data={countries}
                                value={props.value}
                                onChange={(e) => props.onChange(e.target.value)}
                            />
                        )}
                    />
                    <Column field='StartDate' title='Start Date' editor='date' format='{0:d}' />
                    <Column field='EndDate' title='End Date' editor='date' format='{0:d}' />
                    <Column field='EstimatedHours' title='Estimated Hours' width='150px' editor='numeric' />
                </Grid>
            </div>

        </HeaderLayout>
    );
};

export default Tasks;
