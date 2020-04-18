import { h } from 'hyperapp'

const displayGraph = (graph, graphClass) =>
  h('canvas', {
    id: graph.nodeId,
    class: graphClass
  })

const displayAllGraphs = props =>
  props.graphs.map(
    graph => displayGraph(graph, props.graphClass)
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
        h('span', null, 'État: ajouter un graph'),
        h('input', {
          type: 'button',
          onclick: [graphActions.state.addBar, { title: 'Essai graph', labels: ['zero', 'un', 'deux'], data: [0, 1, 2] }]
        }
        ),
        h('br', null)
      ])
    ]),
    h('div', { id: props.graphDivId }, displayAllGraphs(props))
  ])
