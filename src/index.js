
import { app } from 'hyperapp'

import { view } from './components/views/index'
import { initState } from './state/index'
import { subscriptions, tick } from './actions'

/*
 * Since Hyperapp 2.0, the actions are not given 
 * as a field to App, but called from the global scope
 * by the View instead.
 */



app({
  init: initState, 
  view: view,
  subscriptions: subscriptions,
  node: document.body
})