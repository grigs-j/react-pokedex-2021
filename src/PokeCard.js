import React from "react";
import pokeball from "./images/pokeball.png";

const PokeCard = ({ id, name, image, type }) => {
    const style = `pokecard ${type}`;
    return (
        <div className={style}>
            <div className="card-number">#0{id}</div>
            <img src={image} alt={name} />
            <div className="poke-info-wrapper">
                <p className="card-name">{name}</p>
                <p className="card-type">{type} type</p>
            </div>
        </div>
    );
};

export default PokeCard;
