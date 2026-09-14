export function isEqual (x, y) {
  if (x === y) {
    return true
  } else if ((typeof x === "object" && x !== null) && (typeof y === "object" && y !== null)) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false
    }

    for (const prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!isEqual(x[prop], y[prop])) {
          return false
        }
      } else {
        return false
      }
    }

    return true
  } else {
    return false
  }
}

export function cloneDeep<T> (obj: T): T {
  if (obj === null || typeof (obj) !== "object" || "isActiveClone" in obj) {
    return obj
  }

  const temp = obj.constructor()

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // @ts-ignore
      obj.isActiveClone = null
      temp[key] = cloneDeep(obj[key])
      // @ts-ignore
      delete obj.isActiveClone
    }
  }
  return temp
}
