import { Machine } from 'xstate';

// type ToggleEvent = {
//   type: 'TOGGLE'
// }

// State Machine
export const toggleMachine = Machine({
  id: 'toggeButton',
  initial: 'idle',
  states: {
    idle: {
      on: { TOGGLE: 'active' }
    },
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' } 
    }
  }
})
