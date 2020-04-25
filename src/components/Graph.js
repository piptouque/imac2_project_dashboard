import { h } from 'hyperapp'

const effectUpdateData = (graphActions, graphIndex, baseUrl) =>
  graphActions.effects.effectFetch(
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

const graphViewInterfaceType = (props, graphActions, graph) => {
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

const graphViewInterface = (props, graphActions, graph) =>
  h('div', { class: 'graph_interface' }, [
    h('button', {
      onclick: [function show () {
        // eslint-disable-next-line no-var
        var div = document.getElementById('exp_Text')
        if (div.style.display === 'none') {
          // eslint-disable-next-line fp/no-mutation
          div.style.display = 'block'
        } else {
          // eslint-disable-next-line fp/no-mutation
          div.style.display = 'none'
        }
      }
      ]
    }, 'Quelles sont les grandeurs étudiées ?'),
    h('div', { id: 'exp_Text', display: 'none' }, [
      h('p', {}, "no : Concentration en Monoxyde d'azote dans l'air μg/m3 (microgramme par mètre cube). La valeur limite d'exposition professionnelle (exposition moyenne) au monoxyde d'azote établie par la législation du travail est de 25 ppm pendant 8 heures (30 mg/m3) dans la plupart des pays, et la valeur limite correspondante pour le NO2 est de 2 à 3 ppm (4 à 6 mg/m3)."),
      h('p', {}, "no2 : Concentration en Dioxyde d'azote dans l'air μg/m3 (microgramme par mètre cube). \n En moyenne annuelle (équivalent NO2) : 30 µg/m³ (protection de la végétation). En moyenne journalière : 125 µg/m³ à ne pas dépasser plus de 3 jours par an. En moyenne horaire : depuis le 01/01/05 : 350 µg/m³ à ne pas dépasser plus de 24 heures par an."),
      h('p', {}, "pm25 : Concentration moyenne enPM2,5 en μg/m3 (microgramme par mètre cube). L'appellation PM2,5 désigne les particules dont le diamètre est inférieur à 2,5 micromètres. \n Pour les PM2,5, il n'y a pas de réglementation. L'Union européenne a fixé son objectif de qualité à 20μg/m3 en moyenne sur l'année. Le Grenelle de l'environnement souhaitait arriver à 15μg/m3. L'Organisation Mondiale de la Santé recommande, elle, une valeur de 10 μg/m3."),
      h('p', {}, "pm10 : Concentration moyenne enPM10en μg/m3 (microgramme par mètre cube). L'appellation PM10 désigne les particules dont le diamètre est inférieur à 10 micromètres. L'objectif de qualité PM10 : 30 µg/m3 en moyenne annuelle. \n Les valeurs limites pour la protection de la santé humaine pour les PM10 (applicables aux concentrations non liées à des événements naturels) : 50 µg/m3 en moyenne journalière, à ne pas dépasser plus de 35 jours par an ; 40 µg/m3 en moyenne annuelle."),
      h('p', {}, "co2 : Concentration de dioxyde de carbone dans l'air en ppm (partie par million). \n L'air contient aujourd'hui environ 0,04 % de CO2. À partir d'une certaine concentration dans l'air, ce gaz s'avère dangereux voire mortel. La valeur limite d'exposition est de 3 % sur une durée de 15 minutes. Cette valeur ne doit jamais être dépassée."),
      h('p', {}, 'temp : Température en °C'),
      h('p', {}, "humi : Taux d'hygrométrie (humidité dans l'air) en %. \n En France, l'air ambiant extérieur est à 70-80% d'hygrométrie, tandis qu'aux Philippines, il frôle en permanence les 100%. Afin d'éviter la condensation aux fenêtres en hiver, l'humidité relative devra se situer plus volontiers autour de 50% maximum, pour une température moyenne située entre 18 et 24°C. Surveiller cette constante permet de préserver la santé des usager et l'état des installations")
    ]),
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
