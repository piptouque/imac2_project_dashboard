import { h } from 'hyperapp'

import { info } from '../Info'
import { clock } from '../Clock'
import { graph } from '../Graph'
// import { general } from '../General'

export const view = actions => state => h('div', {}, [
  info(state.info, actions),
  clock(state.clock, actions.clock),
  graph(state.graph, actions.graph)// ,
  // general(state, actions)
])
