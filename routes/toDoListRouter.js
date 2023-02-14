//routes for GET, POST, PUT, PATCH, DELETE requests here.

import express from 'express';
// import { Router } from 'express';
import { addItem, getAllItems } from '../models/models.js';

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
  console.log(`new Item to be added is ${newItem}`);
  const addedItem = await addItem(newItem);
  const responseObject = {
    request:'received',
    success: true,
    message: addedItem,
  };
  res.status(201).json(responseObject);
})

export default listRouter;