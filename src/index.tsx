import './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);


root.render(
	<Provider store={store}>
		<App/>
	</Provider>
);