import { h } from 'hyperapp'

export const info = (props) =>
  h('div', { id: 'info_root' }, [
    h('h1', { id: 'info_title' }, props.title),
    h('div', { id: 'info_div' }, [
      h('h2', { id: 'info_descr' }, props.descr),
      h('h3', { id: 'info_authors' }, props.authors.join(', '))
    ])
  ])
