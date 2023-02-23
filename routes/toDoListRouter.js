//routes for GET, POST, PUT, PATCH, DELETE requests here.

import express from 'express';
// import { Router } from 'express';
import { addItem, deleteItem, getAllItems, updateItem } from '../models/models.js';

//CREATING ROUTER
const listRouter = express.Router()

//GET Request
listRouter.get('/', async function (req,res) {
  console.log('GET request received...')
  const list = await getAllItems().catch(console.dir);
  const responseObject = {
    request: 'received',
    success: 'true',
    message: list
  };
  res.status(200).json(responseObject)
});

//POST request
listRouter.post("/", async function (req,res) {
  console.log('POST request received...');
  const newItem = req.body;
  console.log(`new Item to be added is action : ${newItem.action}, completed: ${newItem.completed}`);
  const addedItem = await addItem(newItem).catch(console.dir);
  const responseObject = {
    request:'received',
    success: true,
    message: addedItem,
  };
  res.status(201).json(responseObject);
});

//PUT request
listRouter.put("/:id", async function (req,res) {
  console.log('PUT request received...');
  const itemId = req.params.id
  const editedItem = req.body
  const response = await updateItem(itemId, editedItem).catch(console.dir)
  const responseObject = {
    request: 'received',
    success: true,
    message: response,
  };
  res.status(201).json(responseObject);
});

//DELETE request
listRouter.delete("/:id", async function (req,res) {
  console.log(`DELETE request received...`);
  const itemId = req.params.id;
  console.log(`deleting item with id: ${itemId}`);
  const itemDeleted = await deleteItem(itemId).catch(console.dir);
  if(!itemDeleted){
    const responseObject = {
      request: 'received',
      success: false,
      message: 'could not find item'
    }
    res.status(500).json(responseObject);
  }else{
    const responseObject = {
      request: 'received',
      success: true,
      message: 'item deleted'
    }
    res.status(200).json(responseObject)
  }
});

export default listRouter;