import './App.css';
import Main from './components/Main';
import {MemoryRouter as Router, Switch, Route} from 'react-router-dom'
import History from './components/History';
import PasswordContextProvider from './contexts/PasswordContext';

function App() {
  return (
    <Router>
      <div className="App">
      <PasswordContextProvider>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/history'>
            <History />
          </Route>
        </Switch>
      </PasswordContextProvider>

      </div>
    </Router>
  );
}

export default App;
