const express = require('express');
const urlRoute = require('./routes/url')
const {connectMongoDB} = require('./connection')
const app = express();
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/shortURL') //we give the DB name we want to connect to, in the end
.then(() => {console.log("mongoDB connected")})
.catch((err) => {console.log(err)});

app.use(express.json());

app.use('/url', urlRoute);

app.listen(PORT, () => {console.log(`server started at PORT: ${PORT}`)});