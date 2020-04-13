import { h } from 'hyperapp'

import { info } from '../Info'
import { clock } from '../Clock'
import { data } from '../Data'
import { graph } from '../Graph'

export const view = actions => state => h('div', {}, [
  info(state.info, actions),
  clock(state.clock, actions.clock),
  data(state.data, actions.data),
  graph(state.graph, actions.graph)
])
