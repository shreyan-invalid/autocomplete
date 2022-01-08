import React from "react";
import "./App.css";
import SearchBar from './Components/SearchBar';


function App() {
  return (
    <div className="App">
      <h1>Pokemon Autocomplete</h1>
      <h2>You can search any pokemon here</h2>
      <div className="logo"></div>
      <div className="auto-container">
        <SearchBar />
      </div>
    </div>
  );
}

export default App;