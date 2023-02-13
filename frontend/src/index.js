import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <App />
        </Provider>
    </React.StrictMode>
);
