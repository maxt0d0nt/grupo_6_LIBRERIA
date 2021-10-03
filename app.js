const express = require('express')
var path = require('path');
const app = express()
const port = 3030


const filePage = {
    index: '/view/index.html',
    login: '/view/login.html',
    register: '/view/register.html',
    productCart: '/view/productCart.html',
    productDetail: '/view/productDetail.html'
}
const views = ['/', '/login', '/register', '/productCart', '/productDetail']


app.use(express.static('public'));

/*VIEWS HTML CONTROLLER*/
app.get(views, (req, res) => {
    switch(req.path){
        case '/':
            res.sendFile(path.join(__dirname, filePage.index));
            break;
        default:
            let page = req.path.slice(1, req.path.length)
            res.sendFile(path.join(__dirname, filePage[page]));
    }

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})