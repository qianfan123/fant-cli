export default class EnvUtil {
  static getServiceUrl() {
    if (EnvUtil.isDev() || EnvUtil.isTest()) {
      return 'http://api-vcs-test.qianfan123.com:8028/'
    } else if (EnvUtil.isBranch()) {
      return 'http://api-vcs-branch.qianfan123.com:8028/'
    } else if (EnvUtil.isUat()) {
      return 'http://api-vcs-uat.qianfan123.com:8028/'
    } else {
      return 'http://api-vcs-test.qianfan123.com:8028/'
    }
  }

  static isDev() {
    return window.location.href.toLocaleLowerCase().indexOf('://localhost:') !== -1
  }

  static isTest() {
    return window.location.href.toLocaleLowerCase().indexOf('/test') !== -1
  }

  static isBranch() {
    return window.location.href.toLocaleLowerCase().indexOf('/branch') !== -1
  }

  static isUat() {
    return window.location.href.toLocaleLowerCase().indexOf('/uat') !== -1
  }
}
