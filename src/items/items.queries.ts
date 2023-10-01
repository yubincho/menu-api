export const ItemQueries = {
    GetItems: `
  SELECT 
    id,
      name,
      price,
      description,
      image  
  FROM items
  `,

    GetItemById: `
  SELECT 
    id,
      name,
      price,
      description,
      image  
  FROM items
  WHERE
    id = ?
  `,

    AddItem: `
  INSERT INTO items (name, price, description, image)
    VALUES (?, ?, ?, ?);
  `,

    UpdateItemById: `
  UPDATE items
  SET name = ?,
      price = ?,
      description = ?,
      image = ?
  WHERE
    id = ?
  `,

    DeleteItemById: `
  DELETE 
  FROM items
  WHERE
    id = ?
  `
};