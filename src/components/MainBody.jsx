import { useState, useEffect } from "react";

function MemoryCard() {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    fetchPokemon().then((data) => {
      setLoading(false);
      setPosts(data);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchPokemon().then((data) => {
      setLoading(false);
      setPosts(data);
      console.log(data);
      handleClick();
    });
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <CardContainer
            onClick={handleClick}
            image={posts.sprites.front_default}
            name={posts.name}
          />
          <CardContainer
            onClick={handleClick}
            image={posts.sprites.back_default}
            name={posts.name}
          />
        </main>
      )}
    </>
  );
}

function CardContainer({ onClick, image, name }) {
  return (
    <div className="post-container" onClick={onClick}>
      <img src={image} className="post-image" alt="pokemon" />
      <p className="post-name">{name}</p>
    </div>
  );
}

async function fetchPokemon() {
  const randomNumber = Math.floor(Math.random() * 18) + 1;
  const api = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

export default MemoryCard;
