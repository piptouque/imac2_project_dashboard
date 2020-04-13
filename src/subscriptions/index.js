
import { clockSubscriptions } from './ClockSubscriptions'
import { graphSubscriptions } from './GraphSubscriptions'

import { mapFuncState } from '../utils'

/*
 *
 */
// Pretty silly, but whatever
const mapSubscriptions = (subscriptions, stateKey) => [
  subscriptions[0],
  {
    ...subscriptions[1],
    action: mapFuncState(subscriptions[1].action, stateKey)
  }
]

// eslint-disable-next-line no-unused-vars
export const subscriptions = init => _state => [
  mapSubscriptions(graphSubscriptions(init.graph), 'graph'),
  mapSubscriptions(clockSubscriptions, 'clock')
]
