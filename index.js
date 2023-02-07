// import express from 'express';
// import myList from './data.js'

import { MongoClient } from "mongoDB";

const uri = 
'mongodb+srv://Naldhous:6rF5YYN6P1pTvHEq@cluster0.b7iqhrp.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

// app.get("/" , ( req, res ) => {
//     res.status(200).json(myList)
//     }
// );

// const PORT = 3001

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// });