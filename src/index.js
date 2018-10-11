import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import Comeon from './reducers/Comeon';
import { Provider } from 'react-redux';

// initialise the store
const store = createStore( Comeon );
console.log(store.getState());
ReactDOM.render(<Provider store= {store}> 
                    <App/> 
                </Provider>, document.getElementById('root'));
registerServiceWorker();
export default store;