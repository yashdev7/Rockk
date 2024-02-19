import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import products from "./products";
import EditForm from './editForm';
import HeaderLayout from '../HeaderLayout'

const EditCommandCell = props => {
    return <td>
        <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => props.enterEdit(props.dataItem)}>
            Edit
        </button>
    </td>;
};

const Taskss = () => {
    const [openForm, setOpenForm] = React.useState(false);
    const [editItem, setEditItem] = React.useState({
        ProductID: 1
    });

    const [data, setData] = React.useState(products);
    const enterEdit = item => {
        setOpenForm(true);
        setEditItem(item);
    };
    const handleSubmit = event => {
        let newData = data.map(item => {
            if (event.ProductID === item.ProductID) {
                item = {
                    ...event
                };
            }
            return item;
        });
        setData(newData);
        setOpenForm(false);
    };
    const handleCancelEdit = () => {
        setOpenForm(false);
    };
    const MyEditCommandCell = props => <EditCommandCell {...props} enterEdit={enterEdit} />;
    return <HeaderLayout>
        <Grid style={{
            height: "400px"
        }} data={data}>
            <Column field="task_id" title="ID" width="40px" />
            <Column field="name" title="Name" />
            <Column field="project_name" title="Project Name" />
            <Column field="description" title="Description" />
            <Column field="start_date" title="Start Date" />
            <Column field="end_date" title="End Date" />
            <Column field="is_active" title="Is Active" />
            <Column cell={MyEditCommandCell} />
        </Grid>
        {openForm && (
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10004,
                }}
            >
                <EditForm cancelEdit={handleCancelEdit} onSubmit={handleSubmit} item={editItem} />
            </div>
        )}
    </HeaderLayout>;
};

export default Taskss