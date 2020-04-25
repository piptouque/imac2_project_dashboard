
// import { Chart } from 'chart.js'

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

const graphTypes = {
  pie: 'pie',
  bar: 'bar',
  line: 'line'
}

// todo: replace items implementation with datasets

export const initGraphState = {
  graphs: [],
  params: {
    baseUrl: 'https://data.ratp.fr/api/records/1.0/search/',
    /* private */
    __nextNodeId: 0,
    /* public */
    // eslint-disable-next-line fp/no-mutation
    getNextNodeId: () => 'canvas_' + initGraphState.params.__nextNodeId++,
    datasetIds: datasetIds,
    namesToLabels: namesToLabels,
    graphTypes: graphTypes,
    /* Array<Chart>() */
    graphDivId: 'graph_div',
    graphClass: 'canvas'
  }
}
