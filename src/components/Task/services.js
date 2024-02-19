// Remove import of SampleTasks

// Initialize data as an empty array
let data = [];

// Generate a unique ID for a new item
const generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const insertItem = async item => {
    try {
        const response = await fetch('http://3.13.185.49/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error('Failed to insert item');
        }

        const newItem = await response.json();
        newItem.inEdit = false;
        data.unshift(newItem); // Add the new item to the beginning of the data array
        return data;
    } catch (error) {
        console.error('Error inserting item:', error);
        throw error;
    }
};

export const getItems = async () => {
    try {
        const response = await fetch("http://3.13.185.49/task-listing");
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server');
        }
        const fetchedData = await response.json();

        // Check if the response contains the "message" key and it's an array
        if (fetchedData && fetchedData.message && Array.isArray(fetchedData.message)) {
            data = fetchedData.message; // Update the data array with fetched data
            return data; // Return the fetched data
        } else {
            console.error("Invalid response format from the server");
            return []; // Return empty array as default value
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const updateItem = async (data, item) => {
    try {
        const response = await fetch('http://3.13.185.49/update-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error('Failed to update item');
        }

        const updatedItem = await response.json();
        const index = data.findIndex(record => record.id === updatedItem.id);
        data[index] = updatedItem;
        return data;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error; // Throw error to handle it in the component
    }
};

export const deleteItem = async item => {
    try {
        const response = await fetch("http://3.13.185.49/delete-task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: item.id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }

        const deletedItemId = item.id;
        const index = data.findIndex(record => record.id === deletedItemId);
        data.splice(index, 1);
        return deletedItemId;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error; // Throw error to handle it in the component
    }
};
