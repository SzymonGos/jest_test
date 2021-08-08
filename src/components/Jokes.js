import { useState, useEffect } from "react";

const url = 'https://api.chucknorris.io/jokes/random'

const Jokes = () => {
  const [randomJoke, setRandomJoke] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRandomJoke = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const resp = await fetch(url);
      const data = await resp.json()
      setRandomJoke(data);
      setIsLoading(false);
    }
    catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchRandomJoke();
  }, [])

  // console.log(randomJoke);

  if (error) {
    return <header className='header'>
      <h4 data-testid='fetch-error'>Network Error</h4>
    </header>
  }

  if (isLoading) {
    return <header className='header'>
      <h4 data-testid='fetch-loading'>Loading...</h4>
    </header>
  }

  return (
    <>
      <header className='header'>
        <div>
          <img
            src={randomJoke.icon_url}
            alt="chuck head" 
            data-testid='fetch-img'  
            />
          <p data-testid='fetch-joke'>"{randomJoke.value}"</p>
        </div>
      </header>
      <div className="btn-container">
        <button
          type='button'
          className='btn'
          onClick={fetchRandomJoke}
          data-testid='fetch-btn'
        >
          Refresh
        </button>
      </div>
    </>
  );
}

export default Jokes;