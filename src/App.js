import React from 'react';
import './styles/style.css';
import Search from './components/search';

function App() {
  return (
    <div className="App">
      <header>
      <p className='login' id='same'>Bejelentkezés</p>
      <p className='register' id='same'>Regisztráció</p>
      <h1>MovieSeeker</h1>
      </header>

      <main>
      <Search/>
      </main>

    </div>
  );
}

export default App;
