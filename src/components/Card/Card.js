import React from "react";
import "./style.css";
import pokemonType from "../../helpers/pokemonTypes";
function Card({ pokemon }) {
  return (
    <div className="card">
      <div className="card__img">
        <img src={pokemon.sprites.front_default} alt=""></img>
      </div>
      <h5 className="card-title">{pokemon.name}</h5>
      <div className="card__types">
        {pokemon.types.map((type) => {
          return (
            <div
              className="card__type"
              style={{ backgroundColor: pokemonType[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="card__info">
        <div className="card__data">
          <p className="try">Weight: {pokemon.weight} </p>
          <p className="try">Height: {pokemon.height} </p>
        </div>

        <div className="card__data">
          <p className="try">Order: {pokemon.order} </p>
          <p className="try">base: {pokemon.base_experience} </p>
        </div>
        <div className="card__data"></div>

        <div className="card__data">
          <p className="">
            Abilities:{" "}
            {pokemon.abilities.map((ability) => {
              return <p>{ability.ability.name}</p>;
            })}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
