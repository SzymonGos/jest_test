import { useState, useEffect } from "react";

const url = 'https://api.chucknorris.io/jokes/random'

const Jokes = () => {
  const [randomJoke, setRandomJoke] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)

  const fetchRandomJoke = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json()
      setRandomJoke(data);
      setIsLoading(false);
      setSuccess(true)
    }
    catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    fetchRandomJoke();
  }, [])

  return (
    <>
      <header className='header'>
        <div>
        {isLoading && <h4 data-testid='fetch-loading'>Loading...</h4>}
        {error && <h4 data-testid='fetch-error'>Network Error</h4>}
        {success && <img
            src={randomJoke.icon_url}
            alt="chuck head" 
            data-testid='fetch-img'  
            />}
          {success && <p data-testid='fetch-joke'>"{randomJoke.value}"</p>}
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