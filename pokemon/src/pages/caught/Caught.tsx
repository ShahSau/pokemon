import React from 'react'
import Card from '../home/card/Card';

const Caught = () => {
    const caughtPokemon = JSON.parse(localStorage.getItem("pokemonCaught") || "[]");
    console.log(caughtPokemon)
  return (
    <div>
        <h1>Caught Pokemon</h1>
        {/* create a card for caught pokemon display*/}
        {/* {caughtPokemon.map((item: any, index: number) => (
            <Card key={index} item={item} />
        ))} */}
    </div>
  )
}

export default Caught