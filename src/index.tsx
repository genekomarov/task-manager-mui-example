import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import store from "./redux/store"
import * as serviceWorker from './serviceWorker';
import {SnackbarProvider} from "notistack"
import App from './App';
import {BrowserRouter, HashRouter} from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <HashRouter>
                    <App/>
                </HashRouter>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
