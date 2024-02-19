import React, { useState, useEffect } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export const DropDownCell = props => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const refreshToken = authTokens?.refresh_token;
    const [apiData, setApiData] = useState([])

    useEffect(() => {
        fetchProjectListingData()
            .then(data => setProjects(data.message))
            .catch(error => console.error('Error fetching project listing data:', error));

        fetchTaskListingData()
            .then(data => setTasks(data.message))
            .catch(error => console.error('Error fetching task listing data:', error));
    }, []);

    const fetchProjectListingData = async () => {
        const response = await fetch('http://3.13.185.49/project-listing', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        const data = await response.json();
        return data;
    }

    const fetchTaskListingData = async () => {
        const response = await fetch('http://3.13.185.49/task-listing', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        const data = await response.json();
        return data;
    }
    const mapTasksWithProjects = () => {
        return tasks.map(task => {
            const project = projects.find(project => project.id === task.Project_id);
            console.log(project);
            return {
                ...task,
                project: project ? project.name : 'Unknown Project' // Add project name to task object
            };
        });
    };

    // Map tasks with projects when both tasks and projects data are available
    const tasksWithProjects = tasks.length > 0 && projects.length > 0 ? mapTasksWithProjects() : [];


    // async function fetchProjectDetails(projectId) {
    //     try {
    //         const response = await fetch(`http://3.13.185.49/project-details?project_id=${projectId}`, {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${refreshToken}`,
    //             },
    //         });

    //         const data = await response.json();
    //         return data.message;
    //     } catch (error) {
    //         console.error("Error fetching project details:", error);
    //         throw error;
    //     }
    // }
    // const fetchData = async () => {
    //     try {
    //         const tasksData = await fetchTasks();
    //         const projectNames = await Promise.all(tasksData.map(task => fetchProjectDetails(task.Project_id)));
    //         const uniqueIds = [...new Set(projectNames)];
    //         console.log(projectNames);
    //         // console.log(uniqueIds);
    //         setApiData(projectNames);
    //         setLoading(false);

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    const handleChange = e => {
        if (props.onChange) {
            props.onChange({
                dataIndex: 0,
                dataItem: props.dataItem,
                field: props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value.value
            });
        }
    };
    const { dataItem, inEdit } = props;
    const field = props.field;
    const dataValue = dataItem[field] === null ? '' : dataItem[field];

    console.log(tasksWithProjects)
    return (
        <td>
            {inEdit ? (
                <DropDownList
                    style={{ width: '150px' }}
                    onChange={handleChange}
                    value={dataValue}
                    // data={projectData.map(item => ({
                    //     id: item.id,
                    //     name: item.name,
                    // }))}
                    textField="name"
                />
            ) : (
                <span>
                    {tasksWithProjects.map(item => (
                        <div key={item.id}>
                            {item.project}
                        </div>
                    ))}
                </span>
            )}
        </td>

    );
};
