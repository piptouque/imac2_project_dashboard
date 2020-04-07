
import axios from 'axios'
import { interval } from '@hyperapp/time'

import { clockActions, clockSubscriptions, tick } from './ClockActions'


const mapFuncState = (func, stateKey) =>
  state => {
    var cpyState = { ...state }
    cpyState[stateKey] = func(cpyState[stateKey])
    return cpyState
  }

const mapProsState = (func, stateKey) => state => func(state[stateKey])

const mapEntryState =  (key, func, stateKey) =>
  [key, mapFuncState(func, stateKey)]  

const mapActions = actions => 
  {
    var mappedActions = { ...actions }
    mappedActions[actions.actionsKey] =
      Object.fromEntries(
        Object.entries(mappedActions[actions.actionsKey])
              .map(entry => 
                mapEntryState(entry[0], entry[1], actions.stateKey)
              )
      )
    return mappedActions
  }

const printState = state => { console.log(state); return state }

export const actions = {
  clock: mapActions(clockActions),
  misc: {
    printState
  }
}

const mappedTick = (state, time) => ({ ...state, clock: tick(state.clock, time) })

export const subscriptions = state => 
  interval(mappedTick, { delay: 1000 })

/*
import { interval } from '@hyperapp/time'
export const tick = (state, time) => ({ ...state, clock: {...state.clock, time } })
export const subscriptions = state => interval(tick, { delay: 1000 })
*/