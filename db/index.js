import { MongoClient } from "mongoDB";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

export async function connectToDataBase(){
        //ensures connection to MongoDB  
        await client.connect();
    
        //connect to database
        const database = client.db('test_todolist');
  
        //connect to collection within database
        const toDoList = database.collection('to_do_list');

  return toDoList
}
