import { useEffect, useState } from "react";
import { Detatil } from "../types/interfaceDetails";
import "./pokemon.css";
interface IProps {
  viewDetails: Detatil;
  setViewDetail: React.Dispatch<React.SetStateAction<Detatil>>;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}
const PokemonList: React.FC<IProps> = (props) => {
  const { name, id, image, abilities, viewDetails, setViewDetail } = props;
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetails?.id);
  }, [viewDetails]);
  const handlerColseDetail = () => {
    setViewDetail({
      id: 0,
      isOpen: false,
    });
  };
  return (
    <>
      <div className="">
        {isSelected ? (
          <>
            <section className="pokemon-list-detailed">
              <div className="detail-container">
                <div className="detail-close" onClick={handlerColseDetail}>
                  X
                </div>
                <div className="detail-info">
                  <img src={image} alt="pokemon" className="detail-img" />
                  <p className="detail-name">{name}</p>
                </div>
                <div className="detail-skill">
                  <p className="detatil-ability">Abilities:</p>
                  {abilities?.map((ab: any) => {
                    return <>{ab.ability.name}</>;
                  })}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="pokemon-list-container">
              <p className="pokemon-name">{name}</p>
              <img alt="poke" src={image} />
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default PokemonList;
