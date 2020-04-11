import { h } from 'hyperapp'

const displayGraph = graph =>
  h('canvas', {
    id: graph.nodeId
  })

const displayAllGraphs = props =>
  h('div', {},
    props.graphs.map(
      graph => displayGraph(graph)
    )
  )

export const graph = (props, graphActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Graphs'),
      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: graphActions.state.addBarWhatever
        }),
        h('span', null, 'État: fixer un graph'),
        h('br', null),
        h('input', {
          type: 'button',
          onclick: graphActions.state.updateGraphs
        }),
        h('span', null, 'État: mettre à jour'),
        h('br', null)
      ])
    ]),
    displayAllGraphs(props)
  ])
