import { useState, useEffect } from "react";

function MemoryCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    fetchPokemon(8).then((data) => {
      setLoading(false);
      setPosts(data);
      console.log(data);
    });
  };
  useEffect(() => {
    fetchPokemon(8).then((data) => {
      setLoading(false);
      setPosts(data);
      console.log(data);
      handleClick();
    });
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <h1>Fetching...</h1>
      ) : (
        <main className="main-body">
          {posts.map((pokemon) => (
            <CardContainer
              id={pokemon.id}
              key={pokemon.id}
              onClick={handleClick}
              image={pokemon.sprites.front_default}
              name={pokemon.name}
            />
          ))}
        </main>
      )}
    </>
  );
}

function CardContainer({ onClick, image, name, id, keyId }) {
  return (
    <div key={keyId} id={id} className="post-container" onClick={onClick}>
      <img src={image} className="post-image" alt="pokemon" />
      <p className="post-name">{name}</p>
    </div>
  );
}

async function fetchPokemon(count) {
  const pokemonIds = [];

  while (pokemonIds.length < count) {
    const randomId = Math.floor(Math.random() * 24) + 1;
    if (!pokemonIds.includes(randomId)) {
      pokemonIds.push(randomId);
    }
  }
  const promises = pokemonIds.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
      response.json()
    )
  );

  const pokemonlist = await Promise.all(promises);
  return pokemonlist;
}

export default MemoryCard;
