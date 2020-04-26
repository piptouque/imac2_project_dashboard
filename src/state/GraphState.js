
import { makeUrlQuery } from '../effects/request'
/*
 * Hyperapp v2 does not support lifecycle events
 * (oncreate, ...)
 * We should fetch data instead, see:
 * https://github.com/jorgebucaran/hyperapp/issues/717
 *
*/

const datasetIds = {
  auber: 'qualite-de-lair-mesuree-dans-la-station-auber',
  chatelet: 'qualite-de-lair-mesuree-dans-la-station-chatelet',
  roosevelt: 'qualite-de-lair-mesuree-dans-la-station-franklin-d-roosevelt'
}

export const namesToLabels = datasetId => {
  const date = 'dateheure'
  switch (datasetId) {
    case datasetIds.auber:
      return {
        date,
        no: 'noauba',
        no2: 'n2auba',
        pm10: '10auba',
        pm25: '25auba',
        co2: 'c2auba',
        temp: 'tauba',
        humi: 'hyauba'
      }
    case datasetIds.chatelet:
      return {
        date,
        no: 'nocha4',
        no2: 'n2cha4',
        pm10: '10cha4',
        // pm25: null,
        co2: 'c2cha4',
        temp: 'tcha4',
        humi: 'hycha4'
      }
    case datasetIds.roosevelt:
      return {
        date,
        no: 'nofra1',
        no2: 'n2fra1',
        pm10: '10fra1',
        // pm25: null,
        co2: 'c2fra1',
        temp: 'tfra1',
        humi: 'hyfra1'
      }
    default:
      return {}
  }
}

const namesToInfo = {
  no: "Concentration en Monoxyde d'azote dans l'air μg/m3 (microgramme par mètre cube). La valeur limite d'exposition professionnelle (exposition moyenne) au monoxyde d'azote établie par la législation du travail est de 25 ppm pendant 8 heures (30 mg/m3) dans la plupart des pays, et la valeur limite correspondante pour le NO2 est de 2 à 3 ppm (4 à 6 mg/m3).",
  no2: "Concentration en Dioxyde d'azote dans l'air μg/m3 (microgramme par mètre cube). \n En moyenne annuelle (équivalent NO2) : 30 µg/m³ (protection de la végétation). En moyenne journalière : 125 µg/m³ à ne pas dépasser plus de 3 jours par an. En moyenne horaire : depuis le 01/01/05 : 350 µg/m³ à ne pas dépasser plus de 24 heures par an.",
  pm25: "Concentration moyenne en PM2,5 en μg/m3 (microgramme par mètre cube). L'appellation PM2,5 désigne les particules dont le diamètre est inférieur à 2,5 micromètres. \n Pour les PM2,5, il n'y a pas de réglementation. L'Union européenne a fixé son objectif de qualité à 20μg/m3 en moyenne sur l'année. Le Grenelle de l'environnement souhaitait arriver à 15μg/m3. L'Organisation Mondiale de la Santé recommande, elle, une valeur de 10 μg/m3.",
  pm10: "Concentration moyenne en PM10 en μg/m3 (microgramme par mètre cube). L'appellation PM10 désigne les particules dont le diamètre est inférieur à 10 micromètres. L'objectif de qualité PM10 : 30 µg/m3 en moyenne annuelle. \n Les valeurs limites pour la protection de la santé humaine pour les PM10 (applicables aux concentrations non liées à des événements naturels) : 50 µg/m3 en moyenne journalière, à ne pas dépasser plus de 35 jours par an ; 40 µg/m3 en moyenne annuelle.",
  co2: "Concentration de dioxyde de carbone dans l'air en ppm (partie par million). \n L'air contient aujourd'hui environ 0,04 % de CO2. À partir d'une certaine concentration dans l'air, ce gaz s'avère dangereux voire mortel. La valeur limite d'exposition est de 3 % sur une durée de 15 minutes. Cette valeur ne doit jamais être dépassée.",
  temp: 'Température en °C',
  humi: "Taux d'hygrométrie (humidité dans l'air) en %. \n En France, l'air ambiant extérieur est à 70-80% d'hygrométrie, tandis qu'aux Philippines, il frôle en permanence les 100%. Afin d'éviter la condensation aux fenêtres en hiver, l'humidité relative devra se situer plus volontiers autour de 50% maximum, pour une température moyenne située entre 18 et 24°C. Surveiller cette constante permet de préserver la santé des usager et l'état des installations",
  date: 'Date de mesure.'
}

const graphTypes = {
  pie: 'pie',
  bar: 'bar',
  line: 'line'
}

// todo: replace items implementation with datasets

export const initGraphState = {
  params: {
    baseUrl: 'https://data.ratp.fr/api/records/1.0/search/',
    /* private */
    __nextNodeId: 3,
    /* public */
    // eslint-disable-next-line fp/no-mutation
    getNextNodeId: () => 'canvas_' + initGraphState.params.__nextNodeId++,
    datasetIds: datasetIds,
    namesToLabels: namesToLabels,
    namesToInfo: namesToInfo,
    graphTypes: graphTypes,
    /* Array<Chart>() */
    graphDivId: 'graph_div',
    graphClass: 'canvas'
  },
  graphs: [
    {
      nodeId: 'canvas_0',
      displayInfo: true,
      isSet: false,
      chart: null,
      ctx: null,
      args: null,
      params: {
        type: 'line',
        datasetId: datasetIds.roosevelt,
        title: 'co2 et température en fonction du temps à Roosevelt',
        names: ['co2', 'temp'],
        rows: 20
      }
    },
    {
      nodeId: 'canvas_1',
      displayInfo: true,
      isSet: false,
      chart: null,
      ctx: null,
      args: null,
      params: {
        type: 'line',
        datasetId: datasetIds.auber,
        title: 'no et température en fonction du temps à Auber',
        names: ['no', 'temp'],
        rows: 20
      }
    },
    {
      nodeId: 'canvas_2',
      displayInfo: true,
      isSet: false,
      chart: null,
      ctx: null,
      args: null,
      params: {
        type: 'line',
        datasetId: datasetIds.roosevelt,
        title: 'co2 et température en fonction du temps à Roosevelt',
        names: ['co2', 'temp'],
        rows: 20
      }
    }
  ]
}

export const fxGraphStateInit = (state, actions) =>
  state.graph.graphs.map(
    graph => actions.graph.effects.effectFetch(
      (props, data) =>
        actions.graph.state.updateGraph(
          props,
          { nodeId: graph.nodeId, data: data }
        ),
      {
        url: makeUrlQuery(
          state.graph.params.baseUrl,
          {
            dataset: graph.params.datasetId,
            rows: graph.params.rows
          }
        )
      }
    )
  )
