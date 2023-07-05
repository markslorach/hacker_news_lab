import React, { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";

const MainContainer = () => {
  const [stories, setStories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getStories = () => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => res.json())
      .then((data) => {
        let storyFetches = data.map((storyId) => {
          return fetch(
            "https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json"
          ).then((res) => res.json());
        });
        Promise.all(storyFetches).then((data) => setStories(data));
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
    
  };
  
  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
  const filtered = searchInput.length > 0
    ? stories.filter((article) => article.title.match(searchInput))
    : stories;
  setStories(filtered);
}, [searchInput]);

  return (
    <>
      <h1>Stories</h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <ArticleList articles={stories} />
    </>
  );
};

export default MainContainer;
