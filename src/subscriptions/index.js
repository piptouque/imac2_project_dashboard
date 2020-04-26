
import { clockSubscriptions } from './ClockSubscriptions'
import { graphSubscriptions } from './GraphSubscriptions'

import { mapEffect } from '../utils'

/*
 *
 */
const mapSubscriptions = mapEffect

// eslint-disable-next-line no-unused-vars
export const subscriptions = init => _state => [
  mapSubscriptions(graphSubscriptions(init.graph), 'graph'),
  mapSubscriptions(clockSubscriptions, 'clock')
]
