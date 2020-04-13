
export const infoActions = {
  printState: state => { console.log(state); return state },
  printActions: (state, actions) => { console.log(actions); return state }
}
