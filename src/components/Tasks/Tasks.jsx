import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import HeaderLayout from "../HeaderLayout";

// const DropDownCell2 = (props) => {
//     const { value, onChange } = props;

//     return (
//         <select value={value} onChange={(e) => onChange(e.target.value)}>
//             {discontinuedOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                     {option.label}
//                 </option>
//             ))}
//         </select>
//     );
// };

const DropDownCell = (props) => {
    const { value, onChange, isEditable, projects } = props;

    return (
        <select
            value={value}
            onChange={(e) => isEditable && onChange({ value: e.target.value, project_id: e.target.value.split(' ')[1] })}
            disabled={!isEditable}
        >
            {projects.map((project) => (
                <option key={project.id} value={`${project.name} ${project.id}`}>
                    {`${project.name} ${project.id}`}
                </option>
            ))}
        </select>
    );
};

const Taskss = () => {
    const [gridData, setGridData] = useState([]);
    const [projects, setProjects] = useState([]);
    const [editedTaskId, setEditedTaskId] = useState(null);

    const handleRowClick = (clickedItem) => {
        setGridData((prev) =>
            prev.map((item) => ({
                ...item,
                inEdit: item.task_id === clickedItem.task_id ? !item.inEdit : item.inEdit,
            }))
        );
        setEditedTaskId(clickedItem.task_id);
    };

    useEffect(() => {
        fetchData();
        fetchProjects();
    }, []);

    const addSerialNumberToData = (data) => {
        return data.map((item, index) => ({
            ...item,
            task_id: index + 1,
        }));
    };
    const ProjectNameEditor = (props) => {
        const { value, onChange, isEditable, projects } = props;

        return (
            <select
                value={value}
                onChange={(e) => isEditable && onChange(e.target.value)}
                disabled={!isEditable}
            >
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>
        );
    };


    const fetchData = async () => {
        try {
            const response = await fetch("http://3.13.185.49/task-listing");
            const result = await response.json();
            const data = result.message || [];
            setGridData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://3.13.185.49/project-listing");
            const result = await response.json();
            const projects = result.message || [];
            setProjects(projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleAddNewButtonClick = () => {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);

        const newTask = {
            task_id: gridData.length + 1, // Increment ID
            name: "New Task",
            description: "New Task Description",
            start_date: new Date(),
            end_date: new Date(),
            is_active: true,
            inEdit: true,
        };

        setGridData([...gridData, newTask]);
    };

    const handleDeleteButtonClick = async (dataItem) => {
        try {
            await fetch("http://3.13.185.49/delete-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task_id: dataItem.task_id }),
            });

            setGridData((prev) => prev.filter((item) => item.task_id !== dataItem.task_id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEditButtonClick = (dataItem) => {
        console.log("Editing task with TaskID:", dataItem.task_id);
        setGridData((prev) =>
            prev.map((item) => ({
                ...item,
                inEdit: item.task_id === dataItem.task_id ? !item.inEdit : false,
            }))
        );
    };



    const handleSaveButtonClick = async (dataItem) => {
        try {
            console.log("Updating task with TaskID:", dataItem.task_id);

            if (dataItem.task_id) {
                const response = await fetch("http://3.13.185.49/update-task", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        task_id: dataItem.task_id,
                        name: dataItem.name,

                        // start_date: dataItem.start_date,
                        // end_date: dataItem.end_date,
                        is_active: dataItem.is_active
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const updatedTask = await response.json();
                console.log("Updated Task:", updatedTask);

                setGridData((prev) =>
                    prev.map((item) =>
                        item.task_id === dataItem.task_id ? { ...item, ...updatedTask, inEdit: false } : item
                    )
                );
            } else {
                const response = await fetch("http://3.13.185.49/add-task", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataItem),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const newTask = await response.json();
                console.log("New Task:", newTask);

                setGridData((prev) => [...prev, { ...newTask, inEdit: false }]);
            }
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    return (
        <HeaderLayout>
            <div className="fs-2">Edit Tasks</div>
            {gridData.length > 0 ? (
                <Grid
                    data={addSerialNumberToData(gridData)}
                    onItemChange={(e) => {
                        const newData = gridData.map((item) =>
                            item.task_id === e.dataItem.task_id ? { ...item, [e.field]: e.value } : item
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
                    <Column field="task_id" title="ID" width="100px" />
                    <Column
                        field="project_id"
                        title="Project Name"
                        cell={(props) => (
                            <DropDownCell
                                {...props} projects={projects}
                            />
                        )}
                    />
                    <Column field="name" title="Name" />
                    <Column field="description" title="Description" />
                    <Column field="start_date" title="Start Date" />
                    <Column field="end_date" title="End Date" />
                    <Column field="is_active" title="Is Active" />
                    <Column
                        title="Actions"
                        width="200px"
                        cell={(props) => (
                            <td>
                                {props.dataItem.inEdit ? (
                                    <>
                                        <button
                                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary mx-1"
                                            onClick={() => handleSaveButtonClick(props.dataItem)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                            onClick={() => handleDeleteButtonClick(props.dataItem)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                        onClick={() => handleEditButtonClick(props.dataItem)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        )}
                    />
                </Grid>
            ) : (
                <button
                    title="Add new"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={handleAddNewButtonClick}
                >
                    Add new
                </button>
            )}
        </HeaderLayout>
    );
};

export default Taskss;
