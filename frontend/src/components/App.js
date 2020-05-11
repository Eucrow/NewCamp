import React from "react";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import { Home, Survey } from './components';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/surveys" exact component={() => <Survey />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;