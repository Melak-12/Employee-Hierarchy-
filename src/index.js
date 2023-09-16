import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { MantineProvider, Notification } from '@mantine/core';

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notification/>
      <App />
      </MantineProvider>
     
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
// index.js
