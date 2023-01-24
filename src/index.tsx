import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-fresh.css';
import './styles/index.scss';
import diContainer from './di/diContainer';
import AppView from './app/AppView';
import reportWebVitals from './reportWebVitals';

diContainer.configure().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<AppView />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
