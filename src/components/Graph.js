import { h } from 'hyperapp'

const effectUpdateData = (graphActions, graph, { datasetId, rows }) =>
  graphActions.effects.effectFetch(
    (props, data) => {
      return graphActions.state.updateGraph(
        props,
        {
          nodeId: graph.nodeId,
          params: graph.params,
          data: data
        }
      )
    },
    datasetId,
    rows
  )

const getSelectedOptions = (event, isMultiple) => {
  const select = event.target
  const selectedValues = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value)
  return isMultiple ? selectedValues : selectedValues[0]
}

const graphSelect = (nodeId, name, values, texts, { action, effects }, eventKey, isMultiple) => {
  const eventSelected = event => ({ nodeId, [eventKey]: getSelectedOptions(event, isMultiple) })
  const onChange =
    effects === undefined
      ? action
      : (props, payload) => [action(props, payload), effects]
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

const graphInputNumber = (nodeId, name, { action, effects }, eventKey) => {
  const onChange =
    effects === undefined
      ? action
      : (props, payload) => [action(props, payload), effects]
  return h('input', {
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
}

const graphInputText = (nodeId, name, action, eventKey) =>
  h('input', {
    type: 'text',
    placeholder: name,
    maxlength: 20,
    onchange: [
      action,
      event => ({
        nodeId,
        [eventKey]: event.target.value
      })
    ]
  })

const graphInterface = (props, graphActions, graph) => {
  const fxUpdate = effectUpdateData(
    graphActions,
    graph,
    {
      datasetId: graph.params.datasetId,
      rows: graph.params.rows
    }
  )
  return h('div', { class: 'graph_interface' }, [
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
      {
        action: graphActions.state.updateGraph,
        effects: fxUpdate
      },
      'type',
      false
    ),
    graphSelect(
      graph.nodeId,
      'Base de données',
      Object.values(props.params.datasetIds),
      Object.keys(props.params.datasetIds),
      {
        action: graphActions.state.updateGraph
      },
      'datasetId',
      false
    ),
    graphSelect(
      graph.nodeId,
      'Grandeurs',
      Object.keys(props.params.labelNames(graph.params.datasetId)),
      Object.keys(props.params.labelNames(graph.params.datasetId)),
      { action: graphActions.state.updateGraph },
      'names',
      true
    ),
    graphInputNumber(
      graph.nodeId,
      'Nombre de résultats',
      {
        action: graphActions.state.updateGraph,
        effects: fxUpdate
      }
    )
  ])
}

const newGraphInterface = (props, graphActions) =>
  h('div', { class: 'graph_interface' }, [
    h('span', {}, 'État: ajouter un graph'),
    h('input', {
      type: 'button',
      onclick: [
        graphActions.state.addGraph,
        {
          type: 'line',
          datasetId: props.params.datasetIds.chatelet,
          title: 'Essai graph',
          names: ['zero', 'un', 'deux'],
          data: [0, 1, 2]
        }
      ]
    })
  ])

const displayGraph = (props, graphActions, graph, graphClass) =>
  h('div', { class: props.params.graphDivId }, [
    graphInterface(props, graphActions, graph),
    h('canvas', {
      id: graph.nodeId,
      class: graphClass
    })
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
    newGraphInterface(props, graphActions)
  ])

export const graph = (props, graphActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Graphs'),
      allGraphsInterface(props, graphActions)
    ])
  ])
