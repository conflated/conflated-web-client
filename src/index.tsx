import React from 'react';
import ReactDOM from 'react-dom/client';
import qs from 'qs';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-balham.min.css';
import './styles/index.scss';
import diContainer from './di/diContainer';
import AppView from './app/AppView';
import reportWebVitals from './reportWebVitals';

const isVerizon = qs.parse(document.location.href.split('?')[1]).verizon;

if (isVerizon) {
  document.body.style.backgroundColor = '#000';
}

diContainer.configure().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<AppView />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
