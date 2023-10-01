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
//     // const lastTeamIndex = items.length - 1;
//     // const lastId = TEAMS[lastTeamIndex].id;
//     // const id = lastId + 1;
//     items[id] = {
//         id,
//         ...newItem,
//     }
//     return items[id];
// }
export const AddItem = async (newItem: Item) => {
    if (!newItem.name || newItem.name.trim() === '') {
        throw new Error('Item name cannot be null or empty.');
    }
    console.log('Received newItem:', newItem);
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
    console.log('Received item for update:', item);
    const items = await GetItemById(id);
    console.log('Retrieved item:',items)
    if (!items) {
        throw new Error('No item can be found')
        return
    }

    const result = await execute<{ affectedRows: number }>(ItemQueries.UpdateItemById, [
        item.name,
        item.price,
        item.description,
        item.image,
        item.id
    ]);
    console.log('SQL Query:', ItemQueries.UpdateItemById);
    console.log('SQL Params:', [id, item.name, item.price, item.description, item.image]);

    console.log('Update result:', result);
    return result.affectedRows > 0;
}
// 포스트맨 update 아래 데이터 입력
// {
//     "id" : 14,
//     "name" : "국수2",
//     "price" : 1100,
//     "description" : "국수",
//     "image" : "11155"
// }

export const DeleteItemById = async (id: number) => {
    console.log('Delete Query:', ItemQueries.DeleteItemById);
    console.log('Delete Params:', [id]);
    let item = await GetItemById(id);

    if (!item) {
        throw new Error('No item')
        return
    }
    const result = await execute<{ affectedRows: number }>(ItemQueries.DeleteItemById, [id]);
    if (result.affectedRows === 1) {
        console.log( 'success') // 삭제 성공
    } else {
        console.log('fail') // 해당 id를 가진 레코드를 찾을 수 없음
    }
    // delete items[id];
    console.log(result)
    return result
}