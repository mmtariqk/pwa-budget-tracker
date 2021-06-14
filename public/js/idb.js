// Here let's create a variable to hold db connection
let db;

// Here to establish a connection to IndexedDB database called 'budget_tracker' and set it to version 1
const request = indexedDB.open('budget_tracker', 1);

// Here this event will emit if the database version changes
request.onupgradeneeded = (event) => {

    // Here to save a reference to the database
    const db = event.target.result;

    // Here to create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// Do upon success
request.onsuccess = (event) => {

    // Here when db is successfully created with its object store or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // Here to check if app is online, if yes run uploadTransaction() function to send all local db data to api
    if (navigator.onLine) {
        // todo: uploadTransaction();
    }
};

// If there is an error
request.onerror = (event) => {
    // then log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {

    // Here to open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // Here to access the object store for `new_transaction`
    const  budgetObjectStore = transaction.objectStore('new_transaction');

    // Here to add record to your store with add method
    budgetObjectStore.add(record);
}

function uploadTransaction() {

    // Here to open a transaction on your db
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // Here to access your object store
    const budgetObjectStore = transaction.objectStore('new_transaction');

    // Here to get all records from store and set to a variable
    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = () => {

        // What if there was data in indexedDb's store send it to the api server
        if (getAll.result.length > 0) {
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }

                    // Here open one more transaction
                    const transaction = db.transaction(['new_transaction'], 'readwrite');

                    // Here to access the new_transaction object store
                    const budgetObjectStore = transaction.objectStore('new_transaction');

                    // Here to clear all items in your store
                    budgetObjectStore.clear();

                    alert('All saved transactions have been submitted!');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}

// listening here for app coming back online
window.addEventListener('online', uploadTransaction);