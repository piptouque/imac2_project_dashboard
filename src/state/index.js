
import { initInfoState } from './InfoState'
import { initClockState } from './ClockState'
import { initGraphState } from './GraphState'
import { initDataState } from './DataState'

export const initState = {
  info: initInfoState,
  clock: initClockState(Date.now()),
  graph: initGraphState,
  data: initDataState
}
