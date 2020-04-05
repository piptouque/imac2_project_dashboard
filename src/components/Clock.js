import { h } from 'hyperapp'

import { actions } from '../actions'

export const Clock = state =>
  h('div', {}, [
    h('h1', {}, actions.posixToHumanTime(state.time, state.use24)),
    h('fieldset', {}, [
      h('legend', {}, 'Paramètres'),
      h('label', {}, [
        h('input', {
          type: 'checkbox',
          checked: state.use24,
          onInput: actions.toggleFormat
        }),
        'Format 24 heures'
      ])
    ])
  ])