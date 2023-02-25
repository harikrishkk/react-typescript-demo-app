import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state';
import RepoList from './components/RepoList';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <h1> Search for repo</h1>
        <RepoList />
      </Provider>
    </div>
  );
}

export default App;
