import { PokemonDetail } from "../types/interfacePokemon";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detatil } from "../types/interfaceDetails";
interface IProps {
  pokemon: PokemonDetail[];
  viewDetails: Detatil;
  setViewDetail: React.Dispatch<React.SetStateAction<Detatil>>;
}
const PokemonCollection: React.FC<IProps> = (props) => {
  const { pokemon, viewDetails, setViewDetail } = props;
  const selectionPokemon = (id: number) => {
    if (!viewDetails.isOpen) {
      setViewDetail({
        id: id,
        isOpen: true,
      });
    }
  };
  return (
    <section
      className={
        viewDetails.isOpen
          ? "collection-container-active"
          : "collection-conatainer"
      }
    >
      {viewDetails.isOpen ? <div className="overlay"></div> : <></>}
      {pokemon.slice(0).map((pokemons) => (
        <div onClick={() => selectionPokemon(pokemons.id)}>
          <PokemonList
            key={pokemons.id}
            name={pokemons.name}
            viewDetails={viewDetails}
            setViewDetail={setViewDetail}
            id={pokemons.id}
            abilities={pokemons.abilities}
            image={pokemons.sprites.front_default}
          />
        </div>
      ))}
    </section>
  );
};
export default PokemonCollection;
