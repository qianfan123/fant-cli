import ApiClient from 'http/ApiClient'
import Response from 'model/response/Response'
import LoginResult from 'model/auth/LoginResult'

export default class AuthApi {
  /**
   * 登录
   *
   * @param account 登录账号
   * @param password 密码
   */
  static login(account: string, password: string): Promise<Response<LoginResult>> {
    return ApiClient.server().post(`v1/auth/login`, {}, {
      params: {
        account: account,
        password: password
      }
    }).then((res) => {
      return res.data
    })
  }

  /**
   * 注销
   *
   */
  static logout(): Promise<Response<string>> {
    return ApiClient.server().get(`v1/auth/logout`).then((res) => {
      return res.data
    })
  }

}
