import { h } from 'hyperapp'

export const data = (props, dataActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Récupération des données'),
      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: dataActions.utils.fetchDataset(
            (propsDisp, data) => dataActions.state.addDataset(
              propsDisp,
              data,
              {
                labels: [props.datasetLabels(props.datasetIds.chatelet).humi, props.datasetLabels(props.datasetIds.chatelet).date]
              }),
            props.datasetIds.chatelet,
            10)
        }),
        h('br', null)
      ])
    ])
  ])
