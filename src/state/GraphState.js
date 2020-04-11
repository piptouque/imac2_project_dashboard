
// import { Chart } from 'chart.js'

/*
 * Hyperapp v2 does not support lifecycle events
 * (oncreate, ...)
 * We should fetch data instead, see:
 * https://github.com/jorgebucaran/hyperapp/issues/717
 *
*/

export const initGraphState = {
  /* private */
  __nextNodeId: 0,
  /* public */
  // eslint-disable-next-line fp/no-mutation
  getNextNodeId: () => 'canvas_' + initGraphState.__nextNodeId++,
  /* Array<Chart>() */
  graphs: []
}
