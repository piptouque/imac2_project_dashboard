import { observe } from './observe'

import { graphActions } from '../actions/GraphActions'

// eslint-disable-next-line no-unused-vars
const onChangeGraph = (state, [element, change]) => {
  switch (change.type) {
    case 'added':
      return graphActions.state.setContextGraph(state, { nodeId: element.id, ctx: element })
    case 'removed':
      /*
       * Nothing to do, the removeGraph action already unsets everything.
       */
      break
    case 'updated':
      /*
       * Nothing to do either, the actions do all the work.
       */
      break
    default:
      break
  }
  return ({ ...state })
}

// eslint-disable-next-line no-unused-vars
export const graphSubscriptions = init =>
  observe(onChangeGraph, {
    /*
     * target: node to watch, must be in DOM at init.
     * select: required attributes of target to trigger action
     * * if childList is true, target in case of addition and removal
     * * is the Child
     */
    target: init.target,
    select: { class: init.graphClass },
    config: {
      childList: true,
      subtree: true,
      attributes: true
    }
  })
