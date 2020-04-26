
import { app } from 'hyperapp'

import { view } from './components/views/index'
import { actions } from './actions'
import { initState } from './state/index'

// eslint-disable-next-line no-unused-vars
import { subscriptions } from './subscriptions'

import '../styles/app.css'

/*
 * Since Hyperapp 2.0, the actions are not given
 * as a field to App, but called from the global scope
 * by the View instead.
 */

const node = document.getElementById('app')

app({
  init: initState,
  view: view(actions),
  subscriptions: subscriptions({
    graph: {
      target: node,
      graphClass: initState[0].graph.params.graphClass
    }
  }),
  node: node
})
