import { h } from 'hyperapp'
import { actions } from '../actions'

export const clock = (props, actionsClock) =>
  h('div', {}, [
    h('h1', {}, actionsClock.utils.posixToHumanTime(props.time, props.use24)),
    h('fieldset', {}, [
      h('legend', {}, 'Paramètres'),
      h('label', {}, [
        h('input', {
          type: 'checkbox',
          checked: props.use24,
          onInput: actionsClock.state.toggleFormat
        }),
        h('input', {
          type: 'checkbox',
          checked: props.use24,
          onInput: actions.misc.printState
        }),
        'Format 24 heures'
      ])
    ])
  ])