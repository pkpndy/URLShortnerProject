const express = require('express');
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const path = require('path');
const {connectMongoDB} = require('./connection')
const app = express();
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/shortURL') //we give the DB name we want to connect to, in the end
.then(() => {console.log("mongoDB connected")})
.catch((err) => {console.log(err)});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); //to support json data
app.use(express.urlencoded({extended: false})); //to support form

app.get('/test', async  (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {urls: allUrls});
});

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(PORT, () => {console.log(`server started at PORT: ${PORT}`)});