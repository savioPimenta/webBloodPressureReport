import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import Main from './pages/Main';
import Dashboard from './pages/Dashboard';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/" exact component={Main} />
            </Switch>
        </BrowserRouter>
    );
}
