import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;
import listRouter from './routes/toDoListRouter.js';
import cors from 'cors';

//unpacks request bodies
app.use(express.json());

//allowing cross origin requests
app.use(function(req, res, next) {
    console.log(req.hostname)
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    cors({ origin: ["http://localhost:3000", "https://storied-unicorn-46d331.netlify.app"] })
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
});

//setting default route
app.use('/',listRouter);

//sets up app listening on ports
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});