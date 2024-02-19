import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import HeaderLayout from "../HeaderLayout";
import { SampleTasks } from "../SampleTasks";
const Taskss = () => {
    const [gridData, setGridData] = useState(SampleTasks);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("");
                const data = await response.json();
                setGridData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleAddNewButtonClick = () => {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        const newId = Math.max(...gridData.map((item) => item.TaskID), 0) + 1;
        const newTask = {
            TaskID: newId,
            TaskName: "New Task",
            TaskDesc: "New Task Description",
            StartDate: startDate,
            EndDate: endDate,
            isActive: true,
            inEdit: true,
        };

        setGridData([...gridData, newTask]);
    };

    return (
        <HeaderLayout>
            <div className="fs-2">Edit Tasks</div>
            <Grid
                data={gridData}
                onItemChange={(e) => {
                    const newData = gridData.map((item) =>
                        item.TaskID === e.dataItem.TaskID ? { ...item, [e.field]: e.value } : item
                    );
                    setGridData(newData);
                }}
                editField="inEdit"
            >
                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        onClick={handleAddNewButtonClick}
                    >
                        Add new
                    </button>
                </GridToolbar>
                <Column field="TaskID" title="Id" width="50px" editable={false} />
                <Column field="TaskName" title="Task Name" />
                <Column field="TaskDesc" title="Task Description" />
                <Column field="EstimatedHours" title="Estimated Hours" editor={"numeric"} />
                <Column field="StartDate" title="Start Date" editor="date" format="{0:d}" />
                <Column field="EndDate" title="End Date" editor="date" format="{0:d}" />
                <Column field="isActive" title="Is Active" />
                <Column
                    title="Actions"
                    width="200px"
                    cell={(props) => (
                        <td>
                            {props.dataItem.inEdit ? (
                                <>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary mx-1"
                                        onClick={() => setGridData((prev) => prev.map((item) => (item.TaskID === props.dataItem.TaskID ? { ...item, inEdit: false } : item)))}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                        onClick={() => setGridData((prev) => prev.filter((item) => item.TaskID !== props.dataItem.TaskID))}
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                    onClick={() => setGridData((prev) => prev.map((item) => (item.TaskID === props.dataItem.TaskID ? { ...item, inEdit: true } : item)))}
                                >
                                    Edit
                                </button>
                            )}
                        </td>
                    )}
                />
            </Grid>
        </HeaderLayout>
    );
};

export default Taskss;
