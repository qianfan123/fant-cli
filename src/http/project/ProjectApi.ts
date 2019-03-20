import ApiClient from 'http/ApiClient'
import Response from 'model/response/Response'
import QueryParam from 'model/request/QueryParam'
import Project from 'model/project/Project'
export default class ProjectApi {
    /**
     * 删除接口
     *
     */
    static batchDelete(idArr: string[]): Promise<Response<void>> {
        return ApiClient.server().post(`v1/project/batch/delete`, idArr).then((res) => {
            return res.data
        })
    }
    /**
     * 删除接口
     *
     * @param id 项目ID
     * @param version 数据版本
     */
    static delete(id: string, version: number): Promise<Response<void>> {
        return ApiClient.server().post(`v1/project/delete`, {}, {
            params: {
                id: id,
                version: version
            }
        }).then((res) => {
            return res.data
        })
    }
    /**
     * 详情
     *
     * @param id 项目ID
     */
    static get(id: string): Promise<Response<Project>> {
        return ApiClient.server().get(`v1/project/get`, {
            params: {
                id: id
            }
        }).then((res) => {
            return res.data
        })
    }
    /**
     * 分页查询
     *
     */
    static query(body: QueryParam): Promise<Response<Project[]>> {
        return ApiClient.server().post(`v1/project/query`, body).then((res) => {
            return res.data
        })
    }
    /**
     * 编辑接口
     *
     */
    static saveModify(body: Project): Promise<Response<void>> {
        return ApiClient.server().post(`v1/project/save/modify`, body).then((res) => {
            return res.data
        })
    }
    /**
     * 新建接口，返回id
     *
     */
    static saveNew(body: Project): Promise<Response<string>> {
        return ApiClient.server().post(`v1/project/save/new`, body).then((res) => {
            return res.data
        })
    }
    /**
     * 升级接口（暂不支持。页面点升级直接跳到创建任务接口）
     *
     * @param id 项目ID
     * @param product 产品ID
     */
    static upgrade(id: string, product: string): Promise<Response<void>> {
        return ApiClient.server().post(`v1/project/upgrade`, {}, {
            params: {
                id: id,
                product: product
            }
        }).then((res) => {
            return res.data
        })
    }
}