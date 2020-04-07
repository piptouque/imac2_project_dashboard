import { h } from "hyperapp";

export const info = props =>
    h('div', { class: 'info_root' }, [
        h('h1', { class: 'info_title' }, props.title),
        h('div', { class: 'info_div' }, [
            h('h2', { class: 'info_descr' }, props.descr),
            h('h3', { class: 'info_authors' }, props.authors.join(', '))
        ])
    ])