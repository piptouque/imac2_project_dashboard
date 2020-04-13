
import { infoActions } from './InfoActions'
import { clockActions } from './ClockActions'
import { graphActions } from './GraphActions'
import { dataActions } from './DataActions'

import { mapEntriesState } from '../utils'

const mapActions = actions => ({
  ...actions,
  [actions.actionsKey]: mapEntriesState(actions[actions.actionsKey], actions.stateKey)
})

export const actions = {
  clock: mapActions(clockActions),
  graph: mapActions(graphActions),
  data: mapActions(dataActions),
  /* need no mapping for miscellaneous actions */
  misc: infoActions
}
