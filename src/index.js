import { app } from 'hyperapp'

import { view } from './components/views/ClockView'
import { initClockState } from './state'

import { interval } from '@hyperapp/time'

const Tick = (state, time) => ({ ...state, time })

app({
  init: initClockState(),
  view: view,
  subscriptions: state => interval(Tick, { ...state, delay: 1000 }),
  node: document.body
})
