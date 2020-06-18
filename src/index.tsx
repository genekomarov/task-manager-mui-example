import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux"
import store from "./redux/store"
import {SnackbarProvider} from "notistack"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <App/>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
