const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express()
const port = 3030
const methodOverride =  require('method-override');
const bodyParser = require("body-parser");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

const sequelize = require ('./databaseC/db')

//DB Class
require('./databaseC/asociations')
const Author = require('./databaseC/models/Author')
const Book = require('./databaseC/models/Book')
const Ecommerce = require('./databaseC/models/Ecommerce')
const Literature = require('./databaseC/models/Literature')
const User = require('./databaseC/models/User')
const ecomerceCategories = [
    {name: "promotion"},
    {name: "bestSeller"}
]
const litCategories = [
    {name: "N/A"},
    {name: "terror"},
    {name: "suspenso"},
    {name: "biografia"},
    {name: "novela"},
    {name: "policial"},
    {name: "ciencia"},
    {name: "religion"},
    {name:"cuentos infantiles"},
    {name:"programacion"},
    {name:"salud"},
]
const authors = [
    {name: "Jose Luis Borges"},
    {name: "Franz Kafka"},
    {name: "George Orwell"},
    {name: "Edgar Allan Poe"},
    {name: "Stephen Covey"},
    {name: "Deepak Chopra"},
    {name: "Robert Kiyosaki y Sharon Lechter"},
    {name: "Stephen King"},
    {name: "Kristin Hannah"},
]
const books = [
    {
        name: "Ficciones",
        author_id: 1,
        img: "/img/uploads/products/ficcionesBorges.jpg",
        description: "Las ediciones actuales de Ficciones reúnen todos los relatos publicados en la edición de 1956 (que agrega tres relatos a la versión de 1944) y siguen dividiendo el libro en dos partes: El jardín de los senderos que se bifurcan y Artificios.     ",
        price: 1450,
        literature_id: 1,
        ecommerce_id: 1
    },
    {
        img: "/img/uploads/products/image-1638741272429.jpg",
        name: "La metamorfosis",
        author_id: 2,
        price: 950,
        description: "La metamorfosis es un relato dividido en tres partes, donde se narra la transformación de Gregorio Samsa, un viajante de comercio de telas, en un monstruoso insecto, y el impacto que tendrá este acontecimiento no solo en su vida, sino en la de su familia.       ",
        literature_id: 1,
        ecommerce_id: 1
    },
    {
        img: "/img/uploads/products/image-1638742707325.jpg",
        name: "1984",
        author_id: 3,
        price: 1600,
        description: "1984 de George Orwell es una novela de distopía cuya trama ocurre en Oceanía, un país dominado por un gobierno totalitario que mantiene en constante vigilancia a sus ciudadanos e, incluso, insiste en espiar sus pensamientos para mantener el orden.         ",
        literature_id: 2,
        ecommerce_id: 1
    },
    {
        name: "El cuervo",
        author_id: 4,
        description: "",
        price: 2100,
        img: "/img/uploads/products/elcuervo.jpg",
        literature_id: 3,
        ecommerce_id: 1
    },
    {
        name: "7 habitos de la gente altamente efectiva",
        author_id: 5,
        description: "Los 7 hábitos de la gente altamente efectiva de Stephen Covey es un libro que habla sobre la importancia de cambiar la percepción que tenemos sobre las situaciones en las que nos encontramos para hacernos responsables de nuestros actos (y de las consecuencias de los mismos), mediante nuevos hábitos.",
        price: 1300,
        img: "/img/uploads/products/7hdlgae.jpg",
        literature_id: 3,
        ecommerce_id: 2
    },
    {
        name: "Las 7 leyes espirituales del éxito Deepak Chopra",
        author_id: 6,
        description: "Deepak Chopra, de una manera magistral, plasma, en pocas hojas todo lo que se puede requerir para tener éxito en la vida, en su libro clásico Las 7 Leyes espirituales del éxit",
        price: 1100,
        img: "/img/uploads/products/7lede.png",
        literature_id: 1,
        ecommerce_id: 2
    },
    {
        name: "Padre Rico, Padre Pobre",
        author_id: 7,
        img: "/img/uploads/products/image-1638421887069.png",
        description: "Padre rico y padre pobre es un libro escrito por Robert Kiyosaki y Sharon Lechter. Evoca el concepto de libertad financiera a través de la inversión, los inmuebles, ser dueño de negocios y el uso de tácticas de protección financiera; está escrito de una forma anecdótica, orientado a crear un interés público en las finanzas. Kiyosaki y Lechter aconsejan que ser dueño de un sistema o forma de producción, es mejor que ser un empleado asalariado. Este es un tema recurrente en los capítulos del lib",
        price: 2100,
        literature_id: 4,
        ecommerce_id: 2
    },
    {
        name: "El visitante (título original: The Outsider)",
        author_id: 8,
        img: "/img/uploads/products/example4.jpg",
        description: "En la ciudad ficticia de Flint City, Oklahoma, el detective de la policía Ralph Anderson arresta al entrenador de béisbol y profesor Terry Maitland frente a una multitud de espectadores, acusándolo de violar, matar y mutilar a un niño de 11 años. La ciudad se vuelve rápidamente contra Maitland, quien insiste en que es inocente y contrata al anciano abogado Howie Gold para que lo ayude, pero Anderson tiene testigos oculares y pruebas físicas claras (ADN y huellas dactilares) de su culpabilidad. Mientras tanto, los ansiosos reporteros acosan a la esposa de Terry, Marcy, y a sus dos hijas, Sarah y Grace. Pronto se revelará que existe algo imposible de explicar en estos terribles eventos.",
        price: 3200,
        literature_id: 5,
        ecommerce_id: 1
    },
    {
        img: "/img/uploads/products/image-1638743234264.jpg",
        name: "Volverás a Alaska",
        author_id: 9,
        price: 500,
        description: "De la autora del best seller internacional El Ruiseñor, una épica historia de amor, pérdida y supervivencia que celebra la resistencia del espíritu humano y la inquebrantable fuerza de las mujeres.        ",
        literature_id: 6,
        ecommerce_id: 2
    }
]
const users = [
    {
        img: "",
        birthday: "1111-11-11T00:00:00.000Z",
        hashedPassword: "$2b$12$js/of3NPjDgyu1kY/xH/NujKCKxrW82CjngN9sXYVRt8GowE3Mhjy",
        name: "root",
        lastname: "toor",
        username: "root",
        email: "root@test.com"
    }
]


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
const apiProductRouter = require('./routes/api/apiProduct')
const apiUserRouter = require('./routes/api/apiUser')
const {DataTypes} = require("sequelize");

//___MAIN___
app.use('/', mainRouter)

app.use('/product', rutesProduct)

app.use('/user', userRouter)

app.use('/api/product', apiProductRouter)

app.use('/api/user', apiUserRouter)

app.listen(port, () => {
    //conect DB
    // sequelize.authenticate()
    //     .then(()=>{
    //         console.log("Conexion db class exitosa")})
    //     .catch(error=>{
    //         console.log("Conexion db fallida", error)})

    //create with Models
    sequelize.sync({force:true})
        .then(()=>{
            console.log("Conexion db class exitosa")})
        .then(()=>{
            ecomerceCategories.map(e => Ecommerce.create(e))
        })
        .then(()=>{
            litCategories.map(e=> Literature.create(e))
        })
        .then(()=>{
            authors.map(e=> Author.create(e))
        })
        .then(()=>{
            books.map(e=> Book.create(e))
        })
        .then(()=>{
            users.map(e=> User.create(e))
        })
        .catch(error=>{
            console.log("Conexion db fallida", error)})


    console.log(`Example app listening at http://localhost:${port}`)
})