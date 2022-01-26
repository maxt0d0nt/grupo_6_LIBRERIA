const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express()
const port = 3030
const methodOverride =  require('method-override');
const bodyParser = require("body-parser");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

//SETTINGS-------
app.set('view engine', 'ejs')

// => Session
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret:"ReedmeSecrets",
    resave: false,
    saveUninitialized:false,
}));

// => Middleware
app.use(userLoggedMiddleware);


// => Public file
app.use(express.static('public'));

//ROUTES-------
const rutesProduct = require('./routes/product');
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');

//___MAIN___
app.use('/', mainRouter)

app.use('/product', rutesProduct)

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})