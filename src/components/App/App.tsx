import { useState } from 'react';
import css from "./App.module.css";
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';
import { getMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';


export default function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const [loading, setLoading] = useState(false);
const [selectMovie, setSelectMovie] = useState <Movie | null>(null);
const [isError, setIsError] = useState<boolean>(false);

const openModal = (movie: Movie) => setSelectMovie(movie);
const closeModal = () => setSelectMovie(null);


const searchSubmit = async (searchQuery: string) => {
   try {
    
setLoading(true);
setMovies([]);
setIsError(false);
const newMovie = await getMovies(searchQuery);
if (newMovie.length === 0)
{
 toast.error('No movies found for your request.')
 return}
setMovies(newMovie);
setQuery(searchQuery);
   }
   catch{
    setIsError(true)
   } finally {
    setLoading (false);
   }
}


return (

<div>
<SearchBar onSubmit={searchSubmit}/>
<Toaster position='top-center'/>
{loading && <Loader />}
{movies.length> 0 && <MovieGrid movies={movies}
onSelect={openModal}/>}
{selectMovie && <MovieModal movie={selectMovie} onClose={closeModal}/>}
{isError && <ErrorMessage />}

</div>
)
}
