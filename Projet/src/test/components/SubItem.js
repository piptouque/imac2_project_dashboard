import { h } from 'hyperapp'

export default (props) => {
if(props.shown){
  const dateSplited = props.date.split('-')
  const day = dateSplited[2].split('T')
  const hour = day[1].split(':')
  return h('div', null, [
    h('h2', null, ["Le ", day[0], "/" , dateSplited[1], "/", dateSplited[0]," à ", hour[0],":",hour[1] ," la composition de l'air de la station était de :"]),
    h('p',null, ['CO2 : ',props.co2]),
    h('p',null, ['température : ',props.temperature]),
    h('p',null, ['humidité : ',props.humidite]),
    h('p',null, ['NO2 : ',props.no2]),
    h('p',null, ['NO : ',props.no]),
])}}
