
import { initInfoState } from './InfoState'
import { initClockState } from './ClockState'
import { initGraphState } from './GraphState'

export const initState = {
  info: initInfoState,
  clock: initClockState(Date.now()),
  graph: initGraphState
}
