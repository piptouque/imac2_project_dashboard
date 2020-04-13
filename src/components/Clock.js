import { h } from 'hyperapp'

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
        h('span', null, 'Format 24 heures')
      ])
    ])
  ])
