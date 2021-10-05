import {openDB} from "idb";

/*
Opens connection to the database
 */
export const getDatabase = () => {
    return openDB("groceryItemsDb", 1, {
        upgrade(db) {
            db.createObjectStore('groceryItems', {keyPath: 'categoryName'});
        }
    });
};

/*
Add new item to the database
 */
export const addItem = async (data) => {
    const db = await getDatabase();

    const store = db
        .transaction('groceryItems', 'readwrite')
        .objectStore('groceryItems');

    try {
        await store.add(data);
    }
    catch (err) {
        if (err['categoryName'] === 'ConstraintError') {
            throw new Error('mistake!');
        }
    }
};

/*
Extracts all values from the database
 */
export const getListPromise = async () => {
    const listItems = [];

    const db = await getDatabase();

    const store = db
        .transaction('groceryItems')
        .objectStore('groceryItems');

    let cursor = await store.openCursor();

    while (cursor) {
        listItems.push(cursor.value);

        cursor = await cursor.continue();
    }

    return listItems;
};
