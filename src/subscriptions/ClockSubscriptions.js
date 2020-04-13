
import { interval } from '@hyperapp/time'

const tick = (props, time) => ({ ...props, time })

// eslint-disable-next-line no-unused-vars
export const clockSubscriptions = interval(tick, { delay: 1000 })
