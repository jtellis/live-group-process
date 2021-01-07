import { Machine } from 'xstate';

export default Machine({
    id: 'activity',
    initial: 'unstarted',
    states: {
        unstarted: {}
    }
});
