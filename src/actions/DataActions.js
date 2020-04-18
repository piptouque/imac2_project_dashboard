
import { request } from '@hyperapp/http'

const makeFetchURL = (datasetId, rows) => {
  const appendRows = rows === undefined ? '' : `&rows=${rows}`
  const baseURL = `https://data.ratp.fr/api/records/1.0/search/?dataset=${datasetId}`
  return baseURL + appendRows
}

const checkResponse = action =>
  (props, data) => {
    /*
     * Here we make sure the data we got
     * in response to our HTTP request
     * is valid.
     * If it is, we go through with the action
     * If it isn't, we should instead return the state unmodified
     */
    console.log(data)
    /* silly test for now */
    // todo: find a better test
    const isValid = data => data !== undefined && data.parameters !== undefined && data.records !== undefined
    return isValid(data) ? action(props, data) : state => ({ ...state })
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
        action: checkResponse(action)
      })
    ]
  },
  // todo: fill dataset, not items
  state: {
    fillDataset: (props, data) => ({
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
    }),
    addDataset: (props, { data, labels }) => ({
      ...props,
      datasets: [
        ...props.datasets, // on prend tout le tab et en plus je rajoute un élément
        {
          id: data.parameters.dataset,
          labels: labels,
          data:
            labels.map(
              label => data.records.map(record => record.fields[label])
            )
        }
      ]
    })
  }
}
