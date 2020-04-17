
import { request } from '@hyperapp/http'

const makeFetchURL = (datasetId, rows) => {
  const appendRows = rows === undefined ? '' : `&rows=${rows}`
  const baseURL = `https://data.ratp.fr/api/records/1.0/search/?dataset=${datasetId}`
  return baseURL + appendRows
}

export const dataActions = {
  stateKey: 'data',
  actionsKey: 'state',
  utils: {
    fetchDataset: (action, datasetId, rows) => state => [
      state,
      request({
        url: makeFetchURL(datasetId, rows),
        expect: 'json',
        action: action
      })
    ]
  },
  state: {
    fillDataset: (props, data) => {
      console.log(data)
      return {
        ...props,
        items: data.records.map(
          item => ({
            date: item.fields.dateheure,
            temperature: item.fields.tch4,
            humidity: item.fields.hycha4,
            no2: item.fields.n2cha4,
            no: item.fields.nocha4,
            co2: item.fields.c2cha4
          })
        )
      }
    }
  }
}
