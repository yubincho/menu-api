// controllers
/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";


/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async(req:Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.GetItems();
        res.status(200).send(items);
        // res.status(200).sendFile(__dirname + '/views/index.html');
        // res.render('/index'  );

    } catch (e) {
        // @ts-ignore
        res.status(500).send(e.message);
    }
});

// GET items/:id
itemsRouter.get("/:id", async(req:Request, res:Response) => {

    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await ItemService.GetItemById(id);

        if (item) {
            return res.status(200).send(item);
        }
    } catch (e) {
        // @ts-ignore
        res.status(500).send(e.message);
    }
});

// POST items
itemsRouter.post("/", async(req:Request, res:Response) => {
    console.log(req.body);
    try {
        const item: Item = req.body;

        if (!item.name || !item.price || !item.description || !item.image) {
            res.status(400).json({ error: 'Invalid request data.' });
            return;
        }

        const newItem = await ItemService.AddItem(item);

        res.status(201).json(newItem);
    } catch (e) {
        // @ts-ignore
        res.status(500).send(e.message);
    }
})

// PUT items/:id
itemsRouter.put("/:id", async(req:Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);

    try {
        const itemUpdate: Item = req.body;
        const existingItem: Item = await ItemService.GetItemById(id);
        if (existingItem) {
            // const updatedItem = await ItemService.UpdateItemById(parseInt(req.params.id), itemUpdate);
            const updatedItem = await ItemService.UpdateItemById(id, itemUpdate);
            return res.status(200).json(updatedItem)
        }
        const newItem = await ItemService.AddItem(itemUpdate);
        res.status(201).json(newItem);

        // const result = await ItemService.UpdateItemById({...req.body, id: req.params.id});
        // const result = await ItemService.UpdateItemById(id, itemUpdate); //
        // console.log('Update result:', result);  //
        // res.status(200).json({result}); //


    } catch (error) {
        // @ts-ignore
        // res.status(500).send(e.message);
        console.error('[teams.controller][updateTeamById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message:  'There was an error when updating Item.'
        })
    }
})

// DELETE items/:id
itemsRouter.delete("/:id" , async(req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ItemService.DeleteItemById(id);
        res.status(204);

    } catch (e) {
        // @ts-ignore
        res.status(500).send(e.message);
    }
});