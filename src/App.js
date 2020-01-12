import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Details from './views/Details/Details';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/details/:id' component={Details}/>
      </Switch>
    </div>
  );
}

export default App;
