
import './App.css';
import { useState } from 'react';

function App() {

  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [init, setIsInit] = useState(true);


  const getRandomJoke = async () => {

    try {
      setIsInit(false);
      setIsLoading(true);
      setError(false);
      setJoke(null);
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await res.json();
      setJoke(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      setJoke(null);
    }
  }

  const renderContent = () => {
    if (init) {
      return <p>No Joke Yet.</p>
    }

    if (error) {
      return (<div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ color: "red" }}>Could not fetch a joke. Try again.</p>
        <button
          onClick={getRandomJoke}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
            fontSize: "1rem"
          }}
        >
          Try Again
        </button>
      </div>);
    }

    if (joke) {
      return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p>{joke.setup}</p>
        <h6>{joke.punchline}</h6>
      </div>)
    }
  }



  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Random Joke</h1>
        <p>Click the button to fetch a fresh one.</p>
        <button className="btn" onClick={getRandomJoke} disabled={isLoading}>{isLoading ? "Fetching..." : "Fetch joke"}</button>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
