//CRUD functions exported from here

import { MongoClient } from "mongoDB";

const uri = 
'mongodb+srv://Naldhous:6rF5YYN6P1pTvHEq@cluster0.b7iqhrp.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
//GET ALL ITEMS ON THE TO DO LIST
export async function getAllItems(){
    console.log('get request received!')
    try {
      //connect to database
      const database = client.db('test_todolist');
      const toDoList = database.collection('to_do_list');
      // Query for a movie that has the title 'Back to the Future'
      const cursor = toDoList.find({});
      const response = await cursor.toArray();
      console.log(response);
      return response;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  
    }
}