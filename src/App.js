import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import Pagination from "./Pagination";

function App() {
    //pokemon array
    const [allPokemon, setAllPokemon] = useState([]);
    //current pokemon array
    const [currentPokemon, setCurrentPokemon] = useState([]);
    //current page state
    const [currentPageUrl, setCurrentPageUrl] = useState(
        "https://pokeapi.co/api/v2/pokemon?limit=12"
    );
    //pagination states
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    //loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // getAllPokemon();
        const getAllPokemon = async () => {
            setLoading(true);
            const res = await fetch(currentPageUrl);
            const data = await res.json();
            //setting state to pull next/prev page
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);

            function createPokemonObject(result) {
                result.forEach(async (pokemon) => {
                    const res = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                    );
                    const data = await res.json();
                    setAllPokemon((totalList) => [...totalList, data]);
                });
            }
            console.log();
            createPokemonObject(data.results);
            setLoading(false);
        };
        getAllPokemon();
    }, [currentPageUrl]);

    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl);
    }

    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl);
    }

    //if loading display text
    if (loading)
        return (
            <div className="container">
                <h1>"Catching them all..."</h1>
            </div>
        );

    return (
        <main>
            <h1>react pokedex</h1>
            <img
                className="pokeapi-img"
                src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                alt=""
            />
            <div className="btn-container">
                <Pagination
                    gotoNextPage={nextPageUrl ? gotoNextPage : null}
                    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                />
            </div>
            <div className="container">
                {allPokemon.map((pokemon, index) => (
                    <PokeCard
                        key={index}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.sprites.other.dream_world.front_default}
                        type={pokemon.types[0].type.name}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;
