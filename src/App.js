import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./components/Card";
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Navbar from "./components/Navbar";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    //will take a array of promises and return the array when all the promises have resolved
    let _pokemondata = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemondata);
  };
  console.log(pokemonData);
  return (
    <div>
      {loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Navbar />

          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}></Card>;
            })}
          </div>
          <div className="btn">
            <button type="button" class="btn btn-primary" onClick={prev}>
              Prev
            </button>
            <button type="button" class="btn btn-primary" onClick={next}>
              Next
            </button>
          </div>
          <p class="bottom">Made with ❤ from Helsinki</p>
        </>
      )}
    </div>
  );
}

export default App;
