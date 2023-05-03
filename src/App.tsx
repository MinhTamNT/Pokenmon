import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Pokemon } from "./types/interfacePokemon.ts";
import PokemonCollection from "./components/PokemonCollection.tsx";
import { Detatil } from "./types/interfaceDetails.ts";
interface Pokemons {
  name: String;
  url: String;
}

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNexUrL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetails, setViewDetail] = useState<Detatil>({
    id: 0,
    isOpen: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=10"
      );
      setNexUrL(res.data.next);

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemon((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);
  const handlerLoadMore = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNexUrL(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemon((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemon={pokemon}
          viewDetails={viewDetails}
          setViewDetail={setViewDetail}
        />
        {viewDetails.isOpen ? (
          <></>
        ) : (
          <>
            <div className="btn">
              <button onClick={handlerLoadMore}>
                {loading ? "loading" : "Load more"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
