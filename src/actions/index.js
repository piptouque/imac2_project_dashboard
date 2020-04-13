
import { infoActions } from './InfoActions'
import { clockActions } from './ClockActions'
import { graphActions } from './GraphActions'

import { mapEntriesState } from '../utils'

const mapActions = actions => ({
  ...actions,
  [actions.actionsKey]: mapEntriesState(actions[actions.actionsKey], actions.stateKey)
})

export const actions = {
  clock: mapActions(clockActions),
  graph: mapActions(graphActions),
  /* need no mapping for miscellaneous actions */
  misc: infoActions
}
