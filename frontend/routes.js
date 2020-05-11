import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '/components/App';
import Survey from '/components/Survey';

export default (
    <Route path="/" component={App}>
        <Route path="/surveys/" component={Survey}></Route>
    </Route>
)