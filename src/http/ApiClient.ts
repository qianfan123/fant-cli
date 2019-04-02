/**
 * created by ckj 2018/10/30
 */
import axios from 'axios';
import store from '../store';

import { ObjectUtil } from 'fant3';
import ShortcutMgr from 'mgr/ShortcutMgr';

import EnvUtil from 'util/EnvUtil.js';

const qs = require('qs');
axios.defaults.paramsSerializer = (params: any) => {
  return qs.stringify(params, { arrayFormat: 'repeat' });
};
axios.defaults.timeout = 60000;

export default class ApiClient {
  public static file(baseUrl: string) {
    return axios.create({
      baseURL: baseUrl,
    });
  }

  public static server() {
    const baseUrl = EnvUtil.getServiceUrl();
    return ApiClient.create(baseUrl);
  }

  public static create(baseUrl: string) {
    const instance = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
    // http请求拦截器
    instance.interceptors.request.use(function(config: any) {

      /**
       * @todo 设置traceId，这里根据服务端的要求做相应的配置修改,下面给出了示例代码，要使用的时候可以放开
       */
      // let traceId;
      // if (store.state.user) {
      //       traceId = store.state.user.id + '_' + new Date().getTime();
      // } else {
      //   traceId = ObjectUtil.uuid();
      // }
      // config.headers.trace_id = traceId;

      /**
       * @todo 对请求的url做拦截处理，要依据自己项目的情况修改,下面给出了示例代码，要使用的时候可以放开
       */
      // if (config.url && store.state.user) {
      //       // 用法举例
      //       config.url = config.url.replace('{merchant}', store.state.user.merchant);
      // } else {
      //   const user = JSON.parse(sessionStorage.getItem('user')!);
      //   if (config.url && user) {
      //     config.url = config.url.replace('{merchant}', user.merchant);
      //   }
      // }
      return config;
    }, function(error: any) {
      return Promise.reject(error);
    });
    // http响应拦截器
    instance.interceptors.response.use(function(response: any) {
      if (response.data instanceof ArrayBuffer) {
        return response;
      }
      if (response.data.success) {
        return response;
      } else {
        const error = new Error();
        if (response.data.message) {
          // @todo 依据公司情况，服务端message返回形式可能有所不同，所以这里可能需要依据自己项目情况修改.因为这里影响后面请求的错误捕获提示
          error.message = response.data.message[0];
        } else {
          error.message = response.status + '服务器内部异常';
        }
        (error as any).response = response.data;
        throw error;
      }
    }, function(error: any) {
      if (!error.response) {
        error.message = '请检查网络设置';
        console.log(error);
        return Promise.reject(error);
      }
      switch (error.response.status) {
        case 101:
          break;
        case 401:
          error.message = '登录已过期,请重新登录!';
          ShortcutMgr.logout();
          break;
        case 403:
          error.message = '禁止访问!';
          break;
        case 503:
          error.message = '服务器升级中!';
          break;
        case 500:
          error.message = '服务内部异常!';
          break;
        default:
          error.message = '未知错误';
      }
      return Promise.reject(error);
    });
    return instance;
  }
}
