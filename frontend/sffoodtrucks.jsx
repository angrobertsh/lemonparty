import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as ACTIONS from './actions/truck_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById("root");
  let store = configureStore();

  let key = sessionStorage.getItem("robertslemonpartykey");

  if (!key) {
    sessionStorage.setItem("robertslemonpartykey", Math.random().toString(36).substring(2));
  }

  ReactDOM.render(<Root store={ store }/>, root);
});
