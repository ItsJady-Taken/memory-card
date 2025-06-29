import { useState, useEffect } from "react";

function MemoryCard() {
  const [posts, setPosts] = useState([]);
  const [trackId, setTrackId] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleClick = () => {
    fetchPokemon(8).then((data) => {
      setPosts(data);
    });
  };
  const handleScore = (pokemonId) => {
    setTrackId([...trackId, pokemonId]);
    if (trackId.includes(pokemonId)) {
      setScore(0);
      setTrackId([]);
    } else {
      setScore(score + 1);
    }
    setBestScore(score > bestScore ? score : bestScore);
  };

  useEffect(() => {
    fetchPokemon(8).then((data) => {
      setPosts(data);
      // console.log(data);
    });
  }, []);

  return (
    <>
      <aside className="score-board">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </aside>
      {posts.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <main className="main-body">
          {posts.map((pokemon) => (
            <CardContainer
              id={pokemon.id}
              key={pokemon.id}
              onClick={() => {
                handleClick();
                handleScore(pokemon.id);
              }}
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
      <div className="post-image-container">
        <img src={image} alt={name} className="post-image" />
      </div>
      <div className="post-name-container">
        <p className="post-name">{name}</p>
      </div>
    </div>
  );
}

async function fetchPokemon(count) {
  const pokemonIds = [];

  while (pokemonIds.length < count) {
    const randomId = Math.floor(Math.random() * 20) + 1;
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
