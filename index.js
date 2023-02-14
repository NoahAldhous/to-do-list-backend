import express from 'express';

import { MongoClient } from "mongoDB";

import { getAllItems } from './models/models.js';

// const uri = 
// 'mongodb+srv://Naldhous:6rF5YYN6P1pTvHEq@cluster0.b7iqhrp.mongodb.net/?retryWrites=true&w=majority'

// const client = new MongoClient(uri);
// async function getAllItems() {
//   console.log('get request received!')
//   try {
//     //connect to database
//     const database = client.db('test_todolist');
//     const toDoList = database.collection('to_do_list');
//     // Query for a movie that has the title 'Back to the Future'
//     const cursor = toDoList.find({});
//     const response = await cursor.toArray();
//     console.log(response);
//     return response;
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();

//   }
// }

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/" , async ( req, res ) => {
  const items = await getAllItems().catch(console.dir);

    res.status(200).json(items)
    }
);

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});