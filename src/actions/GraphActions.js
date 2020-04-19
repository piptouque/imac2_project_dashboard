
import { Chart } from 'chart.js'
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

const filter = (payload, callback) =>
  Object.fromEntries(
    Object.entries(payload)
      .filter(callback)
  )

export const graphActions = {
  stateKey: 'graph',
  actionsKey: 'state',
  utils: {
    createDataset: (name, data) => ({ data, label: name }),
    createBar: (ctx, { title, labels, data }) =>
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: data
          }]
        },
        options: { title: { display: true, text: title } }
      }),
    createLine: (ctx, { title, x, labels, dataList }) =>
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: x,
          datasets:
            labels.map((label, index) =>
              graphActions.utils.createDataset(label, dataList[index]))
        },
        options: { title: { display: true, text: title } }
      }),

    createPie: (ctx, { title, labels, data }) =>
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'TODO',
            data: data
          }]
        },
        options: { title: { display: true, text: title } }
      }),
    getGraphFromNodeId: (graphs, nodeId) => graphs.find(graph => graph.nodeId === nodeId),
    setContextChart: (graph, ctx) => ({
      ...graph,
      isSet: true,
      ctx: ctx,
      chart: graph.callback(
        ctx,
        graph.args
      )
    }),
    updateChart: (graph, payload) => {
      const args = filter(payload, entry => entry[0] !== 'callback')
      const callback = payload.callback
      const updatedChart = {
        ...graph,
        callback: callback === undefined ? graph.callback : callback,
        args: {
          ...graph.args,
          ...args
        }
      }
      console.log(updatedChart)
      return graph.isSet
        ? graphActions.utils.setContextChart(updatedChart, updatedChart.ctx)
        : updatedChart
    }
  },
  effects: {
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
    setContextGraph: (props, { nodeId, ctx }) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId),
        graphActions.utils.setContextChart(
          graphActions.utils.getGraphFromNodeId(
            props.graphs, nodeId
          ),
          ctx
        )
      ]
    }),
    updateGraph: (props, { nodeId, ...payload }) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId),
        graphActions.utils.updateChart(
          graphActions.utils.getGraphFromNodeId(
            props.graphs, nodeId
          ),
          payload
        )
      ]
    }),
    removeGraph: (props, nodeId) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId)
      ]
    }),
    // eslint-disable-next-line fp/no-rest-parameters
    addGraph: (props, { ...payload }) => {
      const nodeId = props.params.getNextNodeId()
      const args = filter(payload, entry => entry[0] !== 'callback')
      const callback = payload.callback
      return {
        ...props,
        graphs: [
          ...props.graphs, {
            nodeId: nodeId,
            isSet: false,
            chart: null,
            ctx: null,
            callback: callback,
            args: args
          }
        ]
      }
    },
    addBar: (props, { title, labels, data }) =>
      graphActions.state.addGraph(
        props,
        {
          callback: graphActions.utils.createBar,
          title,
          labels,
          data
        }
      ),
    addBarWhatever: props =>
      graphActions.state.addBar(
        props,
        {
          title: "Qu'importe",
          labels: ['Coucou', 'ça', 'va', '?'],
          data: [0, 1, 2, 3]
        }
      ),
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
