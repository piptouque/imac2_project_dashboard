
/*
 * Credits go to sergey-shpak for the original code.
 * link:https://github.com/jorgebucaran/hyperapp/issues/766#issuecomment-428258860.
 * (c'mon)
*/

// DOM Effect
// Observer Implementation
// Will be moved to subscriptions package
const find = (query, nodes, cb) => nodes.forEach(node => {
  if (node.nodeType !== 1) return
  if (Object.keys(query).every(key => node.getAttribute(key) === query[key])) {
    return cb(node)
  } else if (node.childNodes.length) {
    return find(query, node.childNodes, cb)
  }
})

const onChange = (select, cb) => mutations =>
  mutations.forEach(
    ({ target, type, attributeName, oldValue, addedNodes, removedNodes }) => {
      type === 'attributes' &&
      find(select, [target], node =>
        cb(node, { type: 'updated', attribute: [oldValue, attributeName] }))
      addedNodes.length &&
        find(select, addedNodes, node => cb(node, { type: 'added' }))
      removedNodes.length &&
        find(select, removedNodes, node => cb(node, { type: 'removed' }))
    })

const observer = (dispatch, props) => {
  const obs = new MutationObserver(
    onChange(props.select,
      (element, change) => {
        return dispatch([props.action, [element, change]])
      }
    )
  )
  obs.observe(props.target, props.config)
  return () => obs.disconnect()
}

const observerFx = fx => (action, props) => [
  fx, {
    action: action,
    select: props.select,
    target: props.target,
    config: props.config
  }
]

export const observe = observerFx(observer)
