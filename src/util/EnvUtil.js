export default class EnvUtil {
  static getServiceUrl () {
    if (EnvUtil.isDev() || EnvUtil.isTest()) {
      return 'https://api-alphamo-test.qianfan123.com:8302/alphamo'
    } else if (EnvUtil.isJdBranch()) {
      return 'http://api-alphamo-branch-jd.qianfan123.com:8001/alphamo'
    } else if (EnvUtil.isBranch()) {
      return 'https://api-alphamo-branch.qianfan123.com:8306/alphamo'
    } else if (EnvUtil.isUat()) {
      return 'https://api-alphamo-uat.qianfan123.com:8308/alphamo'
    } else {
      return 'https://api-alphamo.qianfan123.com/alphamo'
    }
  }

  static isDev () {
    return window.location.href.toLocaleLowerCase().indexOf('://localhost:') !== -1
  }

  static isTest () {
    return window.location.href.toLocaleLowerCase().indexOf('/test') !== -1
  }

  static isBranch () {
    return window.location.href.toLocaleLowerCase().indexOf('/branch') !== -1
  }

  static isJdBranch () {
    return window.location.href.toLocaleLowerCase().indexOf('mao-jd') !== -1 && window.location.href.toLocaleLowerCase().indexOf('/branch') !== -1
  }

  static isUat () {
    return window.location.href.toLocaleLowerCase().indexOf('/uat') !== -1
  }

  static isProd () {
    return window.location.href.toLocaleLowerCase().indexOf('/prod') !== -1
  }
}
