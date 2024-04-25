import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Removed the .tsx extension

import store from './Daily/store';
import { Provider } from 'react-redux';

const root = document.getElementById('root'); // Safely get the root element

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
  