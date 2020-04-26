
const fx = function (a) {
  return function (b) {
    return [a, b]
  }
}

export const makeUrlQuery = function (baseUrl, props) {
  const query =
    Object.entries(props)
      .reduce(
        function (acc, entry) {
          const appended = acc === ''
            ? entry[0] + '=' + entry[1]
            : acc + '&' + entry[0] + '=' + entry[1]
          return entry[1] === undefined
            ? acc
            : appended
        },
        '')
  return baseUrl + '?' + query
}

const attribFromPath = function (state, path) {
  const attrib = path.reduce(
    function (acc, field) {
      return acc[field]
    },
    state
  )
  return attrib
}

const queryFromState = function (state, config) {
  const props = Object.fromEntries(
    Object.entries(config)
      .map(
        function (entry) {
          return [entry[0], attribFromPath(state, entry[1])]
        })
  )
  return props
}

const makeUrl = function (state, { baseUrl, config }) {
  return makeUrlQuery(baseUrl, queryFromState(state, config))
}

export const requestQuery = fx((dispatch, props) => {
  const baseUrl = props.baseUrl
  const config = props.config
  const action = props.action
  const options = props.options || {}
  const expect = props.expect || 'text'

  /* BAD */
  const url = makeUrl(dispatch(state => state), { baseUrl, config })

  return fetch(url, options)
    .then(function (response) {
      if (!response.ok) {
        // eslint-disable-next-line fp/no-throw
        throw response
      }
      return response
    })
    .then(function (body) {
      return body[expect]()
    })
    .then(function (result) {
      dispatch(action, result)
    })
    .catch(function (error) {
      dispatch(action, error)
    })
})
