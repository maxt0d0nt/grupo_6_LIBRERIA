const fs = require ('fs');
const path = require("path");
const Products = {
    fileName: './data/products.json',
    imgDir: '/img/uploads/products/',

    getData: function (){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    creandoID: function(){
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if(lastProduct){
            return lastProduct.id + 1;
        }
        return 1;
    },

    findAll: function(){
        return this.getData();
    },

    dateNow: () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const formattedToday = today.toUTCString()
        return formattedToday
    },

    create: function(productData, file){
        const path =  file ? this.imgDir + file.filename : ''

        let allProducts = this.findAll();

        let newProduct={
            id:this.creandoID(),
            path,
            registered : this.dateNow(),
            ...productData
        }
        allProducts.push(newProduct);

        fs.writeFileSync(this.fileName, JSON.stringify(allProducts,null,' '));
        return newProduct;

    },

    deletePrevImage: (productPath) => {
        const pathDeletePrevImage = path.join(__dirname,`../public/${productPath}`)
        fs.unlinkSync(pathDeletePrevImage)
    },

    edit: function (productId, productData, file) {
        let allProducts = this.findAll();
        const productKey = allProducts.map(p => p.id).indexOf(productId)
        file &&  allProducts[productKey].path.length > 0 ? this.deletePrevImage(allProducts[productKey].path) : ''

        const pathImg =  file ? this.imgDir + file.filename : allProducts[productKey].path

        const updatedProduct = {
            id:productId,
            path: pathImg,
            ...productData
        };

        allProducts[productKey] = updatedProduct;
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return updatedProduct
    },

    delete: function (productId){
        console.log("-> productId", productId);
        let allProducts = this.findAll();
        console.log("-> allProducts", allProducts);

        const productKey = allProducts.findIndex((p) => p.id == productId);
        const pathDeleteImage = path.join(__dirname,`../public/${allProducts[productKey].path}`)
        let finalProducts = allProducts.filter(oneProduct=>oneProduct.id!==productId);

        //delete image
        fs.unlinkSync(pathDeleteImage)

        fs.writeFileSync(this.fileName, JSON.stringify(finalProducts,null,' '));
        return true;
    }

}


module.exports = Products;
