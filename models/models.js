import { ObjectId } from "mongoDB";
import { connectToDatabase, closeConnection } from '../db/index.js'

//GET ALL ITEMS
export async function getAllItems(){
    console.log('getting all Items from database...')
    try {

      //connects to 'toDoList' collection in the database
      const toDoList = await connectToDatabase();
      
      //finds all {} (objects) within the collection
      const cursor = toDoList.find({});

      //converts what is found to an array
      const response = await cursor.toArray();

      return response;
    } finally {
      // Ensures that the client will close when you finish/error
      await closeConnection();
    }
}

//INSERT NEW ITEM INTO LIST
export async function addItem(newItem){
  console.log(`inserting new Item into Database...`)
  try {

    //connects to 'toDoList' collection in the database
    const toDoList = await connectToDatabase();
    
    //define document
    const doc = { action: newItem.action, completed: newItem.completed };
    
    const result = await toDoList.insertOne(doc);

    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
    return result;
    } finally {
      await closeConnection();
    }
}

//UPDATE EXISTING ITEM
export async function updateItem(itemId, editedItem){
  console.log('updating existing item...')
  try {
    //connects to 'toDoList' collection within the Database
    const toDoList = await connectToDatabase();

    //defines which item to look for 
    const filter = { _id: new ObjectId(itemId) };

    // this option instructs the method to create an Item if no documents match the filter
    const options = { upsert: true };

    // create an Item that sets the plot of the movie
    const updateItem = {
      $set: {
        action: editedItem.action,
        completed:editedItem.completed
      },
    };

    const result = await toDoList.updateOne(filter, updateItem, options);

    return `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`

  } finally {
    await closeConnection();
  }
}

//DELETE ITEM FROM DATABASE
export async function deleteItem(itemId){
  console.log('deleting item from database...')
  try{
    
    //connects to 'toDoList' collection in the database
    const toDoList = await connectToDatabase();

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
    await closeConnection();
  }
}