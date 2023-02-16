import { MongoClient, ObjectId } from "mongoDB";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

//GET ALL ITEMS
export async function getAllItems(){
    console.log('getting all Items from database...')
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

      return response;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  
    }
}

//ADD NEW ITEM TO LIST
export async function addItem(newItem){
  console.log(`inserting new Item into Database...`)
  try {

    //ensures connection to MongoDB  
    await client.connect();
  
    //connect to database
    const database = client.db('test_todolist');

    //connect to collection within database
    const toDoList = database.collection('to_do_list');
    
    //define document
    const doc = { action: newItem.action, completed: newItem.completed };
    
    const result = await toDoList.insertOne(doc);

    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
    return result;
    } finally {

      await client.close();

    }
}

//DELETE ITEM FROM DATABASE
export async function deleteItem(itemId){
  console.log('deleting item from database...')
  try{
    //ensures connection to MongoDB  
    await client.connect();
    
    //connect to database
    const database = client.db('test_todolist');
    
    //connect to collection within database
    const toDoList = database.collection('to_do_list');

    //define the query that Mongo will use to look for item
    //needs to use new ObjectId() to find the item by _id
    const query = { _id : new ObjectId(itemId)}

    //delete one item that matches this id
    const result = await toDoList.deleteOne(query)
    
    //checking if one item was deleted from toDoList
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      return true;
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      return false;
    }
      
  } finally {
    await client.close()
  }
}