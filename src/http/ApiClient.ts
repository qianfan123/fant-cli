/**
 * created by ckj 2018/10/30
 */
import axios from 'axios';
import store from '../store';

import ObjectUtil from 'util/ObjectUtil.js';
import ShortcutMgr from 'mgr/ShortcutMgr';

import EnvUtil from 'util/EnvUtil.js';

const qs = require('qs');
axios.defaults.paramsSerializer = (params) => {
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
    // 可以在这里拦截
    const baseUrl = EnvUtil.getServiceUrl();
    // baseUrl = 'http://localhost:8769/alphamo'
    return ApiClient.create(baseUrl);
  }

  public static create(baseUrl: string) {
    const instance = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });

    instance.interceptors.request.use(function(config) {
      let traceId;
      if (store.state.user) {
            traceId = store.state.user.id + '_' + new Date().getTime();
      } else {
        traceId = ObjectUtil.uuid();
      }
      config.headers.trace_id = traceId;
      if (config.url && store.state.user) {
            config.url = config.url.replace('{merchant}', store.state.user.merchant);
      } else {
        const user = JSON.parse(sessionStorage.getItem('user')!);
        if (config.url && user) {
          config.url = config.url.replace('{merchant}', user.merchant);
        }
        // config.url = 'http://api-alphamo-test.qianfan123.com:8001/m01b88888/sale/get?id=0294e8e6-a1fb-461e-ad97-4ee3c744fe3c'
      }
      return config;
    }, function(error) {
      return Promise.reject(error);
    });

    instance.interceptors.response.use(function(response) {
      if (response.data instanceof ArrayBuffer) {
        return response;
      }
      if (response.data.success) {
        return response;
      } else {
        const error = new Error();
        if (response.data.message) {
          error.message = response.data.message[0];
        } else {
          error.message = response.status + '服务器内部异常';
        }
        (error as any).response = response.data;
        throw error;
      }
    }, function(error) {
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
