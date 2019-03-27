import ApiClient from 'http/ApiClient'
import Response from 'model/response/Response'
import User from 'model/example/User'

export default class UserApi {
  /**
   * 搜索（startsWith）
   *
   * @param keyword 关键字，根据名称或id搜索以keyword开头的人员信息
   * @param countLimit 查询数量，默认为10
   */
  static search(keyword: string, countLimit: number): Promise<Response<User[]>> {
    return ApiClient.file(`mock/user/search.json`).get('').then((res) => {
      return res.data
    })
  }

}
