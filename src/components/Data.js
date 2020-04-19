import { h } from 'hyperapp'

export const data = (props, dataActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Récupération des données'),
      h('p', {}, 'Choix de la Station'),
      h('input', { 
        type: 'checkbox', 
        id: 'Station01'
      }),
      h('label', { for: 'Station01' }, 'Station01'),
      h('input', { 
        type: 'checkbox', 
        id: 'Station02'
      }),
      h('label', { for: 'Station02' }, 'Station02'),
      h('input', { 
        type: 'checkbox', 
        id: 'Station03'
      }),
      h('label', { for: 'Station03' }, 'Station03'),

      h('p', {}, 'Date de Début'),
      h('input', { type: 'date' }),
      h('p', {}, 'Date de Fin'),
      h('input', { type: 'date' }),

      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: dataActions.utils.fetchDataset(
            (propsDisp, data) => dataActions.state.addDataset(
              propsDisp,
              {
                data,
                labels: [props.datasetLabels(props.datasetIds.chatelet).humi, props.datasetLabels(props.datasetIds.chatelet).date]
              }),
            props.datasetIds.chatelet,
            10)
        }, 'ok'),
        h('br', null)
      ])
    ])
  ])
