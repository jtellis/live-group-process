import React, { useState, useEffect } from 'react';
import './style.css';

function ViewActivity({ _id }) {
    const [state, setState] = useState({
        title: '',
        description: '',
        sections: [{
            title: '',
            steps: [{
                directions: ''
            }]
        }],
        postscript: ''
    });

    useEffect(async function loadActivity() {
        let res = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query GetActivity($_id: ID!) {
                        activity(_id: $_id) {
                            title
                            description
                            sections {
                                title
                                steps {
                                    directions
                                }
                            }
                            postscript
                        }
                    }
                `,
                variables: { _id: _id }
            }),
        });

        let result = await res.json();

        setState(result.data.activity);
    }, [_id]);

    return (
        <div>
            <h1>{ state.title }</h1>
            <p className="description">{ state.description }</p>
            <div className="sections">
                <div className="header">
                    Directions
                </div>
                { state.sections.map((section, sectionIdx) => (
                    <div key={`section-${sectionIdx}`} className="section">
                        <span className="header">{ section.title }</span>
                        <ol className="steps">
                            { section.steps.map((step, stepIdx) => (
                                <li key={`step-${stepIdx}`}>{ step.directions }</li>
                            )) }
                        </ol>
                    </div>
                )) }
            </div>
            <p className="postscript">{ state.description }</p>
        </div>
    );
}

export default ViewActivity;
