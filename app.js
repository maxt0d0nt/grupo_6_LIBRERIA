const express = require('express')
var path = require('path');
const app = express()
const port = 3030
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const bodyParser = require("body-parser");


app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(bodyParser.urlencoded({extended: false}));

/*CONTROLLERS IMPORT */
const productController = require('./controllers/productController')
const mainController = require('./controllers/mainController')

const filePage = {
    login: 'login',
    register: 'register',
    productCart: 'productCart',
}
const views = ['/login', '/register', '/productCart'];

/*ROUTES-----*/
const rutesProduct = require('./routes/product');
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');

/*PUBLIC FILES-----*/
app.use(express.static('public'));

app.set('view engine', 'ejs')
//app.set('views', './caprtea-de-vistas')

/*VIEWS HTML CONTROLLER*/
app.get(views, (req, res) => {
    switch(req.path){
        case '/':
            res.render('index', {products})
            break;
        default:
            let page = req.path.slice(1, req.path.length)
            res.render(filePage[page]);
    }

})

app.use('/', mainRouter)

//app.get('/product', productController.index);
app.use('/product', rutesProduct)
app.use('/user', userRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})