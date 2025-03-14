import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from 'store/index';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
