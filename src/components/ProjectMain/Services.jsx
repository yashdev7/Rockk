let data = [];

export const insertItem2 = async (item) => {
  // item.ProductID = generateId(data);
  item.inEdit = false;
  data.unshift(item);
  return data;
};

export const insertItem = async (item) => {
  console.log(item);
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  const accessToken = authTokens?.access_token;
  console.log(item);
  try {
    const response = await fetch("http://3.13.185.49/add-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Failed to insert item");
    }

    const newItem = await response.json();
    newItem.inEdit = false;

    const newItemWithId = { ...newItem, id: newItem.id };

    const newData = [...data, newItemWithId];

    return newData;
  } catch (error) {
    console.error("Error inserting item:", error);
    throw error;
  }
};

export const getItems = async () => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const refreshToken = authTokens?.refresh_token;
  try {
    const response = await fetch("http://3.13.185.49/project-listing", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    const fetchedData = await response.json();

    // Convert start_date and end_date strings to Date objects
    const formattedData = fetchedData.message.map((item) => ({
      ...item,
      start_date: new Date(item.start_date),
      end_date: new Date(item.end_date),
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const updateItem = async (item) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const refreshToken = authTokens?.refresh_token;
  try {
    const response = await fetch(`http://3.13.185.49/update-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({
        project_id: item.id,
        project_name: item.name,
        client_id: item.client_id,
        is_active: item.is_active,
        start_date: item.start_date,
        end_date: item.end_date,
      }),
    });
    console.log(item);
    getItems();

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    const updatedItem = await response.json();
    let index = data.findIndex((record) => record.id === updatedItem.id);
    console.log("Index of updated item:", index);
    data[index] = updatedItem;
    return data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (item, data) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const refreshToken = authTokens?.refresh_token;
  try {
    console.log(item);
    const response = await fetch("http://3.13.185.49/delete-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ project_id: item.id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    const deletedItemId = item.id;
    return deletedItemId;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
