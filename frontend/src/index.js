import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore} from 'redux-persist';
import store from './store'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Bootstrap.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

reportWebVitals();
