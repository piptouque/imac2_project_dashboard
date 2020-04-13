
import { clockSubscriptions } from './ClockSubscriptions'
import { graphSubscriptions } from './GraphSubscriptions'

import { mapFuncState } from '../utils'

/*
 *
 */
// Pretty silly, but whatever
const mapSubscriptions = ([fx, props], stateKey) => [
  fx,
  {
    ...props,
    action: mapFuncState(props.action, stateKey)
  }
]

// eslint-disable-next-line no-unused-vars
export const subscriptions = init => _state => [
  mapSubscriptions(graphSubscriptions(init.graph), 'graph'),
  mapSubscriptions(clockSubscriptions, 'clock')
]
