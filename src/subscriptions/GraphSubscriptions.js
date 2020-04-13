import { observe } from './observe'

import { actions } from '../actions'

const updateGraph = state => {
  return actions.graph.state.updateGraphs(state)
}

// eslint-disable-next-line no-unused-vars
export const graphSubscriptions = init =>
  observe(updateGraph, {
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
