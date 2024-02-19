import * as React from "react";

import { useState, useEffect } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./MyCommandC";
import HeaderLayout from "../Layouts/HeaderLayout";

import { getItems, insertItem, updateItem, deleteItem } from "./Services";
const GridContext = React.createContext({});

const CommandCell = (props) => {
  const { enterEdit, remove, add, discard, update, cancel, editField } =
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

const Project = () => {
  const editField = "inEdit";
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const items = await getItems();
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [setData]);

  // modify the data in the store, db etc
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
        project_name: dataItem.name,
        id: dataItem.id,
        start_date: JSON.stringify(dataItem.start_date),
        end_date: JSON.stringify(dataItem.end_date),
      };
      const newData = await insertItem(dataItems);
      setData(newData);
      fetchData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const update = async (dataItem) => {
    try {
      await updateItem(dataItem);
      fetchData();
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
    // Set the item's edit mode to true
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
    // Add a new item with default values
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    const newId = Math.max(...data.map((item) => item.id), 0) + 1;
    const newDataItem = {
      inEdit: true,
    };
    setData([...data, newDataItem]);
  };

  return (
    <HeaderLayout>
      <div className="fs-2">Project</div>
      <GridContext.Provider
        value={{
          enterEdit,
          remove,
          add,
          discard,
          update,
          cancel,
          editField,
        }}
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
          <Column field="name" title="Project Name" />
          <Column field="client_id" title="Client Id" />
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
          <Column field="is_active" title="Is Active" editor="boolean" />
          <Column title="Actions" cell={CommandCell} width="240px" />
        </Grid>
      </GridContext.Provider>
    </HeaderLayout>
  );
};
export default Project;
