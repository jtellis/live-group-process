import React, { useRef, useEffect, useReducer } from 'react';
import reducer from './reducer';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './style.css';

function CreateActivity() {
    const descRef = useRef(null);
    const psRef = useRef(null);
    let initialState = {
        title: '',
        description: '',
        sections: [{
            title: '',
            steps: [{
                directions: ''
            }]
        }],
        postscript: ''
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(function instantiateQuills() {
        const baseConfig = {
            /* https://quilljs.com/docs/api/#debug */
            debug: process.env.NODE_ENV === 'development',
            modules:{
                toolbar: [
                /*
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }]
                */
                ]
            },
            theme: 'snow'
        };

        let desc = new Quill(descRef.current, {
            ...baseConfig,
            placeholder: 'Introduction...',
        });

        let ps = new Quill(psRef.current, {
            ...baseConfig,
            placeholder: 'Final thoughts...',
        });

        desc.on('text-change',
            () => dispatch({
                type: 'changeDescription',
                payload: desc.getText()
            }));
        
        ps.on('text-change',
            () => dispatch({
                type: 'changePostscript',
                payload: ps.getText()
            }));
    }, []);

    return (
        <form onSubmit={ handleSubmit }>
            <input
                name="title"
                id="title"
                placeholder="Title..."
                value={ state.title }
                type="text"
                onChange={
                    e => dispatch({
                        type: 'changeTitle',
                        payload: e.target.value
                    })
                }
                required
            />

            <div className="quill-container">
                <div ref={ descRef } />
            </div>

            <div className="sections">
                <span className="header">
                    Directions
                </span>
                { state.sections.map((section, sectionIdx) => (
                    <div key={`section-${sectionIdx}`} className="section">
                        <input
                            name={`section-${sectionIdx}-title`}
                            id={`section-${sectionIdx}-title`}
                            placeholder="Section title..."
                            type="text"
                            required
                            onChange={
                                e => {
                                    dispatch({
                                        type: 'changeSectionTitle',
                                        payload: {
                                            title: e.target.value,
                                            sectionIdx
                                        }
                                    })
                                }
                            }
                        />
                        <ol className="steps">
                            { section.steps.map((step, stepIdx) => (
                                <li key={`step-${stepIdx}`}>
                                    <input
                                        name={`section-${sectionIdx}-step-${stepIdx}-title`}
                                        id={`section-${sectionIdx}-step-${stepIdx}-title`}
                                        placeholder={`Step #${stepIdx + 1}...`}
                                        type="text"
                                        required
                                        onChange={
                                            e => {
                                                dispatch({
                                                    type: 'changeStepDirections',
                                                    payload: {
                                                        directions: e.target.value,
                                                        sectionIdx,
                                                        stepIdx
                                                    }
                                                })
                                            }
                                        }
                                    />
                                </li>
                            )) }
                        </ol>
                        <button
                            onClick={
                                e => {
                                    e.preventDefault();
                                    dispatch({ type: 'addStep', payload: { sectionIdx } })
                                }
                            }
                        >
                            Add a step
                        </button>
                    </div>
                )) }
            </div>

            <button
                onClick={
                    e => {
                        e.preventDefault();
                        dispatch({ type: 'addSection' })
                    }
                }
            >
                Add a section
            </button>

            <div className="quill-container">
                <div ref={ psRef } />
            </div>

            <input type="submit" value="Save" />
        </form>
    );

    async function handleSubmit(e) {
        e.preventDefault();
        
        let res = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation CreateActivity($input: ActivityInput) {
                        createActivity(input: $input) {
                            _id
                        }
                    }
                `,
                variables: { input: state }
            }),
        });

        let result = await res.json();

        let { data: { createActivity: { _id } } } = result;

        console.log(_id);
    }
}

export default CreateActivity;
