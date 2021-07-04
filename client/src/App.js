
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import Cart from './pages/Cart'
import './assets/styles/App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/frete-gratis">
            <Cart apiPath={'frete-gratis'} />
          </Route>
          <Route path="/sem-frete-gratis">
            <Cart apiPath={'sem-frete-gratis'} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
