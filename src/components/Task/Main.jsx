import React, { useState, useEffect } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from './myCommandCell';
import { DropDownCell } from './myDropDownCell';
import { insertItem, updateItem, deleteItem, getItems } from './services';
import HeaderLayout from '../Layouts/HeaderLayout';

const GridContext = React.createContext({});

const CommandCell = ({ dataItem, ...rest }) => {
    const {
        enterEdit,
        remove,
        add,
        discard,
        save,
        update,
        cancel,
        editField
    } = React.useContext(GridContext);

    return <MyCommandCell {...rest} edit={enterEdit} remove={remove} add={add} save={save} discard={discard} update={update} cancel={cancel} editField={editField} dataItem={dataItem} />;
};

const Main = () => {
    const editField = 'inEdit';
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await getItems();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const remove = async (dataItem) => {
        try {
            const deletedItemId = await deleteItem(dataItem);
            // Assuming delete-task API deletes the item successfully, no need to fetch again
            setData(data.filter(item => item.task_id !== deletedItemId));
            console.log('Item deleted successfully');
            return deletedItemId;
        } catch (error) {
            console.error('Error deleting item:', error);
            return null;
        }
    };

    const add = async dataItem => {
        try {
            dataItem.inEdit = true;
            const newData = await insertItem(dataItem);
            setData([...newData]);
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const update = async dataItem => {
        try {
            dataItem.inEdit = false;
            const newData = await updateItem(data, dataItem);
            setData(newData);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };


    const discard = dataItem => {
        setData(data.filter(item => item.task_id !== dataItem.task_id));
    };

    const cancel = dataItem => {
        setData(data.map(item => item.task_id === dataItem.task_id ? dataItem : item));
    };

    const enterEdit = dataItem => {
        setData(data.map(item => item.task_id === dataItem.task_id ? { ...item, inEdit: true } : item));
    };

    const itemChange = event => {
        const field = event.field || '';
        setData(data.map(item => item.task_id === event.dataItem.task_id ? { ...item, [field]: event.value } : item));
    };

    const addNew = () => {
        const newDataItem = {
            inEdit: true,
            task_id: new Date().getMilliseconds(),
            name: '',
            description: '',
            start_date: new Date(),
            end_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            is_active: true,
            estimated_hours: 0
        };
        setData([newDataItem, ...data]);
    };

    return (
        <HeaderLayout>
            <div className="fs-2">Edit Tasks</div>
            <GridContext.Provider value={{
                enterEdit,
                remove,
                add,
                discard,
                update,
                cancel,
                editField,
                dataItem: null
            }}>
                <Grid data={data} onItemChange={itemChange} editField={editField} dataItemKey={'task_id'}>
                    <GridToolbar>
                        <button title="Add new" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={addNew}>
                            Add new
                        </button>
                    </GridToolbar>
                    <Column field="task_id" title="Sno" width="60px" editable={false} />
                    <Column field="name" title="Product Name" />
                    <Column field="is_active" title="Is Active" cell={DropDownCell} />
                    <Column field="description" title="Description" />
                    <Column field="estimated_hours" title="Estimated Hours" editor="numeric" />
                    <Column field="start_date" title="Start Date" editor="date" format="{0:d}" />
                    <Column field="end_date" title="End Date" editor="date" format="{0:d}" />
                    <Column cell={CommandCell} width="240px" />
                </Grid>
            </GridContext.Provider>
        </HeaderLayout>
    );
};

export default Main;
