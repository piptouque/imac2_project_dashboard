
import { clockSubscriptions } from './ClockSubscriptions'
import { graphSubscriptions } from './GraphSubscriptions'

/*
 * Ookay so apparently I can't
 *
 */

// eslint-disable-next-line no-unused-vars
export const subscriptions = init => _state => [
  graphSubscriptions(init.graph),
  clockSubscriptions
]
