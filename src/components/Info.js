import { h } from 'hyperapp'

export const info = (props, actions) =>
  h('div', { id: 'info_root' }, [
    h('h1', { id: 'info_title' }, props.title),
    h('div', { id: 'info_div' }, [
      h('h2', { id: 'info_descr' }, props.descr),
      h('h3', { id: 'info_authors' }, props.authors.join(', '))
    ]),
    h('fieldset', {}, [
      h('legend', {}, 'Débogueur'),
      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: actions.misc.printState
        }),
        h('span', null, "Console : afficher l'état"),
        h('br', null),
        h('input', {
          type: 'button',
          onclick: [actions.misc.printActions, actions]
        }),
        h('span', null, 'Console : afficher les actions')
      ])
    ])
  ])
