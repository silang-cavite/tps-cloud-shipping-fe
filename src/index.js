// NPM Packages
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// React Configuration
import reportWebVitals from "src/reportWebVitals";

// Component
import App from "src/App";

// Moduled Function
import store from "src/State/Store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)

reportWebVitals();