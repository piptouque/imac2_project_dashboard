import { h } from 'hyperapp'

export const data = (props, dataActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Récupération des données'),
      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: dataActions.utils.fetchDataset(dataActions.state.fillDataset, props.datasetIds.chatelet, 10)
        }),
        h('br', null)
      ])
    ])
  ])
