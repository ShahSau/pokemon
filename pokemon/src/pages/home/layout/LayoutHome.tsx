import React, { useEffect, useState } from "react";
import css from "./layout.module.scss";
import Header from "../header/Header";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import { URL_POKEMON } from "../../../api/apiRest";
import Card from "../card/Card";


type PokemonArray ={
  name: string;
  url: string;
}

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState<PokemonArray[]>([]);
  const [globalPokemon, setGlobalPokemon] = useState<PokemonArray[]>([]);
  const [xpage, setXpage] = useState(1);
  const [search, setSearch] = useState('');



  useEffect(() => {
    const api = async () => {
      const limit = 20;
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(
        `${URL_POKEMON}?offset=${xp}&limit=${limit}`
      );
      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [xpage, search]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);

    const promises = res.data.results.map((pokemon: PokemonArray) => {
      return pokemon;
    });

    const results:PokemonArray[] = await Promise.all(promises);
    setGlobalPokemon(results);
    localStorage.setItem('pokemons', JSON.stringify(results))
  };


  const filterPokemons = search?.length > 0 
  ? globalPokemon?.filter(pokemon =>  pokemon?.name?.includes(search))
  : arrayPokemon



  const obtenerSearch = (e: string) => {
    const texto = e.toLowerCase()
    setSearch(texto)
    setXpage(1)
  }



  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch}  />

      <div className={css.card_content}>
        {filterPokemons.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>

      <section className={css.section_pagination}>
            <div className={css.div_pagination}>
              <span className={css.item_izquierdo}
              
              onClick={() => {
                if (xpage === 1) {
                  return console.log("first page");
                }
                setXpage(xpage - 1);
              }}
              
              >
                <FaIcons.FaAngleLeft />
              </span>
              
              {xpage > 2  && <span className={css.item} onClick={()=> setXpage(xpage-2)}> {xpage-2} </span>}
              {xpage > 1 && <span className={css.item} onClick={()=> setXpage(xpage-1)}> {xpage-1} </span>}
              <span className={css.item}> {xpage} </span>
              {xpage < (Math.floor(globalPokemon?.length / 15)-3) &&<span className={css.item} onClick={()=> setXpage(xpage+1)}> {xpage+1} </span>}
              {xpage < (Math.floor(globalPokemon?.length / 15)-3) && <span className={css.item} onClick={()=> setXpage(xpage+2)}> {xpage+2} </span>}
              <span className={css.item}> ... </span>
              {xpage < (Math.floor(globalPokemon?.length / 15)-2) && <span className={css.item} onClick={()=> setXpage(Math.floor(globalPokemon?.length / 15)-2)}> {Math.floor(globalPokemon?.length / 15)-2} </span>}
              {xpage < (Math.floor(globalPokemon?.length / 15)-2) && <span className={css.item} onClick={()=> setXpage(Math.floor(globalPokemon?.length / 15)-1)}> {Math.floor(globalPokemon?.length / 15)-1} </span>}
              {xpage < (Math.floor(globalPokemon?.length / 15)-1) && <span className={css.item} onClick={()=>setXpage(Math.floor(globalPokemon?.length / 15))}>
                {" "}
                {Math.floor(globalPokemon?.length / 15)}{" "}
              </span>}
              {xpage < (Math.floor(globalPokemon?.length / 15)) && <span
                className={css.item_derecho}
                onClick={() => {
                  if (xpage === 67) {
                    return console.log("last page");
                  }
                  setXpage(xpage + 1);
                }}
              >
                {" "}
                <FaIcons.FaAngleRight />{" "}
              </span>}
            </div>
      </section>

    </div>
  );
}
