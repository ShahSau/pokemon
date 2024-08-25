import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {
    URL_POKEMON,
    URL_ABILITY,
    URL_CHARACTER
  } from "../../api/apiRest";
import Image from './imageContainer/Image';
import css from "./details.module.scss";
import logo from "/pokemonlogo.png";
import Header from '../home/header/Header';

const Details = () => {
    const [itemPokemon, setItemPokemon] = useState([]);
    const [ability, setAbility] = useState({});
    const [character, setCharacter] = useState({});
    const [numberEven, setNumberEven] = useState(false);
    const { id } = useParams();

    useEffect(() => {
      const dataPokemon = async () => {
        const api = await axios.get(`${URL_POKEMON}/${id}`);
        setItemPokemon(api.data);
      };

      const dataAbility = async () => {
        const api = await axios.get(`${URL_ABILITY}/${id}`);
        setAbility(api.data);
      }

      const dataCharacter = async () => {
        const api = await axios.get(`${URL_CHARACTER}/${id}`);
        setCharacter(api.data);
      }

      dataPokemon();
      dataAbility();
      dataCharacter();
    }, [id]);
    
    const checkNumber = () => {
      const number = Math.floor(Math.random() * 10);
      if (number % 2 === 0) {
        let arr = JSON.parse(localStorage.getItem("pokemonCaught") || "[]");
        arr.push(itemPokemon);
        localStorage.setItem("pokemonCaught", JSON.stringify(arr));
        setNumberEven(true);
      } else {
        setNumberEven(true);
      }
    }

    console.log(numberEven)
    
  return (
    <>
      <Header obtenerSearch={() => {}} />
      <div className={css.conatiner}>
        {/* image*/}
        <div className={css.imageContainer}>
            <Image image={itemPokemon?.sprites?.other["official-artwork"].front_default} color={itemPokemon?.types?.[0]?.type?.name}/>
        </div>
        {/* name */}
        <div className={css.nameContainer}>
          <div className={css.name}>{itemPokemon?.name}</div>
        </div>
        <div className={css.type}>Type: {itemPokemon?.types?.[0]?.type?.name}</div>
        
        <div className={css.floatparentelement}>
          <div className={css.floatchildelement}>
            <div className={css.left}>
              <div className={css.abilityContainer}>
                Character:
                <div>Height: {itemPokemon?.height}</div>
                <div>Weight: {itemPokemon?.weight}</div>
              </div>
              <div className={css.special}>
                  {Object.keys(character).length !=0 && character?.descriptions.map((item:any) => {
                    if (item?.language.name === "en") {
                    return (
                      <div key={item} className={css.feature}>
                        Interesting feature: {item.description}
                      </div>
                    )
                  }
                  })}
                  {Object.keys(character).length !=0 && <div className={css.power}>
                    Power: {character?.highest_stat?.name}
                    </div>}
              </div>
              
              {itemPokemon.length !=0 && <div className={css.abilityContainer}>
                Abilities:
                {itemPokemon?.abilities.map((item:any) => {
                return (
                  <div key={item.ability.name}>
                    {item.ability.name}
                  </div>
                )
              })}
              </div>}
              
            </div>
          </div>
          <div className={css.floatchildelement}>
            <div className={css.right}></div>
          </div>
        </div>


        <div className={css.floatparentelement}>
          <div className={css.floatchildelement}>
            <div className={css.right}>
            </div>
          </div>
          <div className={css.floatchildelement}>
            <div className={css.left}>
            <div className={css.abilityContainernew}>
                {Object.keys(ability).length !=0 && <div>
                  <div style={{textAlign:"center", paddingBottom:"20px"}}>{ability.name}</div>
                  <div>{ability.effect_entries[1].effect}</div>
                </div>}
            </div>
            
            </div>
          </div>

        </div>
        <div className={css.catch} onClick={checkNumber}>
          <img src={logo} alt="logo" />
        </div>
        {numberEven == true && <div className={css.modal}>
            <div className={css.popup}>
              <div className={css.close} onClick={()=>setNumberEven(false)}>&times;</div>
              <div className={css.content}>
                Congratulation!!! You caught the pokemon. 
              </div>
            </div>
        </div>}

    </div>
    </>
    
  )
}

export default Details