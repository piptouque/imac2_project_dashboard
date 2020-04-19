import { h } from 'hyperapp'

const getData = (props, graphActions, datasetId, labels, rows) =>
  graphActions.effects.fetchDataset(
    (propsDisp, data) => graphActions.state.addDataset(
      propsDisp,
      {
        data,
        labels: labels.map(label => props.params.datasetLabels(datasetId)[label])
      }),
    datasetId,
    rows)

const getSelectedOption = event => {
  const select = event.target
  return select.options[select.selectedIndex].text
}

const graphSelect = (nodeId, name, values, texts, action, eventKey) =>
  h('select', {
    name: name,
    class: 'graph_select',
    onchange: [action, event => ({ nodeId, [eventKey]: getSelectedOption(event) })]
  },
  values.map((value, index) =>
    h('option', {
      value: value
    }, texts[index])
  )
  )

const graphInputText = (nodeId, name, action, eventKey) =>
  h('input', {
    type: 'text',
    placeholder: name,
    maxlength: 20,
    onchange: [action, event => ({ nodeId, [eventKey]: event.target.value })]
  })

const _graphTypeArgsInterface = (props, graphActions, graph) => {
  switch (graph.type) {
    case props.params.pie: // 'pie'
    case props.params.bar: // 'bar'
  }
}

const graphInterface = (props, graphActions, graph) =>
  h('div', { class: 'graph_interface' }, [
    graphSelect(
      graph.nodeId,
      'Type',
      Object.values(props.params.graphTypes),
      Object.keys(props.params.graphTypes),
      graphActions.state.updateGraph,
      'type'
    ),
    graphSelect(
      graph.nodeId,
      'Base de données',
      Object.values(props.params.datasetIds),
      Object.keys(props.params.datasetIds),
      graphActions.state.updateGraph,
      'datasetId'
    ),
    graphSelect(
      graph.nodeId,
      'Grandeurs',
      Object.values(props.params.datasetLabels(graph.datasetId)),
      Object.keys(props.params.datasetLabels(graph.datasetId)),
      graphActions.state.updateGraph,
      'labels'
    ),
    graphInputText(
      graph.nodeId,
      'Nom du graph',
      graphActions.state.updateGraph,
      'title'
    )
  ])

const newGraphInterface = (graphActions) =>
  h('div', { class: 'graph_interface' }, [
    h('span', {}, 'État: ajouter un graph'),
    h('input', {
      type: 'button',
      onclick: [graphActions.state.addBar, { title: 'Essai graph', labels: ['zero', 'un', 'deux'], data: [0, 1, 2] }]
    })
  ])

const displayGraph = (props, graphActions, graph, graphClass) =>
  h('div', {}, [
    h('canvas', {
      id: graph.nodeId,
      class: graphClass
    }),
    graphInterface(props, graphActions, graph)
  ])

const displayAllGraphs = (props, graphActions) =>
  h('div', {}, [
    props.graphs.map(
      graph => displayGraph(props, graphActions, graph, props.params.graphClass)
    )
  ])

const allGraphsInterface = (props, graphActions) =>
  h('div', { class: props.params.graphDivId }, [
    displayAllGraphs(props, graphActions),
    newGraphInterface(graphActions)
  ])

export const graph = (props, graphActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Graphs'),
      h('label', {}, [
        allGraphsInterface(props, graphActions),
        h('input', {
          type: 'button',
          // onclick: [graphActions.state.addBar, { title: 'Essai graph', labels: ['zero', 'un', 'deux'], data: [0, 1, 2] }]
          onclick: getData(
            props,
            graphActions,
            props.params.datasetIds.chatelet,
            ['humi', 'co2']
          )
        }
        ),
        h('br', null)
      ])
    ])
  ])
