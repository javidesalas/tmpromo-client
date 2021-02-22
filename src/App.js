import React from "react";
import { Switch, Route } from "react-router-dom";

import Form from "./components/Form";
import Success from "./components/Success";

const App = () => {
	return (
		<Switch>
			<Route path="/success" render={() => <Success />} />
			<Route path="" exact render={() => <Form />} />
		</Switch>
	);
};

export default App;
