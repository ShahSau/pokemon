import React from "react";
import * as FaIcons from "react-icons/fa";
import css from "./header.module.scss";
import logo from "/pokemon.png";
import { Link, useParams } from "react-router-dom";

export default function Header({ obtenerSearch }: { obtenerSearch: (event: string) => void }) {
  const { id } = useParams();
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div>
          
          <h3>
            <Link to="/pokemon/caught">Caught Pokemon</Link>
            
          </h3>
        </div>
        {id == undefined && <div className={css.div_search}>
          <div>
            <FaIcons.FaSearch />
          </div>
          <input
            type="search"
            onChange={(e) => obtenerSearch(e.target.value)}
          />
        </div>}
      </div>
    </nav>
  );
}
