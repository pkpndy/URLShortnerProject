const express = require('express');
const URL = require('./models/url');
const path = require('path');
const {connectMongoDB} = require('./connection')
const cookieParser = require('cookie-parser');
const {checkForAuthentication, restrictTo} = require('./middlewares/auth')

const app = express();
const PORT = 8001;

const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');

connectMongoDB('mongodb://127.0.0.1:27017/shortURL') //we give the DB name we want to connect to, in the end
.then(() => {console.log("mongoDB connected")})
.catch((err) => {console.log(err)});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); //to support json data
app.use(express.urlencoded({extended: false})); //to support form
app.use(cookieParser());
app.use(checkForAuthentication);

app.get('/test', async  (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {urls: allUrls});
});

//middlware in the middle here will basically run before
//passing any request to the urlRoute
app.use('/url', restrictTo(["NORMAL"]) , urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {console.log(`server started at PORT: ${PORT}`)});