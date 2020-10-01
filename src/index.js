import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { mainReducer } from './reducers/reducer';
import thunk from 'redux-thunk';

const store = createStore(mainReducer, applyMiddleware(thunk));

let rootElement = document.getElementById('root');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);

serviceWorker.unregister();
