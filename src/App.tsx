import { useEffect, useState, useLayoutEffect } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import Header from './components/Header';
import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

import { GenreResponseProps } from './interface/genreResponse';
import { MovieProps } from './interface/moviesProps';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    localStorage.setItem('genreId@WatchMe', JSON.stringify(selectedGenreId));
  }, [selectedGenreId])

  useLayoutEffect(() => {
    const verificatorGenreId = localStorage.getItem('genreId@WatchMe')
    if(verificatorGenreId) {
      const localStorageGenreId: number = JSON.parse(verificatorGenreId)
      setSelectedGenreId(localStorageGenreId)
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} setSelectedGenreId={setSelectedGenreId}/>
      <div className="container">
        <Header selectedGenre={selectedGenre}/>
        <Content movies={movies} />
      </div>
    </div>
  )
}