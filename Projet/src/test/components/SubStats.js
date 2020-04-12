import { h } from 'hyperapp'
import SubItem from './SubItem'

export default (props) =>
    h('div', null, props.items
    .map(item =>
          SubItem({
            co2: item.co2,
            temperature: item.temperature,
            humidite: item.humidite,
            no2: item.no2,
            no: item.no,
            date: item.date,
            shown: item.shown
          })
      ))