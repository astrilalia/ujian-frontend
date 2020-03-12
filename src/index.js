import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
// Provider untuk menghubungkan semua komponen agar bisa mengakses ke global state
import { Provider } from 'react-redux';
import Reducer from './Redux/Reducer'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxThunk from 'redux-thunk'

// untuk menyimpan global state pakai createStore. Reducer: function yang mengubah isi dari global state. Global state untuk menyimpan data users.
//Middleware untukk hubungin front-end dan back-end
const store = createStore(Reducer, {}, applyMiddleware(ReduxThunk))
// store: tempat nyimpen, reducer: apa yang diganti

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
