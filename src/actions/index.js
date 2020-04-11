
import { interval } from '@hyperapp/time'

import { infoActions } from './InfoActions'
import { clockActions, tick } from './ClockActions'
import { graphActions } from './GraphActions'

const mapFuncState = (func, stateKey) =>
  // eslint-disable-next-line fp/no-rest-parameters
  (state, ...args) => ({
    ...state,
    [stateKey]: func(state[stateKey], ...args)
  })

const mapEntryState = (key, func, stateKey) =>
  [key, mapFuncState(func, stateKey)]

const mapActions = actions => ({
  ...actions,
  [actions.actionsKey]:
      Object.fromEntries(
        Object.entries(actions[actions.actionsKey])
          .map(entry =>
            mapEntryState(
              entry[0],
              entry[1],
              actions.stateKey
            )
          )
      )
})

export const actions = {
  clock: mapActions(clockActions),
  graph: mapActions(graphActions),
  /* need no mapping for miscellaneous actions */
  misc: infoActions
}

const mappedTick = (state, time) => ({ ...state, clock: tick(state.clock, time) })

// const updateGraph = actions.graph.state.updateGraphs

// eslint-disable-next-line no-unused-vars
export const subscriptions = _state => [
  [
    interval(mappedTick, { delay: 1000 })
  ]
]
