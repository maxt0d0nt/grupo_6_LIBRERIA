import React from 'react';
import './assets/css/app.css';
import ContentRowMovies from './components/ContentRowMovies';
import Footer from './components/Footer';
import Genre from './components/Genre';
import GenresInDb from './components/GenresInDb';
import Movie from './components/Movie';
import MovieList from './components/MovieList';
import SideBar from './components/SideBar';
import SmallCard from './components/SmallCard';
import TopBar from './components/TopBar';
//import {link,route,switch} from react-router-dom;
function App() {
  return (
    
    <React.Fragment>
      	<div id="wrapper">
          <ContentRowMovies />
          <Footer />
          <Genre />
          <GenresInDb />
          <Movie />
          <MovieList />
           <SideBar />
           <SmallCard />
           <TopBar />
        </div>
    </React.Fragment>
  );
}

export default App;
