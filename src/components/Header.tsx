import { GenreResponseProps } from '../interface/genreResponse';

const Header = ({ selectedGenre }: { selectedGenre: GenreResponseProps }) => {
  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
};

export default Header;
