import { MongoClient } from "mongoDB";

const uri = process.env.MONGO_URI

const client = new MongoClient(uri);

//GET ALL ITEMS
export async function getAllItems(){
    console.log('get request received!')
    try {

      //ensures connection to MongoDB  
      await client.connect();
    
      //connect to database
      const database = client.db('test_todolist');

      //connect to collection within database
      const toDoList = database.collection('to_do_list');

      //finds all {} (objects) within the collection
      const cursor = toDoList.find({});

      //converts what is found to an array
      const response = await cursor.toArray();
      console.log(response);

      return response;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  
    }
}