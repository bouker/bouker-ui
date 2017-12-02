import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ItemList from './scenes/ItemList/ItemList';
import ItemCreation from './scenes/ItemCreation/ItemCreation';
import MenuBar from './components/MenuBar/MenuBar';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <MenuBar />
            <Switch>
                <Route path="/find" component={ItemList} />
                <Route path="/create" component={ItemCreation}/>>
                <Redirect path="*" to="/find"></Redirect>
            </Switch>
        </div>
    </BrowserRouter>
    ), document.getElementById('root'));
registerServiceWorker();
