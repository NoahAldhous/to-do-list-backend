import express from 'express';
import myList from './data.js'

const app = express();

app.get("/" , ( req, res ) => {
    res.json(myList)
    }
);

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});