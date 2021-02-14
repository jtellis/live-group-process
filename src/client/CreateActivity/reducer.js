function reducer(state, event) {
    switch (event.type) {

        case 'changeTitle': {
            return {
                ...state,
                title: event.payload
            };
        }

        case 'changeSectionTitle': {
            let { title, sectionIdx } = event.payload;
            let sections = [...state.sections];
            sections[sectionIdx].title = title;
            return {
                ...state,
                sections
            };
        }

        case 'changeDescription': {
            let description = event.payload;
            return {
                ...state,
                description
            };
        }

        case 'changePostscript': {
            let postscript = event.payload;
            return {
                ...state,
                postscript
            };
        }
        
        case 'changeStepDirections': {
            let { directions, sectionIdx, stepIdx } = event.payload;
            let sections = [...state.sections];
            sections[sectionIdx].steps[stepIdx].directions = directions;
            return {
                ...state,
                sections
            };
        }
        
        case 'addStep': {
            let { sectionIdx } = event.payload;
            let sections = [...state.sections];
            sections[sectionIdx].steps.push({ directions: ''});
            return {
                ...state,
                sections
            };
        }

        case 'addSection': {
            let sections = [...state.sections];
            sections.push({ title: '', steps: [{ directions: '' }] });
            return {
                ...state,
                sections
            };
        }

        default: {
            return state;
        }
    }
}

export default reducer;
