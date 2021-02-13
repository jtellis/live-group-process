import React from 'react';
import ReactDOM from 'react-dom';
import CreateActivity from './CreateActivity';
import './style.css';

function App() {
    
    return (
        <React.StrictMode>
            <CreateActivity />
        </React.StrictMode>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
