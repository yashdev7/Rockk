let data = [];

export const insertItem2 = async item => {
    // item.ProductID = generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
};

export const insertItem = async item => {
    // console.log(item);
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));

    const accessToken = authTokens?.access_token;
    const items = {
        task_name: "gdfh",
        Project_id: 22,
        start_date: "01/01/2024",
        end_date: "01/01/2024",
        estimated_hours: 4,
        is_active: true,
        description: "jhfrjde"
    };
    try {
        const response = await fetch('http://3.13.185.49/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error('Failed to insert item');
        }

        const newItem = await response.json();
        newItem.inEdit = false;

        const newItemWithId = { ...newItem, id: newItem.id };

        const newData = [...data, newItemWithId];

        return newData;
    } catch (error) {
        console.error('Error inserting item:', error);
        throw error;
    }
};


export const getItems = async () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const refreshToken = authTokens?.refresh_token;
    try {
        const response = await fetch("http://3.13.185.49/task-listing", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        })
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }
        const fetchedData = await response.json();

        if (fetchedData && fetchedData.message && Array.isArray(fetchedData.message)) {
            data = fetchedData.message;
            return data;
        } else {
            console.error("Invalid response format from the server");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const updateItem = async item => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const refreshToken = authTokens?.refresh_token;
    try {
        const response = await fetch('http://3.13.185.49/update-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({
                task_id: item.id,
                estimated_hours: item.estimated_hours,
                name: item.name,
                is_active: item.is_active,
                description: item.description,
                start_date: item.start_date,
                end_date: item.end_date,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }
        const updatedItem = await response.json();
        const index = data.findIndex(record => record.id === updatedItem.id);
        console.log('Index of updated item:', index);
        data[index] = updatedItem;
        return data;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

export const deleteItem = async (item, data) => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const refreshToken = authTokens?.refresh_token;
    try {
        console.log(item);
        const response = await fetch("http://3.13.185.49/delete-task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({ task_id: item.id }),
        });
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        const deletedItemId = item.id;
        return deletedItemId;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};

