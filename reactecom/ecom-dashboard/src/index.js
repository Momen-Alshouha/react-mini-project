import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {configureStore} from '@reduxjs/toolkit';
import ProductsSlice from './ProductList';
import { Provider } from 'react-redux';

const store = configureStore(
  {
    reducer:{
      products:ProductsSlice.reducer
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


