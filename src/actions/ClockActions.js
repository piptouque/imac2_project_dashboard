
export const clockActions = {
  stateKey: 'clock',
  actionsKey: 'state',
  utils: {
    timeToUnits: time => [time.getHours(), time.getMinutes(), time.getSeconds()],
    formatTime: (hours, minutes, seconds, use24) => {
      return (use24 ? hours : hours % 12) + ':' +
      `${minutes}`.padStart(2, '0') + ':' +
      `${seconds}`.padStart(2, '0') +
      (use24 ? '' : hours >= 12 ? 'PM' : 'AM')
    },
    posixToHumanTime: (time, use24) => clockActions.utils.formatTime(...clockActions.utils.timeToUnits(new Date(time)), use24)
  },
  /** **/
  state: {
    toggleFormat: props => ({ ...props, use24: !props.use24 })
  }
}
