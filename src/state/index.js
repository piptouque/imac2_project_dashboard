
import { initInfoState } from './InfoState'
import { initClockState } from './ClockState'
import { initGraphState, fxGraphStateInit } from './GraphState'

import { actions } from '../actions'

const initStateNoEffect = {
  info: initInfoState,
  clock: initClockState(Date.now()),
  graph: initGraphState
}

export const initState = [
  initStateNoEffect,
  fxGraphStateInit(initStateNoEffect, actions)
]
