
import { Chart } from 'chart.js'

export const graphActions = {
  stateKey: 'graph',
  actionsKey: 'state',
  utils: {
    createDataset: (name, data) => ({ data, label: name }),
    createBar: (ctx, title, labels, data) =>
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: data
          }]
        },
        options: {
          title: {
            display: true,
            text: title
          }
        }
      }),
    createLine: (ctx, title, x, datasets) =>
      new Chart(ctx, {
        type: 'line',
        data: { labels: x, datasets: datasets },
        options: { title: { display: true, text: title } }
      }),

    createPie: (ctx, title, labels, data) =>
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'TODO',
            data: data
          }]
        }
      }),
    getGraphFromNodeId: (graphs, nodeId) => graphs.find(graph => graph.nodeId === nodeId),
    getContext: graph => {
      const element = document.getElementById(graph.nodeId)
      return element === null ? null : element.getContext('2d')
    },
    setChart: (graph, ctx) => ({
      ...graph,
      isSet: true,
      chart: graph.callback(
        ctx,
        ...graph.args
      )
    })
  },
  state: {
    setGraph: (props, nodeId, ctx) => ({
      ...props,
      graphs: [
        ...props.graphs.filter(graph => graph.nodeId !== nodeId),
        graphActions.utils.setChart(
          graphActions.utils.getGraphFromNodeId(
            props.graphs, nodeId
          ),
          ctx
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
    addGraph: (props, callback, ...args) => {
      const nodeId = props.getNextNodeId()
      return {
        ...props,
        graphs: [
          ...props.graphs, {
            nodeId: nodeId,
            isSet: false,
            chart: null,
            callback: callback,
            args: args
          }
        ]
      }
    },
    addBar: (props, title, labels, data) =>
      graphActions.state.addGraph(
        props,
        graphActions.utils.createBar,
        title, labels, data
      ),
    addBarWhatever: props =>
      graphActions.state.addBar(
        props,
        "Qu'importe",
        ['Coucou', 'ça', 'va', '?'],
        [0, 1, 2, 3]
      )
  }
}
