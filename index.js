import express from 'express';

import { getAllItems } from './models/models.js';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/" , async ( req, res ) => {
  const list = await getAllItems().catch(console.dir);
  
  const responseObject = {
    request: 'received',
    success: 'true',
    message: list
  }
    res.status(200).json(responseObject)
    }
);

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});