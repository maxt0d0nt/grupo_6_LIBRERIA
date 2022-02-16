import React, {Component} from 'react';
import MovieList from './MovieList';

class Movies extends Component{
    constructor(){
        super();
        this.state = {
            movies : [] //estado inicial
        }

    }

    componentDidMount(){
        fetch('/api/movies')
        .then(response => {
            return response.json()
        })
        .then(movies =>{

            this.setState({
                movies: movies.data
            })
        })
    }

	render(){
    return(
        <React.Fragment>
				    {/*<!-- PRODUCTS LIST -->*/}
					<h1 className="h3 mb-2 text-gray-800">All the movies in the Database</h1>
					
					{/*<!-- DataTales Example -->*/}
					<div className="card shadow mb-4">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-hover" id="dataTable" width="100%" cellspacing="0">
									<thead className='table-primary'>
										<tr>
                                            <th>Id</th>
                                            <th>Titulo</th>
                                            <th>Calificación</th>
                                            <th>Premios</th>
                                            <th>Duración</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
                                            <th>Id</th>
                                            <th>Titulo</th>
                                            <th>Calificación</th>
                                            <th>Premios</th>
                                            <th>Duración</th>
										</tr>
									</tfoot>
									<tbody>
									{
                                    this.state.movies.map((movie, index)=>{
                                        return  <MovieList  {...movie}  key={movie + index} />
                                    })
                                	}
										{/* <tr>
											<td>01</td>
											<td>Reto al destino</td>
											<td>20</td>
                                            <td>15</td>
											<td>120</td>
										</tr>
										<tr>
											<td>02</td>
											<td>La caida del halcon negro</td>
											<td>10</td>
											<td>18</td>
											<td>240</td>
										</tr> */}
									</tbody>
								</table>
							</div>
						</div>
					</div>            
        </React.Fragment>
    )
	}
}
export default Movies;