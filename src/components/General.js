import { h } from 'hyperapp'

export const general = (props, graphActions) =>
  h('div', {}, [
    h('fieldset', {}, [
      h('legend', {}, 'Traitement des données'),
      h('label', {}, [
        h('input', {
          type: 'button',
          onclick: [graphActions.state.addBar, { title: props.datasets[1] === undefined ? 'Ooops, on dirait que vous n\'avez pas récupéré les données : ce graph ne veut rien dire' : 'Humidité de l\'air à chatelet en fonction de la date', labels: props.datasets[1] === undefined ? props.datasets[0].data[1] : props.datasets[1].data[1], data: props.datasets[1] === undefined ? props.datasets[0].data[0] : props.datasets[1].data[0] }]
        }
        ),
        h('span', null, 'État: ajouter le graph humidité'),
        h('br', null)
      ])
    ])
  ])
