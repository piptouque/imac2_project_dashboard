import { h } from 'hyperapp'

import { info } from '../Info'
import { clock } from '../Clock'

import { actions } from '../../actions'

export const view = state => h('div', {}, [
    info(state.info),
    clock(state.clock, actions.clock)
])

