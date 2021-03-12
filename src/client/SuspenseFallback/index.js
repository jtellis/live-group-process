import React from 'react';
import './style.css';

function SuspenseFallback() {
    return (
        <div id="loading-container">
            <div id="bounce-wrapper">
                <div id="loading-viz" />
            </div>
        </div>
    );
}

export default SuspenseFallback;
