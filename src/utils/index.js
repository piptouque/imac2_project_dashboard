
export const mapFuncState = (func, stateKey) =>
  // eslint-disable-next-line fp/no-rest-parameters
  (state, ...args) => ({
    ...state,
    [stateKey]: func(state[stateKey], ...args)
  })

const mapEntryState = (key, func, stateKey) =>
  [key, mapFuncState(func, stateKey)]

export const mapEntriesState = (subActions, stateKey) =>
  Object.fromEntries(
    Object.entries(subActions)
      .map(entry =>
        mapEntryState(
          entry[0],
          entry[1],
          stateKey
        )
      )
  )

// Pretty silly, but whatever
export const mapEffect = ([fx, props], stateKey) => [
  fx,
  {
    ...props,
    action: mapFuncState(props.action, stateKey)
  }
]
