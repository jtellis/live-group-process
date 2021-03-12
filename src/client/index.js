import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
const ViewActivity = lazy(() => import('./ViewActivity'));
const CreateActivity = lazy(() => import('./CreateActivity'));
const MyActivitiesList = lazy(() => import('./MyActivitiesList'));
import SuspenseFallback from './SuspenseFallback';
import './style.css';

function App() {
    
    return (
        <React.StrictMode>
            <Router>
                <Suspense fallback={<SuspenseFallback />}>
                    <Switch>
                        <Route exact path="/">
                            <CreateActivity />
                        </Route>
                        <Route exact path="/activities">
                            <MyActivitiesList />
                        </Route>
                        <Route
                            path="/activity/:_id"
                            render={({ match }) => ( <ViewActivity _id={match.params._id} /> )}
                        />
                    </Switch>
                </Suspense>
            </Router>
        </React.StrictMode>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
