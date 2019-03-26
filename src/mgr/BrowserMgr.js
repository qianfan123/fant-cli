/**
 * 缓存管理器
 */
export const storage = {
  getItem: function (key, namespace, defaultValue) {
    if (namespace) {
      key = namespace + '-' + key
    }
    var value = null
    value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else if (arguments.length === 3) {
      return defaultValue
    }
    return value
  },

  setItem: function (key, value, namespace) {
    if (namespace) {
      key = namespace + '-' + key
    }
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  },

  clearItem: function (key, namespace) {
    if (namespace) {
      key = namespace + '-' + key
    }
    localStorage.removeItem(key)
  }
}

export const sessionStorage = {
  getItem: function (key) {
    var value = window.top.sessionStorage.getItem(key)
    if (value === 'undefined') {
      return null
    }
    if (value) {
      return JSON.parse(value)
    }
    return value
  },

  setItem: function (key, value) {
    window.top.sessionStorage.setItem(key, JSON.stringify(value))
  },

  clearItem: function (key) {
    window.top.sessionStorage.removeItem(key)
  }
}
export default { storage, sessionStorage }
