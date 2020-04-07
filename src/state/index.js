import { initClockState } from './ClockState'

export const initState = {
    info: {
        title: 'AirDashboard',
        descr: 'End-of-semester project for the IMAC2 web development course',
        authors: ['Ruben BRAMI', 'Pierre LABENDZKI', 'Pierre THIEL']
    },
    clock: initClockState(Date.now())
}