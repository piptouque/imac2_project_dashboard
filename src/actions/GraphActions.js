
import { Chart } from 'chart.js'
import { request } from '@hyperapp/http'
import { requestQuery } from '../effects/request'

import { namesToLabels } from '../state/GraphState'

const checkResponse = action =>
  (props, data) => {
    /*
     * Here we make sure the data we got
     * in response to our HTTP request
     * is valid.
     * If it is, we go through with the action
     * If it isn't, we should instead return the state unmodified
     */
    /* silly test for now */
    // todo: find a better test
    const isValid = data => data !== undefined && data.parameters !== undefined && data.records !== undefined
    return isValid(data) ? action(props, data) : state => ({ ...state })
  }

const randomHexColour = () =>
  '#000000'.replace(
    /0/g,
    () => Math.floor(Math.random() * 16).toString(16)
  )

export const graphActions = {
  stateKey: 'graph',
  actionsKey: 'state',
  utils: {
    chartFieldsFromData: (label, data) =>
      data.records.map(record => record.fields[label]),

    convertDate: (dates) =>
      dates.map(date => date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4) + ' à ' + date.substring(11, 13) + 'h'),

    labelsFromType: (params, names) => {
      const labels = namesToLabels(params.datasetId)
      return names && names.map(name => labels[name])
    },
    namesFromType: (params) => {
      return params.names && params.type === 'line'
        ? params.names.filter(name => name !== params.x)
        : params.names
    },
    datasetsFromData: (params, names, labels, data) => {
      const inData = label => graphActions.utils.chartFieldsFromData(label, data)
      switch (params.type) {
        case 'line':
          return labels.map(
            (label, index) => ({
              label: names[index],
              data: inData(label),
              borderColor: randomHexColour(),
              fill: false
            })
          )
        case 'bar':
          return labels.map(
            (label, index) => ({
              label: names[index],
              data: inData(label),
              backgroundColor: randomHexColour()
            })
          )
        case 'pie':
          return labels.map(
            (label, index) => ({
              label: names[index],
              data: inData(label),
              // eslint-disable-next-line no-unused-vars
              backgroundColor: inData(label).map(_ => randomHexColour())
            })
          )
        default:
          return null
      }
    },
    listFromData: (params, names, data) => {
      const xLabel = namesToLabels(params.datasetId)[params.x] === undefined ? namesToLabels(params.datasetId).date : namesToLabels(params.datasetId)[params.x]
      const lab = xLabel === 'dateheure' ? graphActions.utils.convertDate(graphActions.utils.chartFieldsFromData(xLabel, data)) : graphActions.utils.chartFieldsFromData(xLabel, data)
      return names && params.type === 'line'
        ? lab
        : names
    },
    chartArgsFromData: (params, data) => {
      const names = graphActions.utils.namesFromType(params)
      const labels = graphActions.utils.labelsFromType(params, names)
      const datasets = labels && names && graphActions.utils.datasetsFromData(params, names, labels, data)
      const listLabels = names && graphActions.utils.listFromData(params, names, data)
      return ({
        type: params.type,
        data: {
          labels: listLabels,
          datasets: datasets
        },
        options: { title: { display: true, text: params.title } }
      })
    },
    freeChart: chart => {
      /* Should be called before setting the chart again */
      chart.destroy()
    },
    createChart: (ctx, args) => new Chart(ctx, { ...args }),
    createGraph: (nodeId, params) => ({
      nodeId: nodeId,
      isSet: false,
      displayInfo: false,
      chart: null,
      ctx: null,
      params: params,
      args: null
    }),
    getGraphFromNodeId: (graphs, nodeId) => graphs.find(graph => graph.nodeId === nodeId),
    setContextChart: (graph, ctx) => {
      /*
       * We need to delete the chart
       * in case it has already been set
       * see:
       * https://stackoverflow.com/questions/24815851/how-to-clear-a-chart-from-a-canvas-so-that-hover-events-cannot-be-triggered
       */
      if (graph.isSet) {
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
    updateChart: (graph, { params, displayInfo, data }) => {
      const updatedParams = { ...graph.params, ...params }
      const updatedData = data === undefined ? graph.data : data
      const args = updatedData && graphActions.utils.chartArgsFromData(updatedParams, updatedData)
      const updatedChart = {
        ...graph,
        displayInfo: displayInfo === undefined ? graph.displayInfo : displayInfo,
        params: updatedParams,
        args: args,
        data: updatedData
      }
      return graph.isSet
        ? graphActions.utils.setContextChart(updatedChart, updatedChart.ctx)
        : updatedChart
    },
    graphIndexFromId: (graphs, graphId) =>
      graphs.findIndex(graph => graph.nodeId === graphId),
    graphFromId: (graphs, graphId) => graphs[graphActions.utils.graphIndexFromId(graphs, graphId)]
  },
  effects: {
    effectFetch: (action, { url }) =>
      request({
        url: url,
        expect: 'json',
        action: checkResponse(action)
      }),
    effectFetchQuery: (action, { baseUrl, config }) =>
      requestQuery({
        baseUrl: baseUrl,
        config: config,
        expect: 'json',
        action: checkResponse(action)
      }),
    fetchDatasetQuery: (action, payload) => state => [
      state,
      graphActions.effects.effectFetchQuery(action, payload)
    ],
    fetchDataset: (action, payload) => state => [
      state,
      graphActions.effects.effectFetch(action, payload)
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
    updateGraph: (props, { nodeId, displayInfo, data, ...params }) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId),
        graphActions.utils.updateChart(
          graphActions.utils.getGraphFromNodeId(
            props.graphs, nodeId
          ),
          { params, displayInfo, data }
        )
      ]
    }),
    removeGraph: (props, { nodeId }) => {
      const graph = graphActions.utils.graphFromId(props.graphs, nodeId)
      if (graph.isSet) {
        graphActions.utils.freeChart(graph.chart)
      }
      const updatedProps = {
        ...props,
        graphs:
          props.graphs.filter(graph => graph.nodeId !== nodeId)
      }
      return updatedProps
    },
    addGraph: (props, params) => {
      const nodeId = props.params.getNextNodeId()
      return {
        ...props,
        graphs: [
          ...props.graphs, graphActions.utils.createGraph(nodeId, params)
        ]
      }
    }
  }
}
