/**
 * ts识别vue文件
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// 定义空值
declare type Nullable<T> = T | null | undefined;
// ts识别js
declare module 'store/StoragePlugin.js';
declare module 'util/EnvUtil.js';
declare module 'cmd/Filter.js';
declare module 'mgr/BrowserMgr.js';