import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function MyActivitiesList() {
    const [state, setState] = useState([]);

    useEffect(async function loadActivities() {
        let res = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query GetMyActivities {
                        myActivities {
                            _id
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
                `
            })
        });

        let result = await res.json();

        setState(result.data.myActivities);
    }, []);

    return (
        <ul>
            { state.map((activity) => (
                <li key={`activity-${activity._id}`}>
                    <Link to={`/activity/${activity._id}`}>{ activity.title }</Link>
                </li>
            )) }
        </ul>
    );
}

export default MyActivitiesList;
