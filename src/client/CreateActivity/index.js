import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './style.css';

function CreateActivity() {
    const descRef = useRef(null);
    const psRef = useRef(null);
    const [activity, setActivity] = useState({
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

    useEffect(function instantiateQuills() {
        const baseConfig = {
            /* https://quilljs.com/docs/api/#debug */
            debug: process.env.NODE_ENV === 'development',
            modules:{
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    /* [{ 'list': 'ordered'}, { 'list': 'bullet' }] */
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

        desc.on('text-change', () => handleDescChange(desc));
        ps.on('text-change', () => handleDescChange(ps));
    }, []);

    return (
        <form onSubmit={ handleSubmit }>
            <input
                name="title"
                id="title"
                placeholder="Title..."
                value={ activity.title }
                type="text"
                onChange={ handleTitleChange }
                required
            />

            <div className="quill-container">
                <div ref={ descRef } />
            </div>

            <div className="sections">
                <span className="header">
                    Directions
                </span>
                { activity.sections.map((section, sectionIdx) => (
                    <div key={`section-${sectionIdx}`} className="section">
                        <input
                            name={`section-${sectionIdx}-title`}
                            id={`section-${sectionIdx}-title`}
                            placeholder="Section title..."
                            type="text"
                            required
                            onChange={ e => handleSectionTitleChange(e, sectionIdx) }
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
                                        onChange={ e => handleStepDirectionsChange(e, sectionIdx, stepIdx) }
                                    />
                                </li>
                            )) }
                        </ol>
                        <button onClick={ e => addStep(e, sectionIdx) }>
                            Add a step
                        </button>
                    </div>
                )) }
            </div>

            <button onClick={ addSection }>Add a section</button>

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
                variables: { input: activity }
            }),
        });

        /* DEV */
        let result = await res.json();

        let { data: { createActivity: { _id } } } = result;

        console.log(_id);
        /* /DEV */
    }

    function handleTitleChange(e) {
        let title = e.target.value;
        setActivity({
            ...activity,
            title
        });
    }

    function handleDescChange(quill) {
        let description = quill.getText();
        setActivity({
            ...activity,
            description
        });
    }

    function handlePsChange(quill) {
        let postscript = quill.getText();
        setActivity({
            ...activity,
            postscript
        });
    }

    function handleSectionTitleChange(e, sectionIdx) {
        let title = e.target.value;
        let sections = [...activity.sections];
        sections[sectionIdx].title = title;
        setActivity({
            ...activity,
            sections
        });
    }

    function handleStepDirectionsChange(e, sectionIdx, stepIdx) {
        let directions = e.target.value;
        let sections = [...activity.sections];
        sections[sectionIdx].steps[stepIdx].directions = directions;
        setActivity({
            ...activity,
            sections
        });
    }

    function addStep(e, sectionIdx) {
        e.preventDefault();
        let sections = [...activity.sections];
        sections[sectionIdx].steps.push({ directions: '' });
        setActivity({
            ...activity,
            sections
        });
    }
    
    function addSection(e) {
        e.preventDefault();
        let sections = [...activity.sections];
        sections.push({ title: '', steps: [{ directions: '' }] });
        setActivity({
            ...activity,
            sections
        });
    }
}

export default CreateActivity;
