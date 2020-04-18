
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
        options: { title: { display: true, text: title } }
      }),
    createLine: (ctx, title, x, dataset) =>
      new Chart(ctx, {
        type: 'line',
        data: { labels: x, datasets: dataset },
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
        },
        options: { title: { display: true, text: title } }
      }),
    getGraphFromNodeId: (graphs, nodeId) => graphs.find(graph => graph.nodeId === nodeId),
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
    setGraph: (props, { nodeId, ctx }) => ({
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
    addGraph: (props, { callback, ...payload }) => {
      const nodeId = props.getNextNodeId()
      const args = Object.values(payload)
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
      )
  }
}
