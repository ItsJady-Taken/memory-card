import { useState, useEffect } from "react";

function MemoryCard() {
  const [posts, setPosts] = useState([]);

  const api = "https://pokeapi.co/api/v2/pokemon/riolu";
  useEffect(() => {
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) =>
        console.log("There was a problem with the fetch operation: " + error)
      );
  }, []);

  return (
    <div className="post-container">
      <img
        src={posts.sprites?.front_default}
        className="post-image"
        alt="pokemon"
      />
      <p className="post-name">{posts.name}</p>
    </div>
  );
}

export default MemoryCard;
