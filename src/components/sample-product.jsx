export const sampleProducts = [{
    "TaskID": 1,
    "TaskName": "Make Timesheet app",
    "ClientName": "Rishika Jain",
    "ProjectName": 'Timesheet',
    "EstimatedHours": 9,
    "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
    },
    "StartDate": new Date(1996, 8, 20),
    "EndDate": new Date(1996, 8, 20),
    clients: [
        'Drink 1 cup of water',
        '1 Hour of Coding',
        '10 pushups',
        'Eat Your Fruits and veggies',
        '1 hour of Reading',
        '10 minutes of Meditation',
    ]
},
{
    "TaskID": 2,
    "TaskName": "Review Weather app",
    "ClientName": "Yash Jain",
    "ProjectName": 'Weather app',
    "EstimatedHours": 5,
    "Discontinued": false,
    "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
    },
    "StartDate": new Date(1996, 7, 12),
    "EndDate": new Date(1996, 7, 12)
}];