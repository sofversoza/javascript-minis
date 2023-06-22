// helper functions to get, set, update custom css value easier


// elem-ent where we're getting the property from (ex: ground)
// prop-erty we want to get (ex: --left)
export function getCustomProperty(elem, prop) {
  // allows us to get css variables (getComputedStyle)
  // getPropertyValue gets the css property value, returns a string 
  // convert from css string to number (parseFloat) 
  // if there's no value we'll default it to 0
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)  // ex) prop: --left, value: 7%
}

export function incrementCustomProperty(elem, prop, inc) {
  // we're getting current value (getCustomProperty) + adding increment amount to it
  // then setting that value (setCustomProperty)
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}