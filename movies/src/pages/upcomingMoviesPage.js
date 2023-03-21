import React from "react";
import { getUpcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = (props) => {
const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
const mustwatch = movies.filter(m => m.playlist)
localStorage.setItem('mustwatch', JSON.stringify(mustwatch))
const PlaylistAdd = (movieId) => true 

  return (
    <PageTemplate
      title='Discover Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;

