import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import HeaderLayout from '../Layouts/HeaderLayout';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
const ViewTimesheet = () => {
  const navigate = useNavigate();
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      const authTokens = JSON.parse(localStorage.getItem('authTokens'));
      const accessToken = authTokens?.access_token;

      try {
        const response = await fetch('http://3.13.185.49/all-timesheets', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGridData(data);
        } else {
          throw new Error('Failed to fetch timesheets');
        }
      } catch (error) {
        console.error('Error fetching timesheets:', error);
      }
    };

    fetchTimesheets();
  }, []);

  const handleEditButtonClick = (id) => {
    navigate(`/editTimesheet/${id}`);
  };

  const handleAddNewButtonClick = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const newSer = Math.max(...gridData.map((item) => item.id + 1));
    const newTimesheet = {
      id: newSer,
      timesheet_name: newSer,
      start_date: startDate,
      end_date: endDate,
    };
    setGridData([...gridData, newTimesheet]);
  };

  return (
    <HeaderLayout>
      <div className='fs-2'>View Timesheet</div>
      {gridData.length > 0 ? (
        <Grid data={gridData}>
          <GridToolbar>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={handleAddNewButtonClick}
            >
              Add new
            </button>
          </GridToolbar>
          <Column
            title="Sno"
            width="60px"
            cell={(props) => (
              <td>{props.dataIndex + 1}</td>
            )}
          />
          <Column
            field="timesheet_name"
            title="Timesheet Name"
            cell={(props) => (
              <td>
                Week {props.dataItem.timesheet_name}
              </td>
            )}
          />

          <Column
            field="start_date"
            title="Start Date"
            editor="date"
            format="{0:d}"
          />
          <Column
            field="end_date"
            title="End Date"
            editor="date"
            format="{0:d}"
          />
          <Column
            title="Edit"
            width="100px"
            cell={(props) => (
              <td>
                <button
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
                  onClick={() => handleEditButtonClick(props.dataItem.id)}
                >
                  Edit
                </button>
              </td>
            )}
          />
        </Grid>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </HeaderLayout>
  );
}

export default ViewTimesheet;
