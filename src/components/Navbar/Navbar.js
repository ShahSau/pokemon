import React from "react";
import "./style.css";
function Navbar() {
  return (
    <div className="Navbar">
      The datas are fetched from{" "}
      <a href="https://pokeapi.co/api/v2/pokemon">Pokemon API.</a>
    </div>
  );
}

export default Navbar;
