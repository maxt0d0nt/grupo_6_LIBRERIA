const express = require('express')
var path = require('path');
const app = express()
const port = 3030


const filePage = {
    index: 'index',
    login: 'login',
    register: 'register',
    productCart: 'productCart',
    productDetail: 'productDetail'
}
const views = ['/', '/login', '/register', '/productCart', '/productDetail']


app.use(express.static('public'));

app.set('view engine', 'ejs')
//app.set('views', './caprtea-de-vistas')

/*VIEWS HTML CONTROLLER*/
app.get(views, (req, res) => {
    switch(req.path){
        case '/':
            res.render('index')
            break;
        default:
            let page = req.path.slice(1, req.path.length)
            res.render(filePage[page]);
    }

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})