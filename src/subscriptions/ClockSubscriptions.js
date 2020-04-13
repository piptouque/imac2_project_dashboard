
import { interval } from '@hyperapp/time'

const tick = (state, time) => ({
  ...state,
  clock: {
    ...state.clock,
    time
  }
})

// eslint-disable-next-line no-unused-vars
export const clockSubscriptions = interval(tick, { delay: 1000 })
