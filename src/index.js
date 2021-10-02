import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css"; // Bootstrap
import Parent from "./components/Parent/Parent"
import { BrowserRouter } from "react-router-dom";



// If you want your app to work offline and load faster, you can change
// unregister() to register() below.
serviceWorker.unregister();

const topLevel = (

	<Parent>
	</Parent>
);



ReactDOM.render(topLevel, document.getElementById("root"));
