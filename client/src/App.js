
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import Cart from './pages/Cart'
import './assets/styles/App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route 
            exact
            path="/" 
            render={(props) => 
              <Cart {...props} apiPath={"frete-gratis"} />
            }
          />
          <Route 
            exact
            path="/frete-gratis" 
            render={(props) => 
              <Cart {...props} apiPath={"frete-gratis"} />
            }
          />
          <Route 
            exact
            path="/sem-frete-gratis" 
            component={(props) => 
              <Cart {...props} apiPath={"sem-frete-gratis"} />
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
