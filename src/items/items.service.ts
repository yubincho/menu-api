// business logic
/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

import { execute } from "./utils/mysql.connector";
import { ItemQueries } from "./items.queries";

/**
 * In-Memory Store
 */
let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};


/**
 * Service Methods
 */

// export const GetItems = async (): Promise<Item[]> => Object.values(items);
export const GetItems = async () => {
    return execute<Item[]>(ItemQueries.GetItems, []);
}

// export const GetItemById = async (id: number): Promise<Item> => items[id];
export const GetItemById = async (id: Item['id']) => {
    return execute<Item>(ItemQueries.GetItemById, id);
}

// export const AddItem = async (newItem: BaseItem): Promise<Item> => {
//     const id = new Date().valueOf();
//     items[id] = {
//         id,
//         ...newItem,
//     }
//     return items[id];
// }
export const AddItem = async (newItem: Item) => {
    const result = await execute<{ insertId : number }>(ItemQueries.AddItem, [
        newItem.name,
        newItem.price,
        newItem.description,
        newItem.image
    ]);
    return result.insertId;
}


// export const UpdateItemById = async (
//     id: number,
//     itemUpdate: BaseItem
// ): Promise<Item | null> => {
//     const item = await GetItemById(id);
//     if (!item) {
//         return null;
//     }
//     items[id] = { id, ...itemUpdate };
//     return items[id];
// }
export const UpdateItemById = async (id: number, item:Item)=> {
    // const items = await GetItemById(id);
    // if (!items) {
    //     return null;
    // }

    const result = await execute<{ affectedRows: number }>(ItemQueries.UpdateItemById, [
        // item.id,
        item.name,
        item.price,
        item.description,
        item.image
    ]);
    return result;
}

export const DeleteItemById = async (id: number): Promise<null | void> => {
    const item = await GetItemById(id);

    if (!item) {
        return null;
    }

    delete items[id];
}