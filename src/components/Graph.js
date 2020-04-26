import { h } from 'hyperapp'
// import { graphActions } from '../actions/GraphActions'

const effectUpdateData = (graphActions, graphIndex, baseUrl) =>
  graphActions.effects.effectFetchQuery(
    (state, data) => {
      const graph = state.graph.graphs[graphIndex]
      return graphActions.state.updateGraph(
        state,
        {
          nodeId: graph.nodeId,
          data: data,
          ...graph.params
        }
      )
    },
    {
      baseUrl: baseUrl,
      config: {
        dataset: ['graph', 'graphs', graphIndex, 'params', 'datasetId'],
        rows: ['graph', 'graphs', graphIndex, 'params', 'rows']
      }
    }
  )

const getSelectedOptions = (event, isMultiple) => {
  const select = event.target
  const selectedValues = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value)
  return isMultiple ? selectedValues : selectedValues[0]
}

const graphSelect = (nodeId, name, values, texts, onChange, eventKey, isMultiple) => {
  const eventSelected = event => ({ nodeId, [eventKey]: getSelectedOptions(event, isMultiple) })
  return h('select', {
    name: name,
    class: 'graph_select',
    multiple: isMultiple,
    onchange: [onChange, eventSelected]
  },
  values.map((value, index) =>
    h('option', {
      value: value
    }, texts[index]))
  )
}

const graphInputButton = (nodeId, name, onClick) =>
  h('input', {
    type: 'button',
    value: name,
    onclick: [onClick, { nodeId }]
  })

const graphViewInterfaceType = (_props, graphActions, graph) => {
  if (!graph.isSet || !graph.params.names) {
    return null
  }
  switch (graph.params.type) {
    case 'line':
      return graphSelect(
        graph.nodeId,
        'Abscisses',
        Object.values(graph.params.names),
        Object.values(graph.params.names),
        graphActions.state.updateGraph,
        'x',
        false)
    case 'bar':
    case 'pie':
      break
  }
  return null
}

const graphInputNumber = (nodeId, name, onChange, eventKey) =>
  h('input', {
    type: 'number',
    placeholder: name,
    max: 300,
    min: 10,
    onchange: [
      onChange,
      event => ({
        nodeId,
        [eventKey]: event.target.value
      })
    ]
  })
const graphInputText = (nodeId, name, onChange, eventKey) =>
  h('input', {
    type: 'text',
    placeholder: name,
    maxlength: 20,
    onchange: [
      onChange,
      event => ({
        nodeId,
        [eventKey]: event.target.value
      })
    ]
  })

const graphInfoInterface = (props, graphActions, graph) =>
  h('div', { class: ['graph_info', 'graph_interface'] }, [
    h('input', {
      type: 'button',
      value: graph.displayInfo ? 'Cacher info' : 'Info grandeurs',
      onclick: [graphActions.state.updateGraph, {
        nodeId: graph.nodeId,
        displayInfo: !graph.displayInfo
      }]
    }),
    graph.displayInfo === true && graph.params.names
      ? graph.params.names.map(
        name =>
          h('p', {}, [
            name,
            ': ',
            props.params.namesToInfo[name]
          ])
      )
      : null
  ])

const graphViewInterface = (props, graphActions, graph) =>
  h('div', { class: 'graph_interface' }, [
    h('p', {}, ' '),
    graphInputText(
      graph.nodeId,
      'Nom du graph',
      graphActions.state.updateGraph,
      'title'
    ),
    graphSelect(
      graph.nodeId,
      'Type',
      Object.values(props.params.graphTypes),
      Object.keys(props.params.graphTypes),
      graphActions.state.updateGraph,
      'type',
      false
    ),
    graphViewInterfaceType(props, graphActions, graph)
  ])

const graphDataInterface = (props, graphActions, graph) => {
  const fxDataUpdate = effectUpdateData(
    graphActions,
    graphActions.utils.graphIndexFromId(props.graphs, graph.nodeId),
    props.params.baseUrl
  )
  const onChange = ({ action, effects }) =>
    effects === undefined
      ? action
      : (props, payload) => [action(props, payload), effects]
  console.log(props)
  return h('div', { class: 'graph_interface' }, [
    graphSelect(
      graph.nodeId,
      'Base de données',
      Object.values(props.params.datasetIds),
      Object.keys(props.params.datasetIds),
      onChange({
        // effects: fxDataUpdate,
        action: graphActions.state.updateGraph
      }),
      'datasetId',
      false
    ),
    graphSelect(
      graph.nodeId,
      'Grandeurs',
      Object.keys(props.params.namesToLabels(graph.params.datasetId)),
      Object.keys(props.params.namesToLabels(graph.params.datasetId)),
      onChange({
        // effects: fxDataUpdate,
        action: graphActions.state.updateGraph
      }),
      'names',
      true
    ),
    graphInputNumber(
      graph.nodeId,
      'Nombre de résultats',
      onChange({
        // effects: fxDataUpdate,
        action: graphActions.state.updateGraph
      }),
      'rows'
    ),
    graphInputButton(
      graph.nodeId,
      'Rechercher',
      onChange({
        effects: fxDataUpdate,
        action: graphActions.state.updateGraph
      })
    ),
    graphInputButton(
      graph.nodeId,
      'Supprimer',
      onChange({
        action: graphActions.state.removeGraph
      })
    )
  ])
}

const newGraphInterface = (props, graphActions) =>
  h('div', { class: 'graph_interface' }, [
    h('input', {
      type: 'button',
      value: 'Ajouter un graph',
      onclick: [
        graphActions.state.addGraph,
        {
          type: 'line',
          datasetId: props.params.datasetIds.chatelet,
          title: 'Nouveau graph'
        }
      ]
    })
  ])

const displayGraph = (props, graphActions, graph, graphClass) =>
  h('div', { class: props.params.graphDivId }, [
    graphInfoInterface(props, graphActions, graph),
    graphDataInterface(props, graphActions, graph),
    h('br', {}, []),
    graphViewInterface(props, graphActions, graph),
    h('canvas', {
      id: graph.nodeId,
      class: graphClass
    })
  ])

const displayAllGraphs = (props, graphActions) =>
  h('div', { class: props.params.graphDivId }, [
    props.graphs.map(
      graph => displayGraph(props, graphActions, graph, props.params.graphClass)
    )
  ])

const allGraphsInterface = (props, graphActions) =>
  h('div', { class: props.params.graphDivId }, [
    displayAllGraphs(props, graphActions),
    newGraphInterface(props, graphActions)
  ])

export const graph = (props, graphActions) =>
  h('div', { id: 'graph_root' }, [
    h('fieldset', {}, [
      h('legend', {}, 'Graphs'),
      allGraphsInterface(props, graphActions)
    ])
  ])
