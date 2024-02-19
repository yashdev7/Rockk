import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import { DropDownCell } from "./myDropDownCell";
import { insertItem, getItems, updateItem, deleteItem } from "./services";
import HeaderLayout from "../Layouts/HeaderLayout";

const GridContext = React.createContext({});

const CommandCell = (props) => {
  const { enterEdit, remove, add, discard, save, update, cancel, editField } =
    React.useContext(GridContext);
  return (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );
};

const Task = () => {
  const editField = "inEdit";
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getItems();
        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const remove = async (dataItem) => {
    try {
      await deleteItem(dataItem);
      const newData = await getItems();
      setData(newData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const add = async (dataItem) => {
    try {
      dataItem.inEdit = true;
      const dataItems = {
        ...dataItem,
        task_name: dataItem.name,
        Project_id: 22,
        start_date: JSON.stringify(dataItem.start_date),
        end_date: JSON.stringify(dataItem.end_date),
      };
      const newData = await insertItem(dataItems);
      setData(newData);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const update = async (dataItem) => {
    try {
      dataItem.inEdit = false;
      const newData = await updateItem(dataItem);
      setData(newData);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const discard = async (dataItem) => {
    try {
      await deleteItem(dataItem);
      const newData = await getItems();
      setData(newData);
    } catch (error) {
      console.error("Error discarding item:", error);
    }
  };

  const cancel = async (dataItem) => {
    try {
      const originalItem = (await getItems()).find((p) => p.id === dataItem.id);
      const newData = data.map((item) =>
        item.id === originalItem.id ? originalItem : item
      );
      setData(newData);
    } catch (error) {
      console.error("Error canceling edit:", error);
    }
  };

  const enterEdit = (dataItem) => {
    let newData = data.map((item) =>
      item.id === dataItem.id ? { ...item, inEdit: true } : item
    );
    setData(newData);
  };

  const itemChange = async (event) => {
    const field = event.field || "";
    const newData = data.map((item) =>
      item.id === event.dataItem.id ? { ...item, [field]: event.value } : item
    );
    setData(newData);
  };

  const addNew = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    const newId = Math.max(...data.map((item) => item.id), 0) + 1;
    const newDataItem = {
      id: newId,
      name: "",
      client_id: "",
      start_date: startDate,
      end_date: endDate,
      is_active: true,
      inEdit: true,
    };
    setData([...data, newDataItem]);
  };

  return (
    <HeaderLayout>
      <GridContext.Provider
        value={{ enterEdit, remove, add, discard, update, cancel, editField }}
      >
        <Grid
          data={data}
          onItemChange={itemChange}
          editField={editField}
          dataItemKey={"id"}
        >
          <GridToolbar>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={addNew}
            >
              Add new
            </button>
          </GridToolbar>
          <Column field="id" title="Id" width="50px" editable={false} />
          <Column field="name" title="Name" />
          <Column
            field="project_name"
            title="Project Name"
            cell={DropDownCell}
            data_project_id={22}
            width="200px"
          />
          <Column field="description" title="Description" />
          <Column
            field="estimated_hours"
            title="Estimated Hours"
            editor="numeric"
          />
          <Column
            field="start_date"
            title="Start Date"
            editor="date"
            format="{0:d}"
          />
          <Column field="end_date" title="End Date" editor="date" />
          <Column field="is_active" title="Is Active" editor="boolean" />
          <Column cell={CommandCell} width="240px" field="Actions" />
        </Grid>
      </GridContext.Provider>
    </HeaderLayout>
  );
};

export default Task;
