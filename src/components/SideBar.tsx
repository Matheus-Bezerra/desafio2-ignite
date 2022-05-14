import { useState, useEffect } from "react";
import { GenreResponseProps } from "../interface/genreResponse";
import { api } from "../services/api";
import { Button } from "./Button";

export function SideBar({selectedGenreId,setSelectedGenreId}: {selectedGenreId: number,setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>}) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (<nav className="sidebar">
        <span>Watch<p>Me</p></span>
        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
  )
}