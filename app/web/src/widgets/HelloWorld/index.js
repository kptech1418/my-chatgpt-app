import React from 'react';
import ReactDOM from 'react-dom/client';
import HelloWorld from './helloWorld'; // Your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
);
