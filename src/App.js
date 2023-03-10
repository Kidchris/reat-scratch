import { useState, useEffect } from "react";

import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const App = () => {
    const API_URL = "http://www.omdbapi.com/?apikey=cfbdcf93";

    const [movies, setMovies] = useState([]);
    const [keyWord, setKeyWord] = useState('');


    const searchMovies = async (title) => {

        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Iron Man');
    }, []);
    return (
        <div className="app">
            <h1>Some movies ... </h1>

            <div className="search">
                <input type="text" className="search-box" placeholder="Search for a movie"
                    value={keyWord}
                    onChange={(e) => { setKeyWord(e.target.value) }}
                />
                <img src={SearchIcon} alt="searchIcon" onClick={() => { searchMovies(keyWord) }} />
            </div>
            {
                movies?.length > 0 ? <div className="container">
                    {movies.map(
                        (movie, index) => <MovieCard key={index} movie={movie} />
                    )}
                </div> :
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
            }

        </div>
    )
}

export default App