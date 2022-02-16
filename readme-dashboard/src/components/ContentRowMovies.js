import React from 'react';
import SmallCard from './SmallCard';

let productInDataBase = {
    color:   "primary",
    titulo: "Movies in Data Base",
    valor: 21,
    icono: "fas fa-film",
}

let amount ={
    color:   "success",
    titulo: "Total awards",
    valor: 79,
    icono: "fas fa-award",
}

let user = {
    color:   "warning",
    titulo: "Actors quantity",
    valor: 49,
    icono: "fas fa-user",
}

// let cardProps = [productInDataBase,amount,user];


function ContentRowTop(){
    const [user, setUser] = React.useState({color:   "warning",titulo: "Usuarios registrados", icono: "fas fa-user", valor:0} )
    const [books, setBooks] = React.useState({color:   "warning",titulo: "Libros registrados", icono: "fas fa-award", valor:0} )
    const [cardProps, setCardProps] = React.useState([user, books])
    const [load, setLoad] = React.useState(false)
    const [rerender, setRerender] = React.useState(false)
    const book = React.useRef()
    const users = React.useRef()
    console.log("GET API")
    React.useEffect(()=> {
        //get libros
        fetch('/api/product/getAll')
          .then (response => {
              return response.json()
          })
          .then(products => {
              books.valor = products.total
              book.current = books
              setBooks(books)

          })
            .catch(e => {
                console.log("-> error", e);
            });

        //get users
        fetch('/api/user/getAll')
          .then (response => {
              return response.json()
          })
          .then(response => {
              console.log("-> user", response);
              user.valor = response.total
              setUser(user)
              users.current = user

          })
          .catch(e => {
              console.log("-> error", e);
          });

    },[])

    React.useEffect(()=> {
        setCardProps([users.current, book.current])
        setRerender(!rerender)
    },[books, user])

    console.log("-> cardProps", cardProps);
    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((p,index) =>
                  <SmallCard
                    color={p.color}
                    titulo={p.titulo}
                    icono={p.icono}
                    valor={p.valor}
                    key={Math.random()}
                  />
                )
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowTop;