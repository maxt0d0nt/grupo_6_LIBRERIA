const express = require('express')
var path = require('path');
const app = express()
const port = 3030
/*CONTROLLERS IMPORT */
const productController = require('./controllers/productController')


const filePage = {
    index: 'index',
    login: 'login',
    register: 'register',
    productCart: 'productCart',
    productDetail: 'productDetail'
}
const views = ['/', '/login', '/register', '/productCart', '/productDetail'];

/*ROUTES-----*/
const rutesProduct = require('./routes/product');


/*PUBLIC FILES-----*/
app.use(express.static('public'));

app.set('view engine', 'ejs')
//app.set('views', './caprtea-de-vistas')

/*VIEWS HTML CONTROLLER*/
app.get(views, (req, res) => {
    //DATOS ----
    const products = {
        bestSeller: [
            {
                name: "Libro 1",
                path: "/img/example1.jpg"
            },
            {
                name: "Libro 2",
                path: "/img/example2.jpg"
            },
            {
                name: "Libro 3",
                path: "/img/example3.jpg"
            },
            {
                name: "Libro 4",
                path: "/img/example4.jpg"
            }
        ],
        promotion:[
            {
                name: "Libro 1",
                path: "/img/example1.jpg"
            },
            {
                name: "Libro 2",
                path: "/img/example2.jpg"
            },
            {
                name: "Libro 3",
                path: "/img/example3.jpg"
            },
            {
                name: "Libro 4",
                path: "/img/example4.jpg"
            }
        ],

    }

    switch(req.path){
        case '/':
            res.render('index', {products})
            break;
        default:
            let page = req.path.slice(1, req.path.length)
            res.render(filePage[page]);
    }

})

//app.get('/product', productController.index);
app.use('/productos', rutesProduct)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})