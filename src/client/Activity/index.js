import React from 'react';
import { useMachine } from '@xstate/react';
import activityMachine from './activityMachine';
/* 
    '@xstate/inspect' for active development should
    be removed eventually along with call to 'inspect'
    and 'devTools' option to useMachine
*/
import { inspect } from '@xstate/inspect';

inspect({ iframe: false });
  
function Activity() {
    const [state, send] = useMachine(activityMachine, { devTools: true });
    return (
        <form>
            <label htmlFor="step1">Step #1</label>
            <input
                id="step1"
                name="step1"
                type="checkbox"
                onChange={ handleChange }
            />
            <label htmlFor="step2">Step #2</label>
            <input
                id="step2"
                name="step2"
                type="checkbox"
                onChange={ handleChange }
                disabled
            />
            <label htmlFor="step3">Step #3</label>
            <input
                id="step3"
                name="step3"
                type="checkbox"
                onChange={ handleChange }
                disabled
            />
        </form>
    );

    function handleChange(e) {

    }
}

export default Activity;
