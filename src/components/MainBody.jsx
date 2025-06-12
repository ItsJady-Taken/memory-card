import { useState, useEffect } from "react";

function Body() {
  const [posts, setPosts] = useState([]);
  const api = "https://pokeapi.co/api/v2/pokemon/riolu";
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Body</h1>
      <p>{posts.name}</p>
      <img src={posts.sprites.front_default} alt="pokemon" />
    </div>
  );
}

export default Body;
