class ObjectUtil {
  static uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + s4() + s4() +
      s4() + s4() + s4() + s4();
  }

  static apply(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      if (source instanceof Array) {
        target.splice(0, target.length);
        for (let item of source) {
          target.push(item);
        }
      } else {
        for (let key in source) {
          console.log(key);
          if (source[key] instanceof Object && !(source[key] instanceof Function)) {
            if (!target.hasOwnProperty(key) || !target[key]) {
              target[key] = {};
            }
            if (source[key] instanceof Array) {
              target[key] = [];
            }
            ObjectUtil.apply(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  }

  static merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }

    return target;
  }

  static copy(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static getValueByPath(object, prop) {
    prop = prop || '';
    const paths = prop.split('.');
    let current = object;
    let result = null;
    for (let i = 0, j = paths.length; i < j; i++) {
      const path = paths[i];
      if (!current) break;

      if (i === j - 1) {
        result = current[path];
        break;
      }
      current = current[path];
    }
    return result;
  }

  static valueEquals(a, b) {
    if (a === b) return true;
    if (!(a instanceof Array)) return false;
    if (!(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i !== a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

export default ObjectUtil;
