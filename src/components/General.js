import { h } from 'hyperapp'

const chooseGraphToShow = (props, dataNumber) => {
  return {
    title: props.datasets[dataNumber] === undefined ? 'Ooops, on dirait que vous n\'avez pas récupéré les données : ce graph ne veut rien dire' : 'Humidité de l\'air à chatelet en fonction de la date',
    labels: props.datasets[dataNumber] === undefined ? props.datasets[0].data[1] : props.datasets[dataNumber].data[1],
    data: props.datasets[dataNumber] === undefined ? props.datasets[0].data[0] : props.datasets[dataNumber].data[0]
  }
}

/* will also need dataActions, eventually */
export const general = (state, actions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Traitement des données'),
      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: [graphActions.state.addBar, chooseGraphToShow(props, 1)]
        }),
        h('span', null, 'État: ajouter le graph humidité'),
        h('br', null)
      ])
    ])
  ])
