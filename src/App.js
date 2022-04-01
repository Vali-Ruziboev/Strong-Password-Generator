import './App.css';
import Main from './components/Main';
import {MemoryRouter as Router, Switch, Route} from 'react-router-dom'
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/history'>
            <History />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
