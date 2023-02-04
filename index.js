import express from 'express';
import myList from './data.js'

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/" , ( req, res ) => {
    res.status(200).json(myList)
    }
);

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});