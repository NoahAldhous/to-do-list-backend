import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;
import listRouter from './routes/toDoListRouter.js'

//unpacks request bodies
app.use(express.json());

//allowing cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
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