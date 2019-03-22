import ApiClient from 'http/ApiClient'
import Response from 'model/response/Response'
import Project from 'model/test/Project'
import QueryParam from 'model/request/QueryParam'

export default class ProjectApi {
  /**
   * 列表
   */
  static query(body: QueryParam): Promise<Response<Project[]>> {
    return ApiClient.file(`mock/project/query.json`).get('').then((res) => {
      return res.data
    })
  }

  /**
   * 删除接口
   */
  static delete(id: string): Promise<Response<void>> {
    return ApiClient.file(`mock/project/delete.json`).get('').then((res) => {
      return res.data
    })
  }

  /**
   * 详情
   */
  static get(id: string): Promise<Response<Project>> {
    return ApiClient.file(`mock/project/get.json`).get('').then((res) => {
      return res.data
    })
  }

  /**
   * 编辑接口
   */
  static saveModify(body: Project): Promise<Response<void>> {
    return ApiClient.file(`mock/project/saveModify.json`).get('').then((res) => {
      return res.data
    })
  }

  /**
   * 新建接口，返回id
   */
  static saveNew(body: Project): Promise<Response<string>> {
    return ApiClient.file(`mock/project/saveNew.json`).get('').then((res) => {
      return res.data
    })
  }
}