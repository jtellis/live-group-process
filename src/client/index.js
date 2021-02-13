import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
const CreateActivity = lazy(() => import('./CreateActivity'));
import './style.css';

function App() {
    
    return (
        <React.StrictMode>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/">
                            <CreateActivity />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </React.StrictMode>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
