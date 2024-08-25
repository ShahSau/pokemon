import React from 'react'
import css from './image.module.scss'
const Image = ({image, color}:{image:string,color:string}) => {


switch (color) {
  case "fire":
    color = "#ff7402"
    break;
  case "grass":
    color = "#9bcc50"
    break;
  case "steel":
    color = "#9eb7b8"
    break;
  case "water":
    color = "#4592c4"
    break;
  case "psychic":
    color = "#f366b9"
    break;
  case "ground":
    color = "#ab9842"
    break;
  case "ice":
    color = "#51c4e7"
    break;
  case "flying":
    color = "#3dc7ef"
    break;
  case "ghost":
    color = "#4d5b64"
    break;
  case "normal":
    color = "#a4acaf"
    break;
  case "poison":
    color = "#7e0058"
    break;
  case "rock":
    color = "#a38c21"
    break;
  case "fighting":
    color = "#d56723"
    break;
  case "dark":
    color = "#707070"
    break;
  case "bug":
    color = "#729f3f"
    break;
  case "dragon":
    color = "linear-gradiend(180deg, #53a4cf 50%, #f16e57 50%)"
    break;
  case "electric":
    color = "#bba909"
    break;
  case "fairy":
    color = "#fdb9e9"
    break;
  case "shadow":
    color = "#7b62a3"
    break;
  default:
    color = "#757575"
    break;
}
  
  return (
    <div className={css.circleContainer} style={{border: `0.2rem solid ${color}`}}>
        <div className={css.outerCircle} style={{border: `0.3rem solid ${color}`}}>
          <div className={css.innerCircle}>
            <img src={image} alt="" />
          </div>
          <div className={css.lines}>
            <div className={css.line} style={{backgroundColor:`${color}`}}></div>
            <div className={css.line} style={{backgroundColor:`${color}`}}></div>
          </div>
        </div>
      </div>
  )
}

export default Image