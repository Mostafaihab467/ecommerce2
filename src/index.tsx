import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import {
  useNavigate,
  BrowserRouter as Router, Routes,

} from "react-router-dom";

import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { store,persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';





export const history = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>
  <Router>
  <PersistGate persistor={persistor}>
      <App />
   </PersistGate>
  </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
