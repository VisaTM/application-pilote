import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support

import store from './store';
import './index.css';
import routes from './routes';

import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
              {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>, rootElement);
} else {
    render(
        <Provider store={store}>
            <BrowserRouter>
              {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>, rootElement);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
