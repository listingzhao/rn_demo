function stringfiyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v
    case 'boolean':
      return v ? 'true' : 'false'
    case 'number':
      return isFinite(v) ? v : ''
    default:
      return ''
  }
}

let encodeURIComponent = window.encodeURIComponent

function QS(obj, sep, eq, name) {
  sep = sep || '&'
  eq = eq || '='
  if (obj === null) {
    obj = undefined
  }

  if (typeof obj === 'object') {
    let qsStr = Object.keys(obj)
      .map(function(k) {
        let ks = k.replace(/\$([0-9_]+)/g, '')
        ks = encodeURIComponent(stringfiyPrimitive(ks)) + eq
        if (Array.isArray(obj[k])) {
          return obj[k]
            .map(function(v) {
              return ks + encodeURIComponent(stringfiyPrimitive(v))
            })
            .join(sep)
        } else if (Object.prototype.toString.call(obj[k]) === '[object Object]') {
          return ks + encodeURIComponent(stringfiyPrimitive(JSON.stringify(obj[k])))
        } else {
          return ks + encodeURIComponent(stringfiyPrimitive(obj[k]))
        }
      })
      .join(sep)
    return qsStr
  }

  if (!name) return ''
  return encodeURIComponent(stringfiyPrimitive(name)) + encodeURIComponent(stringfiyPrimitive(obj))
}

module.exports = QS
