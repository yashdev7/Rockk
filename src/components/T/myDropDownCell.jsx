import React, { useState, useEffect } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const DropDownCell = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [taskProjectName, setTaskProjectName] = useState("");
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const refreshToken = authTokens?.refresh_token;

  async function fetchTasks() {
    try {
      const response = await fetch("http://3.13.185.49/task-listing", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      return data.message;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async function fetchProjectDetails(projectId) {
    try {
      const response = await fetch(
        `http://3.13.185.49/project-details?project_id=${projectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const data = await response.json();
      // console.log('Project details:', data);
      return data;
    } catch (error) {
      console.error("Error fetching project details:", error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchTasks();
        const projectsData = await Promise.all(
          tasksData.map((task) => fetchProjectDetails(task.Project_id))
        );
        setApiData(projectsData.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
    }
  };
  const { dataItem, inEdit } = props;
  const field = props.field;
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  return (
    <td>
      {inEdit ? (
        loading ? (
          <span>Loading...</span>
        ) : (
          <DropDownList
            style={{ width: "150px" }}
            onChange={handleChange}
            value={dataValue}
            data={apiData.map((item) => ({
              id: item.id,
              name: item.name,
            }))}
            textField="name"
          />
        )
      ) : (
        <span>{dataValue}</span>
      )}
    </td>
  );
};
