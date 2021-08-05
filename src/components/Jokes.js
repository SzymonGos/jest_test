import { useState, useEffect} from "react";

const url = 'https://api.chucknorris.io/jokes/random'

const Jokes = () => {
    const [randomJoke, setRandomJoke] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchRandomJoke = async () => {
      setIsLoading(true);
      setError(false);
        const resp = await fetch(url);
        const data = await resp.json()
        setRandomJoke(data);
        setIsLoading(false);
    }
  
    useEffect(() => {
      fetchRandomJoke();
    }, [])

    if(error){
        return <header className='header'>
            <h4>Network Error</h4>
        </header>
    }

    return (
          <>
            <header className='header'>
              {(isLoading)
                ? <h4>Loading...</h4>
                : <div>
                  <img
                    src={randomJoke.icon_url}
                    alt="chuck head" />
                  <p>"{randomJoke.value}"</p>
                </div>}
            </header>
            <div className="btn-container">
              <button
                type='button'
                className='btn'
                onClick={fetchRandomJoke}
                >
                Refresh
              </button>
            </div>
          </>
      );
}
 
export default Jokes;