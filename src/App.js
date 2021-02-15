import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Form from './components/Form'

const App = () => {
  return (
    <Switch>
      <Route path="" exact render={() => <Form />} />

    </Switch>
  );
};

export default App;