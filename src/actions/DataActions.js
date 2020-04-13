
import { request } from '@hyperapp/http'

// eslint-disable-next-line no-unused-vars
const fetchDataset = action =>
  (props, datasetId, { rows }) => [
    props,
    request({
      url: `https://data.ratp.fr/api/records/1.0/search/?dataset=${datasetId}&rows=${rows}`,
      action: action
    })
  ]

export const dataActions = {
  stateKey: 'data',
  actionsKey: 'state',
  utils: {

  },
  state: {
    fillDataset: (props, response) => ({
      ...props,
      items: response.data.records.map(
        item => ({
          date: item.fields.dateheure,
          temperature: item.fields.tch4,
          humidity: item.fields.hycha4,
          no2: item.fields.n2cha4,
          no: item.fields.nocha4,
          co2: item.fields.c2cha4
        })
      )
    })

  }
}
