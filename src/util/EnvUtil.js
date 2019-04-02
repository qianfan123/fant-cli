const LOCAL_FLAG = 'localhost' // 开发本地
const TEST_FLAG = 'test' // 测试环境
const BRANCH_FLAG = 'branch' // 分支环境
const UAT_FLAG = 'branch' // uat环境
const PORT = '8028'

export default class EnvUtil {
  static getServiceUrl() {
    if (EnvUtil.isDev() || EnvUtil.isTest()) {
      // @todo 这里需要修改为自己服务端的url和端口
      return `http://api-vcs-${TEST_FLAG}.qianfan123.com:${PORT}/`
    } else if (EnvUtil.isBranch()) {
      // @todo 这里需要修改为自己服务端的url和端口
      return `http://api-vcs-${BRANCH_FLAG}.qianfan123.com:${PORT}/`
    } else if (EnvUtil.isUat()) {
      // @todo 这里需要修改为自己服务端的url和端口
      return `http://api-vcs-${UAT_FLAG}.qianfan123.com:${PORT}/`
    } else {
      // @todo 这里需要修改为自己服务端的url和端口
      return `http://api-vcs-${TEST_FLAG}.qianfan123.com:${PORT}/`
    }
  }

  static isDev() {
    return window.location.href.toLocaleLowerCase().indexOf(`://${LOCAL_FLAG}`) !== -1
  }

  static isTest() {
    return window.location.href.toLocaleLowerCase().indexOf(`/${TEST_FLAG}`) !== -1
  }

  static isBranch() {
    return window.location.href.toLocaleLowerCase().indexOf(`/${BRANCH_FLAG}`) !== -1
  }

  static isUat() {
    return window.location.href.toLocaleLowerCase().indexOf(`/${UAT_FLAG}`) !== -1
  }
}
