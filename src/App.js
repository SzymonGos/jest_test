import React from 'react'; 
import './sass/App.sass';
import Jokes from './components/Jokes';
import List from './components/List';


function App() {
  return (
    <div className="App">
      <main className='main'>
      <Jokes />
      {/* <List /> */}
      </main> 
    </div>
  );
}

export default App;