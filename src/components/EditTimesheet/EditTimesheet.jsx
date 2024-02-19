import * as React from "react";
import { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar
} from "@progress/kendo-react-grid";
import { Timesheet } from "./Timesheet";
import HeaderLayout from '../Layouts/HeaderLayout'
import { useParams } from 'react-router-dom';

const AddTimesheet = () => {
  const [gridData, setGridData] = useState(Timesheet);

  const handleAddNewButtonClick = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const newId = Math.max(...gridData.map((item) => item.id));
    const newTimesheet = {
      timesheet_id: newId,
      timesheet_name: `Week ${newId}`,
      start_date: startDate,
      end_date: endDate,
    };

    setGridData([...gridData, newTimesheet]);
  };

  const { id } = useParams();
  const columns = [
    { field: "timesheet_id", title: "Sno" },
    { field: "task_id", title: "Tasks" },
    { field: "project_id", title: "Projects" },
    { field: "client_id", title: "Clients" },
    { field: "Mon", title: "Monday" },
    { field: "Tue", title: "Tuesday" },
    { field: "Wed", title: "Wednesday" },
    { field: "Thu", title: "Thursday" },
    { field: "Fri", title: "Friday" },
    { field: "Sat", title: "Saturday" },
    { field: "Sun", title: "Sunday" },
    {
      title: "Edit",
      cell: (props) => (
        <td>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
            onClick={() => handleEditClick(props.dataItem)}
          >
            Edit
          </button>
        </td>
      ),
    },
  ];

  const handleEditClick = (dataItem) => {
    console.log("Edit button clicked for item:", dataItem);
  };

  return (
    <HeaderLayout>
      <div className="d-flex justify-content-between align-items-center">
        <div className='fs-2'>Timesheet for week  {id} </div>
        <div className='fs-4'> {Timesheet[id].start_date.toLocaleDateString()} - {Timesheet[id].end_date.toLocaleDateString()}</div>
      </div>
      <Grid
        data={Timesheet}
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
        {columns.map((column, index) => (
          <Column
            key={index}
            field={column.field}
            title={column.title}
            cell={column.cell}
          />
        ))}
      </Grid>
    </HeaderLayout>
  );
}

export default AddTimesheet;
