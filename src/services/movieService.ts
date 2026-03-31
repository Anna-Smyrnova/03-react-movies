import axios from "axios";
import type {Movie} from "../types/movie"


const myKey = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.headers.common.Authorization = `Bearer ${myKey}`

interface GetMoviesRes{
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
  }



export const getMovies = async (query: string): Promise<Movie[]> => {
const response = await axios.get<GetMoviesRes>( '/search/movie', {
  params: {query, include_adult: false,}
}
)
return response.data.results;
}