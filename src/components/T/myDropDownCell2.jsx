import React, { useState, useEffect } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export const DropDownCell = props => {

    // const project_id = props.project_id
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState([]);
    const [taskProjectName, setTaskProjectName] = useState('');
    const { project_id = 1 } = props;

    async function fetchTasks() {
        try {
            const response = await fetch('http://3.13.185.49/task-listing');
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }
    useEffect(() => {
        fetch(`http://3.13.185.49/project-details?project_id=${project_id}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    // console.log(data.message);
                    setTaskProjectName(data.message);
                    if (props.onChange) {
                        props.onChange({
                            ...props.dataItem,
                            [props.field]: data.message.name
                        });
                    }
                } else {
                    console.error('Invalid data format:', data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        fetchTasks()
    }, []);

    useEffect(() => {
        if (!loading) {
            fetch('http://3.13.185.49/project-listing')
                .then(response => response.json())
                .then(data => {
                    if (data && data.message && data.message.length > 0) {
                        setApiData(data.message);
                    } else {
                        console.error('Invalid data format:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [loading]);

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

    const { dataItem } = props;
    const field = props.field || '';
    const dataValue = dataItem[field] === null ? '' : dataItem[field];

    return (
        <td>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <DropDownList
                    style={{ width: '150px' }}
                    onChange={handleChange}
                    value={dataValue}
                    data={apiData.map(item => ({
                        id: item.id,
                        name: item.name,
                    }))}
                    textField="name"
                // disabled={inEdit} // Disable the dropdown when inEdit is true
                />
            )}
        </td>
    );
};
