
import { Chart } from 'chart.js'
import { request } from '@hyperapp/http'

import { labelNames } from '../state/GraphState'

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
    // console.log(data)
    /* silly test for now */
    // todo: find a better test
    const isValid = data => data !== undefined && data.parameters !== undefined && data.records !== undefined
    return isValid(data) ? action(props, data) : state => ({ ...state })
  }

export const graphActions = {
  stateKey: 'graph',
  actionsKey: 'state',
  utils: {
    chartArgsFromData: (params, data) => {
      const labels = labelNames(params.datasetId)
      const datasets = params.names.map(
        name => ({
          label: labels[name],
          data: data.records.map(record => record.fields[labels[name]])
        })
      )
      return ({
        type: params.type,
        data: {
          labels: params.names,
          datasets: datasets
        },
        options: { title: { display: true, text: params.title } }
      })
    },
    chartArgsFromParams: params => ({
      type: params.type,
      data: {
        labels: params.names
      },
      options: { title: { display: true, text: params.title } }
    }),
    freeChart: chart => {
      /* Should be called before setting the chart again */
      chart.destroy()
    },
    createChart: (ctx, args) => new Chart(ctx, { ...args }),
    getGraphFromNodeId: (graphs, nodeId) => graphs.find(graph => graph.nodeId === nodeId),
    setContextChart: (graph, ctx) => {
      /*
       * We need to delete the chart
       * in case it has already been set
       * see:
       * https://stackoverflow.com/questions/24815851/how-to-clear-a-chart-from-a-canvas-so-that-hover-events-cannot-be-triggered
       */
      if (graph.chart !== null) {
        graphActions.utils.freeChart(graph.chart)
      }
      return ({
        ...graph,
        isSet: true,
        ctx: ctx,
        chart: graphActions.utils.createChart(
          ctx,
          graph.args
        )
      })
    },
    updateChart: (graph, { params, data }) => {
      const updatedParams = { ...graph.params, ...params }
      const args =
        data === undefined
          ? graphActions.utils.chartArgsFromParams(updatedParams)
          : graphActions.utils.chartArgsFromData(updatedParams, data)
      const updatedChart = {
        ...graph,
        params: updatedParams,
        args: args
      }
      return graph.isSet
        ? graphActions.utils.setContextChart(updatedChart, updatedChart.ctx)
        : updatedChart
    }
  },
  effects: {
    effectFetch: (action, datasetId, rows) =>
      request({
        url: makeFetchURL(datasetId, rows),
        expect: 'json',
        action: checkResponse(action)
      }),
    fetchDataset: (action, datasetId, rows) => state => [
      state,
      graphActions.effects.effectFetch(action, datasetId, rows)
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
    updateGraph: (props, { nodeId, data, ...params }) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId),
        graphActions.utils.updateChart(
          graphActions.utils.getGraphFromNodeId(
            props.graphs, nodeId
          ),
          { params, data }
        )
      ]
    }),
    removeGraph: (props, nodeId) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId)
      ]
    }),
    addGraph: (props, params) => {
      const nodeId = props.params.getNextNodeId()
      return {
        ...props,
        graphs: [
          ...props.graphs, {
            nodeId: nodeId,
            isSet: false,
            chart: null,
            ctx: null,
            params: params,
            args: graphActions.utils.chartArgsFromParams(params)
          }
        ]
      }
    }
  }
}
